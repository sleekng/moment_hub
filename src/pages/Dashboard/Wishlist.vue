<template>
  <div class="bg-gray-100 pb-10">
<!--     <AppHeader  @showCategoryModal="$emit('showCategoryModal')" /> -->

    <div v-if="!loading" class="container mx-auto pt-14 lg:pt-20">
      <WishlistDetails v-if=" !isLoggedIn"  :canShow="isLoggedIn" @editWishlist="handleEditWishlist" :selectedWishlist="currentWishlist" :filteredWishes="filteredWishes"/>

      <WishlistDetails v-else  :canShow="currentUser?.username === currentWishlist?.user.username" @editWishlist="handleEditWishlist" :selectedWishlist="currentWishlist" :filteredWishes="filteredWishes"/>
      
      <TabNavigationsWish 
        :myWishesCount="myWishes.length" 
        :reservedCount="reservedWishes.length"
        :receivedCount="receivedWishes.length"
        :activeTab="activeTab" 
        @switchTab="setActiveTab" 
        @sort="handleSort"
        class="py-4 lg:py-8"
      />

      <div v-if=" isLoggedIn" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   w-full gap-4 lg:gap-6 px-4 lg:px-12 py-6 pb-12 bg-white rounded-b-lg " @mouseleave="handleCloseDropdown">
        <!-- Empty State Centered -->
        <div v-if="activeTab === 'myWishes' && myWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
          <EmptyState 
            title="No wishes yet" 
            :message="currentUser?.username === currentWishlist?.user.username ? 'Start adding items to your wishlist.' :  'hasn\'t added any wish.'"
            :currentUserUsername="currentWishlist?.user.username"
            :showButton="true"
            buttonText="Add wish"
            :userOwnsWishlist="currentUser?.username === currentWishlist?.user.username"
            @button-click="handleEmptyStateButtonClick"
          />
        </div>

        <div v-if="activeTab === 'myWishes' && myWishes.length > 0 && isLoggedIn && (currentUser?.username === currentWishlist?.user.username) " 
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
          :isReserving="isReserving"
          @removeFromFulfiled="removeFromFulfiled"
          :key="wish.id" 
          :wish="wish" 
          @preview="prevWish" 
          :loggedInUser="currentUser?.username"
          :openDropdownId="openDropdownId" 
          @deleteWish="handleDeleteWish"
          @toggleDropdown="handleToggleDropdown" 
          @closeDropdown="handleCloseDropdown" 
          @editWish="openEditWishModal"
          @reserved="reservedWish"
            @reserveWish="reserveWish"
          @updateSavedStatus="handleUpdateSavedStatus"
             @markAsFulfilled="markAsFulfilled"
      @cancelReservation="cancelReservation"
        />
      </div>
      <div v-else   class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 lg:gap-6 px-4 lg:px-12 py-6 pb-12 bg-white rounded-b-lg" @mouseleave="handleCloseDropdown">
  <!-- Empty State Centered -->
  <div v-if="activeTab === 'myWishes' && myWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
    <EmptyState 
            title="No wishes yet" 
            :message="currentUser?.username === currentWishlist?.user.username ? 'Start adding items to your wishlist.' :  'hasn\'t added any wish.'"
            :currentUserUsername="currentWishlist?.user.username"
            :showButton="true"
            buttonText="Add wish"
            :userOwnsWishlist="currentUser?.username === currentWishlist?.user.username"
            @button-click="handleEmptyStateButtonClick"
          />
  </div>

  <div v-if="activeTab === 'reserved' && reservedWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
    <EmptyState 
      title="No wishes reserved"
      message="Your friends haven't reserved any wishes for you yet. Keep sharing your wishlist!"
      :showButton="false"
    />
  </div>

  <div v-if="activeTab === 'received' && receivedWishes.length === 0" class="col-span-2 lg:col-span-4 flex justify-center">
    <EmptyState 
      title="No wishes received"
      message="You haven't received any wishes from your friends yet. Share your wishlist with them."
      :showButton="false"
    />
  </div>

  <WishCard 
    v-for="wish in filteredWishes"  
    :key="wish.id" 
    :wish="wish" 
    @preview="prevWish" 
       :isReserving="isReserving"
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


    <AddToWishlist     :isAddingtoWishlist="isAddingtoWishlist" @saveToWishlist="saveToWishlist" v-if="AddToWishlistModal" :wish="wishToAdd" @close="AddToWishlistModal = false" @showCategoryModal="handleShowCategoryModal" />

    <WishDetailView 

    :isReserving="isReserving"
    :isFulfilling="isFulfilling"
    :isUnReceiving="isUnReceiving"
    :isReceiving="isReceiving"

    :isWishSaved="isWishSaved"
    @showAddToWishlistModal="showAddToWishlistModal"
      @deleteWish="handleDeleteWish" 
      @editWish="openEditWishModal" 
      @wishUpdated="handleWishUpdate"
      v-if="showWishDetailsModal" 
      @close="closeWishDetailsModal" 
      :wish="showPrevWish"
      :loggedInUser="currentUser?.username || ''"
       @reserved="reservedWish"
       @requestAddress="requestAddress"
       :isRequestingAddress="isRequestingAddress"
       :isHasAddress="isHasAddress"
       @updateSavedStatus="handleUpdateSavedStatus"


        @markAsReceived="markAsReceived"
        @markAsUnreceived="markAsUnreceived"
        @reserveWish="reserveWish"
        @markAsFulfilled="markAsFulfilled"
        @cancelReservation="cancelReservation"
        @removeFromFulfiled="removeFromFulfiled"

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
      @shareWish="toggleShareMenu"
    />

    <GiftReservedModal
      v-if="showGiftReservedModal"
      @close="showGiftReservedModal = false"
       @requestAddress="requestAddress"
       @hasAddress="hasAddress"
        :isRequestingAddress="isRequestingAddress"
        :isHasAddress="isHasAddress"
        :wish="giftReservedWish"
    />


    <!-- Share Modal -->
    <div
      v-if="isShareMenuOpen"
      class="fixed left-0 inset-0 flex items-center p-4 justify-center bg-black bg-opacity-50 z-[100]"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          @click="toggleShareMenu"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="flex space-x-4 items-center pb-2">
          <span class="font-bold text-lg">Share with friends</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
          <button
            @click="copyLink"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
          <button
            @click="shareToEmail"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-envelope"></i>
            <span>Share to Email</span>
          </button>
          <button
            @click="shareToWhatsApp"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-whatsapp"></i>
            <span>Share to Whatsapp</span>
          </button>
          <button
            @click="shareToTwitter"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-twitter"></i>
            <span>Share to Twitter</span>
          </button>
          <div class="lg:col-span-2 lg:inline-flex lg:justify-center w-full">
            <button
              @click="shareToFacebook"
              class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg lg:w-auto w-full"
            >
              <i class="fab fa-facebook"></i>
              <span>Share to Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>




  </div>
  <Loader :show="loading" />
</template>

<style scoped>
.highlight-wish {
  animation: highlightPulse 3s ease-in-out;
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
}

@keyframes highlightPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(147, 51, 234, 0.8);
  }
}
</style>

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
import { isTokenExpired } from "@/router/index.js"; // Import the function
import AddToWishlist from '@/components/AddToWishlist.vue';
import { socialPreviewManager } from '@/utils/socialPreview.js';


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
    AddToWishlist
  },
  data() {
    return {
      AddToWishlistModal: false,
      wishToAdd: null,
      isShareMenuOpen: false,
      savedWishes: new Set(), // Add this to track saved wishes
      isWishSaved:false,
      giftReservedWish:null,
      isRequestingAddress:false,
      isHasAddress:false,
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
      isReserving:false,
      wishCreated: false,
      createdWishId: null,
      isFulfilling : false,
      isUnReceiving: false,
      isReceiving: false,
      isAddingtoWishlist: false,
      loading: false,
      currentUser: null,
      successMessage: '', // Initialize successMessage
    };
  },
  computed: {
    isLoggedIn() {
      // Check if the user is logged in by verifying the token
      return localStorage.getItem('authToken') && !isTokenExpired();
    },
    myWishes() {
      return this.wishes.filter(wish => wish.status === null);
    },
    reservedWishes() {
      return this.wishes.filter(wish => wish.status === 'reserved' || wish.status === 'fulfiled' && wish.received != true);
    },

    receivedWishes() {
      return this.wishes.filter(wish => wish.received === true);
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
    if(this.isLoggedIn){
      
      this.loadCurrentUser(); // Load user data when component is created
    }
    
    // Check if this is an individual wish route
    if (this.$route.name === 'Wish' && this.$route.params.id) {
      await this.handleIndividualWishRoute(this.$route.params.id);
    } else {
      this.loadData();
    }
  },
  mounted() {
   console.log();
   
  },
  unmounted() {
    // Reset social preview to default when component is unmounted
    socialPreviewManager.resetToDefault();
  },
  methods: {

    redirectToLogin() {
      this.$router.push('/login');
    },

    showAddToWishlistModal(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.wishToAdd = wish;
      this.AddToWishlistModal = true;
    },

    async saveToWishlist(wish,  selectedWishlistId) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }

      this.isAddingtoWishlist = true; // Start loading state

      this.wishToAdd = wish;

      if (!selectedWishlistId) {
        alert('Please select a wishlist');
        return;
      }
      try {
        const response = await this.$axios.post(`${this.$baseURL}/wishes/${wish.id}/copy`, {
          wishlist_id: selectedWishlistId
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        eventBus.onSuccess(response.data.message);

      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.AddToWishlistModal = false;
        this.isAddingtoWishlist = false; // End loading state
      }




    },


    async markAsReceived(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
  
      this.isReceiving = true;
      try {
      const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          {
            received: true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        eventBus.onSuccess(response.data.message);
        this.showPrevWish.received = true;
        this.showPrevWish.status = "fulfiled";
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.showWishDetailsModal = false;
        this.isReceiving = false; // End loading state
      }
    },
    async markAsUnreceived(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.isUnReceiving = true;
      try {
      const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          {
            received: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        eventBus.onSuccess(response.data.message);
        this.showPrevWish.received = false;
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.showWishDetailsModal = false;
        this.isUnReceiving = false;
      }
    },

    async reserveWish(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
    
      this.isReserving = true; // Start loading state
      try {
      const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          { status: "reserved" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (this.isDashboard) {
          await this.$axios.post(
            `${this.$baseURL}/saved-wishes`,
            {
              wish_id: wish.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
        }

     /*    this.wish.status = "reserved"; */

        eventBus.onSuccess(response.data.message);

        if (this.isDashboard) {
          // Update local state
          this.localIsWishSaved = !this.localIsWishSaved;

          this.$emit("newUpdate");
          this.closeModal();
          eventBus.onSuccess(response.data.message);
        }
        this.reservedWish(wish)
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.isReserving = false; // End loading state
      }
    },

    async markAsFulfilled(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }

      this.isFulfilling = true;
      try {
       const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          {
            status: "fulfiled",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        eventBus.onSuccess(response.data.message);
        this.loadData();
        this.showPrevWish.status = "fulfiled";
        
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.showWishDetailsModal = false;
        this.isFulfilling = false;
      }
    },
    async cancelReservation(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      eventBus.setLoading(true);
      try {
      const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          { status: null },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        eventBus.onSuccess(response.data.message);
        this.loadData();
        this.showPrevWish.status = null;
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.showWishDetailsModal  = false;
        eventBus.setLoading(false);
      }
    },

    async removeFromFulfiled(wishId) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      eventBus.setLoading(true);
      try {
       const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wishId}`,
          {
            status: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        eventBus.onSuccess(response.data.message);
        this.loadData();
        this.showPrevWish.status = null;
      } catch (error) {
        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
      } finally {
        this.showWishDetailsModal  = false;
        eventBus.setLoading(false);
      }
    },

        async hasAddressClicked(wishId) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }

      try {
        const wishlistId = this.$route.params.id;
        await Promise.all([
          this.fetchWishes(wishlistId),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.showWishDetailsModal = true;
        this.showPrevWish = this.wishes.find(w => w.id === wishId);
        eventBus.setLoading(false);
      }

      

    },

    reservedWish(wish){
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.giftReservedWish = wish
      this.showGiftReservedModal=true
      this.loadData();
    },


    toggleShareMenu() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      console.log('working');
      
      this.isShareMenuOpen = !this.isShareMenuOpen;
      
      // Update social preview when share menu is opened
      if (this.isShareMenuOpen && this.currentWishlist) {
        socialPreviewManager.updateWishlistPreview(this.currentWishlist);
      }
    },

    copyLink() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
      // Get the wishlist image - use wishlist photo, first wish photo, category image, or fallback
      let wishlistImage = this.currentWishlist.photo;
      if (!wishlistImage && this.currentWishlist.wishes && this.currentWishlist.wishes.length > 0) {
        // Use first wish photo if available
        wishlistImage = this.currentWishlist.wishes[0].photo;
      }
      if (!wishlistImage && this.currentWishlist.category?.slug) {
        // Use category image
        wishlistImage = `${window.location.origin}/assets/${this.currentWishlist.category.slug}.svg`;
      }
      if (!wishlistImage) {
        // Fallback to logo
        wishlistImage = `${window.location.origin}/assets/logo-single.png`;
      }
      
      // Create a social preview URL with parameters including image
      const previewUrl = `${window.location.origin}/wishlist-preview.html?id=${this.currentWishlist.id}&username=${this.currentWishlist.user.username}&title=${encodeURIComponent(this.currentWishlist.title)}&description=${encodeURIComponent(this.currentWishlist.description || `Check out this amazing wishlist by ${this.currentWishlist.user.username}`)}&image=${encodeURIComponent(wishlistImage)}`;
      
      const message = this.currentUser?.username === this.currentWishlist?.user.username
        ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${previewUrl}`
        : `Check out this wishlist: ${previewUrl}`;
      navigator.clipboard.writeText(message).then(() => {
        eventBus.onSuccess("Wishlist link copied to clipboard!");
      });
    },
    shareToEmail() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
      // Get the wishlist image - use wishlist photo, first wish photo, category image, or fallback
      let wishlistImage = this.currentWishlist.photo;
      if (!wishlistImage && this.currentWishlist.wishes && this.currentWishlist.wishes.length > 0) {
        // Use first wish photo if available
        wishlistImage = this.currentWishlist.wishes[0].photo;
      }
      if (!wishlistImage && this.currentWishlist.category?.slug) {
        // Use category image
        wishlistImage = `${window.location.origin}/assets/${this.currentWishlist.category.slug}.svg`;
      }
      if (!wishlistImage) {
        // Fallback to logo
        wishlistImage = `${window.location.origin}/assets/logo-single.png`;
      }
      
      // Create a social preview URL with parameters including image
      const previewUrl = `${window.location.origin}/wishlist-preview.html?id=${this.currentWishlist.id}&username=${this.currentWishlist.user.username}&title=${encodeURIComponent(this.currentWishlist.title)}&description=${encodeURIComponent(this.currentWishlist.description || `Check out this amazing wishlist by ${this.currentWishlist.user.username}`)}&image=${encodeURIComponent(wishlistImage)}`;
      
      const subject = encodeURIComponent(
        this.currentUser?.username === this.currentWishlist?.user.username
          ? `Check out my wishlist on Moments Hub`
          : `Check out this wishlist: ${this.currentWishlist.title}`
      );
      const body = encodeURIComponent(
        this.currentUser?.username === this.currentWishlist?.user.username
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${previewUrl}`
          : `Check out this wishlist: ${previewUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
      // Get the wishlist image - use wishlist photo, first wish photo, category image, or fallback
      let wishlistImage = this.currentWishlist.photo;
      if (!wishlistImage && this.currentWishlist.wishes && this.currentWishlist.wishes.length > 0) {
        // Use first wish photo if available
        wishlistImage = this.currentWishlist.wishes[0].photo;
      }
      if (!wishlistImage && this.currentWishlist.category?.slug) {
        // Use category image
        wishlistImage = `${window.location.origin}/assets/${this.currentWishlist.category.slug}.svg`;
      }
      if (!wishlistImage) {
        // Fallback to logo
        wishlistImage = `${window.location.origin}/assets/logo-single.png`;
      }
      
      // Create a social preview URL with parameters including image
      const previewUrl = `${window.location.origin}/wishlist-preview.html?id=${this.currentWishlist.id}&username=${this.currentWishlist.user.username}&title=${encodeURIComponent(this.currentWishlist.title)}&description=${encodeURIComponent(this.currentWishlist.description || `Check out this amazing wishlist by ${this.currentWishlist.user.username}`)}&image=${encodeURIComponent(wishlistImage)}`;
      
      const text = encodeURIComponent(
        this.currentUser?.username === this.currentWishlist?.user.username
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${previewUrl}`
          : `Check out this wishlist: ${previewUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
      // Get the wishlist image - use wishlist photo, first wish photo, category image, or fallback
      let wishlistImage = this.currentWishlist.photo;
      if (!wishlistImage && this.currentWishlist.wishes && this.currentWishlist.wishes.length > 0) {
        // Use first wish photo if available
        wishlistImage = this.currentWishlist.wishes[0].photo;
      }
      if (!wishlistImage && this.currentWishlist.category?.slug) {
        // Use category image
        wishlistImage = `${window.location.origin}/assets/${this.currentWishlist.category.slug}.svg`;
      }
      if (!wishlistImage) {
        // Fallback to logo
        wishlistImage = `${window.location.origin}/assets/logo-single.png`;
      }
      
      // Create a social preview URL with parameters including image
      const previewUrl = `${window.location.origin}/wishlist-preview.html?id=${this.currentWishlist.id}&username=${this.currentWishlist.user.username}&title=${encodeURIComponent(this.currentWishlist.title)}&description=${encodeURIComponent(this.currentWishlist.description || `Check out this amazing wishlist by ${this.currentWishlist.user.username}`)}&image=${encodeURIComponent(wishlistImage)}`;
      
      const text = encodeURIComponent(
        this.currentUser?.username === this.currentWishlist?.user.username
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${previewUrl}`
          : `Check out this wishlist: ${previewUrl}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      
      // Get the wishlist image - use wishlist photo, first wish photo, category image, or fallback
      let wishlistImage = this.currentWishlist.photo;
      if (!wishlistImage && this.currentWishlist.wishes && this.currentWishlist.wishes.length > 0) {
        // Use first wish photo if available
        wishlistImage = this.currentWishlist.wishes[0].photo;
      }
      if (!wishlistImage && this.currentWishlist.category?.slug) {
        // Use category image
        wishlistImage = `${window.location.origin}/assets/${this.currentWishlist.category.slug}.svg`;
      }
      if (!wishlistImage) {
        // Fallback to logo
        wishlistImage = `${window.location.origin}/assets/logo-single.png`;
      }
      
      // Create a social preview URL with parameters including image
      const previewUrl = `${window.location.origin}/wishlist-preview.html?id=${this.currentWishlist.id}&username=${this.currentWishlist.user.username}&title=${encodeURIComponent(this.currentWishlist.title)}&description=${encodeURIComponent(this.currentWishlist.description || `Check out this amazing wishlist by ${this.currentWishlist.user.username}`)}&image=${encodeURIComponent(wishlistImage)}`;
      
      const url = encodeURIComponent(previewUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },


    handleUpdateSavedStatus(wishId, isSaved) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
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


    
    loadCurrentUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.currentUser = null;
      }
    } else {
      this.currentUser = null; // Set to null if no user data
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

        // Update social preview after loading wishlist data
        if (this.currentWishlist) {
          socialPreviewManager.updateWishlistPreview(this.currentWishlist);
        }

        // Check if we need to highlight a specific wish
        if (this.$route.query.highlight) {
          this.highlightWish(this.$route.query.highlight);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleIndividualWishRoute(wishId) {
      this.loading = true;
      try {
        // Fetch the wish details to get the wishlist ID
        const response = await this.$axios.get(`${this.$baseURL}/wishes/${wishId}`);
        const wish = response.data.data;
        
        if (wish && wish.wishlist_id) {
          // Redirect to the wishlist with the wish highlighted
          this.$router.replace({
            name: 'Wishlist',
            params: { 
              id: wish.wishlist_id, 
              username: wish.wishlist?.user?.username || 'user'
            },
            query: { highlight: wishId }
          });
        } else {
          // If wish not found, redirect to home
          this.$router.replace({ name: 'Home' });
        }
      } catch (error) {
        console.error('Error fetching wish:', error);
        // If error, redirect to home
        this.$router.replace({ name: 'Home' });
      } finally {
        this.loading = false;
      }
    },

    highlightWish(wishId) {
      // Find the wish and scroll to it
      const wishElement = document.querySelector(`[data-wish-id="${wishId}"]`);
      if (wishElement) {
        wishElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        wishElement.classList.add('highlight-wish');
        setTimeout(() => {
          wishElement.classList.remove('highlight-wish');
        }, 3000);
      }
    },
    handleEditWishlist(wishlist) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
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
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
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
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.editingWish = null;
      this.wishCreated = this.wishUpdated = false;
      this.showCreateWishModal = true;
    },
    openEditWishModal(wish) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
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
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
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
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      console.log('woking');
          this.isRequestingAddress = true
          
            try {
                
             const response =  await this.$axios.post(`${this.$baseURL}/wishes/${wishID}/address`,{} ,{
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });

            eventBus.onSuccess(response.data.message);
           } catch (error) {
            if (error.response) {
              // Use eventBus to output error messages directly from the response
              if (error.response.data.message) {
                eventBus.onError(error.response.data.message);
              } else if (error.response.data.errors) {
                const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
                eventBus.onError(errorMsg);
              } else {
                eventBus.onError("An unexpected error occurred. Please try again.");
              }
            }
            } finally {
                this.isRequestingAddress =false
                this.showGiftReservedModal =false
            }
        },
        
    async hasAddress(wishID) {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      eventBus.setLoading(true);
          this.isHasAddress = true
          
            try {
                
            await this.$axios.put(
          `${this.$baseURL}/wishes/${wishID}`,
          { has_address: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        


        /* eventBus.onSuccess('Address request sent successfully.'); */
            } catch (error) {
              console.error("Error requesting address:", error);
                const errorMsg = error.response?.data?.message || 'Error requesting address. Please try again.';
            } finally {
                this.isHasAddress =false
                this.showGiftReservedModal =false              
                this.hasAddressClicked(wishID)
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
    handleEmptyStateButtonClick() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.openCreateWishModal();
    },

    handleShowCategoryModal() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.AddToWishlistModal = false;
      this.$emit('showCategoryModal');
    }

  }
};
</script>
