<template>
  <div class="bg-gray-100 pb-10">
<!--     <AppHeader @showCategoryModal="$emit('showCategoryModal')" /> -->

    <div v-if="!loading" class="container mx-auto pt-20">
      <WishlistDetails  :canShow="currentUser?.username === currentWishlist?.user.username" @editWishlist="handleEditWishlist" :selectedWishlist="currentWishlist" />

      <TabNavigationsWish 
        :myWishesCount="myWishes.length" 
        :reservedCount="reservedWishes.length"
        :receivedCount="receivedWishes.length"
        :activeTab="activeTab" 
        @switchTab="setActiveTab" 
        @sort="handleSort"
      />

      <div class="grid grid-cols-2 w-full lg:grid-cols-4 gap-4 lg:gap-6 px-4 lg:px-12 py-6 pb-12 bg-white rounded-b-lg " @mouseleave="handleCloseDropdown">
        <!-- Empty State Centered -->
        <div v-if="activeTab === 'myWishes' && myWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
          <EmptyState 
            title="No wishes yet" 
            :message="currentUser?.username === currentWishlist?.user.username ? 'Start adding items to your wishlist.' :  'hasn\'t added any wish.'"
            :showButton="true"
            :currentUserUsername="currentWishlist?.user.username"
            buttonText="Add wish"
            :userOwnsWishlist="currentUser?.username === currentWishlist?.user.username"
            @button-click="openCreateWishModal"
          />
        </div>

        <div v-if="activeTab === 'myWishes' && myWishes.length > 0 && currentUser?.username === currentWishlist?.user.username" 
             class="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 py-8 cursor-pointer lg:min-h-[360px] " 
             @click="showCreateWishModal = true">
          <div class="flex items-center justify-center w-12 h-12 bg-black rounded-full mb-4">
            <img src="/assets/add.svg" alt="Add" class="h-5 w-5">
          </div>
          <div class="text-lg font-medium text-center text-gray-800 leading-relaxed">Make a Wish</div>
        </div>

        <div v-if="activeTab === 'reserved' && reservedWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
          <EmptyState 
            :title="currentUser?.username === currentWishlist?.user.username ? 'No wishes reserved' : 'No wishes reserved Yet'"
            :message="currentUser?.username === currentWishlist?.user.username ? 
                      'Your friends haven\'t reserved any wishes for you yet. Keep sharing your wishlist!' :  
                      'It looks like no one has reserved a wish for ' + currentWishlist?.user.username  + ' yet. Be the first to surprise them!'"
            :showButton="false"
          />
        </div>

        <div v-if="activeTab === 'received' && receivedWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
          <EmptyState 
            :title="currentUser?.username === currentWishlist?.user.username ? 'No wishes received' : 'No wishes received'"
            :message="currentUser?.username === currentWishlist?.user.username ? 
                      'You haven\'t received any wishes from your friends yet. Share your wishlist with them.' :  
                      'Received wish will show here'"
            :showButton="false"
          />
        </div>

        <WishCard 
          v-for="wish in filteredWishes"  
          :key="wish.id" 
          :wish="wish" 
          @preview="prevWish" 
          :loggedInUser="currentUser.username"
          :openDropdownId="openDropdownId" 
          @deleteWish="handleDeleteWish"
          @toggleDropdown="handleToggleDropdown" 
          @closeDropdown="handleCloseDropdown" 
          @editWish="openEditWishModal"
          @reserved="reservedWish"
          @updateSavedStatus="handleUpdateSavedStatus"
        />
      </div>
    </div>

    <!-- Modals -->
    <WishDetailView 
    :isWishSaved="isWishSaved"
      @deleteWish="handleDeleteWish" 
      @editWish="openEditWishModal" 
      @wishUpdated="handleWishUpdate"
      v-if="showWishDetailsModal" 
      @close="closeWishDetailsModal" 
      :wish="showPrevWish"
      :loggedInUser="currentUser.username"
       @reserved="reservedWish"
       @requestAddress="requestAddress"
       :isRequestingAddress="isRequestingAddress"
       @updateSavedStatus="handleUpdateSavedStatus"

    />

    <CreateWishModal  
      v-if="showCreateWishModal"     
      @createWish="createdWish"
      :selectedWishlist="currentWishlist"
      @updateWish="updatedWish"
      :wishlistId="currentWishlist.id"
      :wish="editingWish"
      @addWish="addWish"
      @close="closeCreateWishModal"
    />

    <DeleteConfirmationModal 
      v-if="showDeleteModal" 
      title="Wish"
      description="Are you sure you want to delete this wish? This action cannot be undone." 
      @confirm="confirmDelete" 
      @cancel="cancelDelete" 
    />

    <CreatedWishModal 
      @closeCreatedModal="closeCreatedModal"
      v-if="wishCreated || wishUpdated" 
      :title="wishmodalTitle"
      :description="wishmodalDescription"
      :createdWishId="createdWishId"
      :currentWishlistId="currentWishlist.id"
      @viewWish="viewCreatedWish" 
      @makeAWish="openCreateWishModal"
      :updateType="updateType"
    />

    <GiftReservedModal
      v-if="showGiftReservedModal"
      @close="showGiftReservedModal = false"
       @requestAddress="requestAddress"
        :isRequestingAddress="isRequestingAddress"
        :wish="giftReservedWish"
    />
  </div>
  <Loader :show="loading" />
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';
import AppHeader from '@/components/Dashboard/AppHeader.vue';
import CreatedWishModal from '@/components/Dashboard/CreatedWishModal.vue';
import CreateWishModal from '@/components/Dashboard/CreateWishModal.vue';
import WishlistDetails from '@/components/Dashboard/WishlistDetails.vue';
import TabNavigationsWish from '@/components/Dashboard/TabNavigationsWish.vue';
import WishCard from '@/components/Dashboard/WishCard.vue';
import WishDetailView from '@/components/Dashboard/WishDetailView.vue';
import DeleteConfirmationModal from '@/components/Dashboard/DeleteConfirmationModal.vue';
import { eventBus } from '@/eventBus.js';
import EmptyState from '@/components/Dashboard/EmptyState.vue';
import GiftReservedModal from '@/components/GiftReservedModal.vue';

export default {
  name: "Wishlist",
  emits: ['showCategoryModal', 'showCreateWishlistModal'],
  components: {
    GiftReservedModal,
    Loader,
    EmptyState,
    AppHeader,
    WishlistDetails,
    TabNavigationsWish,
    WishCard,
    WishDetailView,
    CreateWishModal,
    DeleteConfirmationModal,
    CreatedWishModal,
  },
  data() {
    return {
      savedWishes: new Set(), // Add this to track saved wishes
      isWishSaved:false,
      giftReservedWish:null,
      isRequestingAddress:false,
      showGiftReservedModal: false,
      updateType: null,
      showPrevWish: null,
      openDropdownId: null,
      currentWishlistId: null,
      showWishDetailsModal: false,
      showCreateWishModal: false,
      wishToDelete: null,
      activeTab: 'myWishes',
      currentWishlist: null,
      showDeleteModal: false,
      editingWish: null,
      wishes: [],
      wishUpdated: false,
      wishCreated: false,
      createdWishId: null,
      loading: false,
      currentUser: null,
      successMessage: '' // Initialize successMessage
    };
  },
  computed: {
    myWishes() {
      return this.wishes.filter(wish => wish.status === null);
    },
    reservedWishes() {
      return this.wishes.filter(wish => wish.status === 'reserved');
    },

    receivedWishes() {
      return this.wishes.filter(wish => wish.status === 'fulfiled');
    },
    filteredWishes() {
      if (this.activeTab === 'myWishes') {
        return this.myWishes;
      } else if (this.activeTab === 'reserved') {
        return this.reservedWishes;
      }else if (this.activeTab === 'received') {
        return this.receivedWishes;
      }
      else {
        return this.wishes;
      }

    },
    wishmodalTitle() {
      return this.wishCreated ? 'Wish Added! 🥳' : 'Wish Updated! 🥳';
    },
    wishmodalDescription() {
      return this.wishCreated 
        ? 'Your wishlist just got even better! Keep adding more wishes to make it truly magical.'
        : 'Your wish has been updated to perfection! Check out your wishlist to see all your amazing items.';
    },
  },
  async created() {
    this.loadCurrentUser(); // Load user data when component is created
    this.loadData();
  },
  methods: {
    handleUpdateSavedStatus(wishId, isSaved) {
      this.loadData();
    },

    async fetchSavedWishes() {
        try {
            const response = await this.$axios.get(`${this.$baseURL}/saved-wishes`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            if (response.data.success) {
                this.savedWishes = new Set(response.data.data.map(wish => wish.id));
            }
        } catch (error) {
            console.error('Error fetching saved wishes:', error);
        }
    },

    reservedWish(wish){
      this.giftReservedWish = wish
      this.showGiftReservedModal=true
      this.loadData();
    },

    
    loadCurrentUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.currentUser = userData;
      }
    },
    async loadData() {
      this.loading = true; 
      try {
        const wishlistId = this.$route.params.id;
        await Promise.all([
          this.fetchWishlistDetails(wishlistId),
          this.fetchWishes(wishlistId),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;
      }
    },
    handleEditWishlist(wishlist) {
      this.$emit('showCreateWishlistModal', wishlist.category, wishlist);
    },
    closeCreatedModal() {
      this.wishCreated = this.wishUpdated = false;
      this.loadData();
    },
    viewCreatedWish() {
      this.$router.push({ name: 'Wishlist', params: { id: this.createdWishlistId } });
      this.wishCreated = false;
      this.wishUpdated = false;
      this.loadData();
    },
    createdWish(wishData) {
      this.createdWishId = wishData.id;
      this.editingWish = null;
      this.updateType = 'created';
      this.showCreateWishModal = false;
      this.wishCreated = true;
      this.loadData();
    },
    updatedWish(wishData) {
      this.createdWishId = wishData.id;
      this.editingWish = null;
      this.updateType = 'updated';
      this.showCreateWishModal = false;
      this.wishUpdated = true;
      this.loadData();
    },
    handleWishUpdate(updatedWish) {
      const index = this.wishes.findIndex(w => w.id === updatedWish.id);
      if (index !== -1) {
        this.wishes.splice(index, 1, updatedWish);
      }
    },
    async handleDeleteWish(wishId) {
      this.wishToDelete = wishId;
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      eventBus.setLoading(true);
      try {
        await this.$axios.delete(`${this.$baseURL}/wishes/${this.wishToDelete}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.wishes = this.wishes.filter(wish => wish.id !== this.wishToDelete);
        this.successMessage = 'Wish deleted successfully.'; // Update successMessage
      } catch (error) {
        console.error('Error deleting wish:', error.response?.data?.message || error.message);
      } finally {
        eventBus.setLoading(false);
        this.showDeleteModal = false;
        this.showWishDetailsModal = false;
      }
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
    closeCreateWishModal() {
      this.showCreateWishModal = false;
      this.editingWish = null;
    },
    openCreateWishModal() {
      this.editingWish = null;
      this.wishCreated = this.wishUpdated = false;
      this.showCreateWishModal = true;
    },
    openEditWishModal(wish) {
      this.editingWish = { ...wish };
      this.showWishDetailsModal = false;
      this.showCreateWishModal = true;
    },
    prevWish(wishId, isWishSaved) {
      this.showWishDetailsModal = true;
      this.isWishSaved = isWishSaved
      this.showPrevWish = this.wishes.find(w => w.id === wishId);
    },
    closeWishDetailsModal() {
      this.showWishDetailsModal = false;
      this.showPrevWish = null;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    handleToggleDropdown(wishId) {
      this.openDropdownId = this.openDropdownId === wishId ? null : wishId;
    },
    handleCloseDropdown() {
      this.openDropdownId = null;
    },
    async fetchWishlistDetails(wishlistId) {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/wishlists/${wishlistId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.currentWishlist = response.data.data;
      } catch (error) {
        console.error('Error fetching wishlist details:', error);
      }
    },
    async fetchWishes(wishlistId) {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/wishlists/${wishlistId}/wishes`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.wishes = response.data.data;
      } catch (error) {
        console.error('Error fetching wishes:', error);
      }
    },

    async requestAddress(wishID) {
      console.log('woking');
          this.isRequestingAddress = true
          
            try {
                
              await this.$axios.post(`${this.$baseURL}/wishes/${wishID}/address`,{} ,{
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });

            eventBus.onSuccess('Address request sent successfully.');
            } catch (error) {
              console.error("Error requesting address:", error);
                const errorMsg = error.response?.data?.message || 'Error requesting address. Please try again.';
            } finally {
                this.isRequestingAddress =false
            }
        },


    addWish(updatedWish) {
      const index = this.wishes.findIndex(wish => wish.id === updatedWish.id);
      if (index !== -1) {
        this.wishes.splice(index, 1, updatedWish);
      } else {
        this.wishes.push(updatedWish);
      }
      this.closeCreateWishModal();
    },


    handleSort({ sortBy, sortOrder }) {
      this.wishes.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
        case 'priority':
          // Map priority strings to numeric values for sorting
          const priorityMap = {
            'high': 3,
            'medium': 2,
            'low': 1,
            null: 0
          };
          comparison = (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'likes':
          comparison = (a.likes_count || 0) - (b.likes_count || 0);
          break;
        case 'amount':
          comparison = (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0);
          break;
        case 'quantity':
          comparison = (parseInt(a.quantity) || 0) - (parseInt(b.quantity) || 0);
          break;
        default:
          comparison = 0;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    },

  }
};
</script>
