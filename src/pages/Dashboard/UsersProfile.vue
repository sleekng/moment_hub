<template>
    <div class="bg-white lg:bg-gray-100 py-10">
<!--       <AppHeader  @showCategoryModal="$emit('showCategoryModal')" /> -->
      <div v-if="!loading" class="px-4 lg:px-16 pt-10 lg:pt-20">
        <ProfileDetails :user="user" :myWishlistCount="wishlists.length" />
        <TabNavigationsUserProfileWishlist
          :myWishlistCount="wishlists.length"
          :savedwishesCount="savedwishes.length"
          :reservedWishesCount="reservedWishes.length"
          :activeTab="activeTab"
          @switchTab="setActiveTab"
          
             :user="user"
             @sort="handleSort"
        />

        <div v-if="wishlists.length > 0" class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:px-12 py-8 rounded-b-lg bg-white">
          <WishlistCard
            :user="user"
              @shareWishlist = "shareWishlist"
            v-for="wishlist in wishlists"
            :key="wishlist.id"
            :wishlist="wishlist"
            :openDropdownId="openDropdownId"
            @toggleDropdown="handleToggleDropdown"
            @closeDropdown="handleCloseDropdown"
            @deleteWishlist="handleDeleteWishlist"
            @editWishlist="handleEditWishlist"
            @viewWishlist="navigateToAllWishes"
          />
        </div>
        <div v-else>
          <EmptyState
            title="No wishlists yet"
            :message="user.first_name + ' hasn\'t created any wishlists yet'"
            @button-click="$emit('showCategoryModal')"
            :showButton="true"
            buttonText="Create Wishlist"
          />
        </div>
  
        <!-- Modals -->
        <WishDetailView @editWish="openEditWishModal" v-if="showWishDetailsModal" @close="closeWishDetailsModal" :wish="showPrevWish ? showPrevWish : showSavedPrevWish" />
        <CreateWishModal v-if="showCreateWishModal" :wish="editingWish" @addWish="AddWish" @close="closeCreateWishModal" />
        <DeleteConfirmationModal v-if="showDeleteModal" :title="'WishList'" :description="'Are you sure you want to delete this wishlist? This action cannot be undone.'" @confirm="confirmDelete" @cancel="cancelDelete" />
        <DeleteConfirmationModal v-if="showDeleteWishModal" :title="'Wish'" :description="'Are you sure you want to delete this wish? This action cannot be undone.'" @confirm="confirmDelete" @cancel="cancelDelete" />
      </div>
    </div>
    <Loader :show="loading" />
  </template>
  
  <script>
  import EmptyState from '@/components/Dashboard/EmptyState.vue';
  import Loader from '@/components/Loader.vue';
  import { eventBus } from '@/eventBus.js';
  import CreateWishModal from '@/components/Dashboard/CreateWishModal.vue';
  import AppHeader from '@/components/Dashboard/AppHeader.vue';
  import ProfileDetails from '@/components/Dashboard/ProfileDetails.vue';
  import TabNavigationsUserProfileWishlist from '@/components/Dashboard/TabNavigationsUserProfileWishlist.vue';
  import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
  import WishDetailView from '@/components/Dashboard/WishDetailView.vue';
  import DeleteConfirmationModal from '@/components/Dashboard/DeleteConfirmationModal.vue';
  import { isTokenExpired } from "@/router/index.js"; // Import the function
  
  export default {
    components: {
      Loader,
      EmptyState,
      CreateWishModal,
      AppHeader,
      DeleteConfirmationModal,
      ProfileDetails,
      TabNavigationsUserProfileWishlist,
      WishlistCard,
      WishDetailView,
    },
    props: ['username'],
    data() {
      return {
        user: null,
        showCreateWishModal: false,
        showPrevWish: null,
        showSavedPrevWish: null,
        showWishDetailsModal: false,
        wishToDelete: null,
        showInitialModal: false,
        openDropdownId: null,
        activeTab: 'myWishes',
        showDeleteModal: false,
        showDeleteWishModal: false,
        wishlistToDelete: null,
        wishlists: [],
        wishes: [],
        savedwishes: [],
        reservedWishes: [],
        loading: true,  // Set loading initial state to true
      };
    },

    computed: {
      isLoggedIn() {
      // Check if the user is logged in by verifying the token
      return localStorage.getItem('authToken') && !isTokenExpired();
    }
    },
   
    async mounted() {
      this.checkUserAndRedirect();
      
    },
    methods: {
      shareWishlist(wishlistId, wishlistUser){
      this.$emit('shareWishlist', wishlistId, wishlistUser);
    },
      async checkUserAndRedirect() {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser && loggedInUser.username === this.username) {
        this.$router.push('/dashboard');
      }else{
        await this.fetchUserData();
      }
    },
      async fetchUserData() {
        try {
          const response = await this.$axios.get(`${this.$baseURL}/users/${this.username}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          });
          if (response.data.success) {
            this.user = response.data.data;
            console.log(this.user);
            
            this.wishlists = this.user.wishlists || [];
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          this.loading = false;
        }
      },
      navigateToAllWishes(wishlistId) {
        this.$router.push({ name: 'Wishlist', params: { id: wishlistId } });
      },
      async handleDeleteWish(wishId) {
        this.wishToDelete = wishId;
        this.showDeleteWishModal = true;
      },
      AddWish(updatedWish) {
        const index = this.reservedWishes.findIndex(wish => wish.id === updatedWish.id);
        if (index !== -1) {
          this.reservedWishes.splice(index, 1, updatedWish);
        } else {
          this.wishes.push(updatedWish);
        }
        this.closeCreateWishModal();
      },
      async confirmDelete() {
        eventBus.setLoading(true);
        try {
          await this.$axios.delete(`${this.$baseURL}/wishes/${this.wishToDelete}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          });
          await this.fetchUserData(); // Reload data after deletion
          eventBus.onSuccess('Wish deleted successfully.');
        } catch (error) {
          console.error('Error deleting wish:', error.response?.data?.message || error.message);
        } finally {
          eventBus.setLoading(false);
          this.showDeleteWishModal = false;
        }
      },
      cancelDelete() {
        this.showDeleteModal = false;
        this.showDeleteWishModal = false;
      },
      closeCreateWishModal() {
        this.showCreateWishModal = false;
        this.editingWish = null;
      },
      openEditWishModal(wish) {
        this.editingWish = { ...wish };
        this.showWishDetailsModal = false;
        this.showCreateWishModal = true;
      },
      handleEditWishlist(wishlist) {
        this.$emit('showCreateWishlistModal', wishlist.category, wishlist);
      },
      handleToggleDropdown(wishlistId) {
        this.openDropdownId = this.openDropdownId === wishlistId ? null : wishlistId;
      },
      handleCloseDropdown() {
        this.openDropdownId = null;
      },
      setActiveTab(tab) {
        this.activeTab = tab;
      },

      
      handleSort({ sortBy, sortOrder }) {
        this.wishlists.sort((a, b) => {
          let comparison = 0;
          
          switch (sortBy) {
            case 'title':
              comparison = a.title.localeCompare(b.title);
              break;
            case 'event_date':
              comparison = new Date(a.date) - new Date(b.date);
              break;
            case 'likes':
              comparison = a.likes_count - b.likes_count;
              break;
            case 'views':
              comparison = a.views_count - b.views_count;
              break;
            default:
              comparison = 0;
          }
          
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      },
    },
  };
  </script>
  