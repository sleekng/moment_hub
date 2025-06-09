<template>
  <div class="bg-gray-100">
  <!--   <AppHeader @showCategoryModal="$emit('showCategoryModal')" /> -->
    <div class="flex lg:hidden justify-center px-4 items-center lg:pt-20 w-full mt-10 rounded-t-lg bg-white">
      <SearchComponent :loading="isSearchingLoading" @startSearch="startSearch" @selectOption="selectOption" :selectedOption="selectedOption" />
    </div>
    <div v-if="!loading" class=" md:px-16 lg:pt-28 lg:py-20">
      <div class="lg:flex lg:px-12 px-4  hidden justify-center items-center  rounded-t-lg lg:bg-white">
        <SearchComponent :loading="isSearchingLoading" @startSearch="startSearch" @selectOption="selectOption" :selectedOption="selectedOption" />
      </div>
      <TabNavigationsWishlist2 v-if="!isSearching" :activeTab="activeTab" @switchTab="setActiveTab" class="pt-4 lg:pt-10" />
      
      <div v-if="!isSearching">
        <FriendorWishlist 
           @shareWishlist = "shareWishlist"
          v-if="currentWishlistsHaveItems" 
          :activeTab="activeTab" 
          :wishlists="currentWishlists" 
          @preview="prevWish" 
        />
        <EmptyStateExplore 
          v-else 
          :title="'No wishlists to explore'" 
          :message="'It looks like there are no public wishlists to discover right now. Check back later or create your own wishlist!'" 
          :showButton="false" 
        />
      </div>
      
      <SearchResultsComponent 
    v-if="isSearching" 
    :results="searchResults" 
    :search="search" 
    :selectedOption="selectedOption"
    @friendRequestSent="handleFriendRequestSent"
  />
      <!-- Conditionally show the modals -->
      <CategoryPopup v-if="showCategoryModal" @close="closeCategoryModal" @showCreateWishlistModal="showCreateWishlistModal = true" />
      <CreatedWishlistModal v-if="showCreatedWishlistModal" @close="closeCreatedWishlistModal" title="New Wishlist Created! ✨" description="Your wishlist is live and ready to shine! Start adding those dream wish items and share it with friends to get the gifts you’ve been wishing for." viewWishlistText="View Wishlist" makeAWishText="Make a Wish" />
      <CreateWishlistModal @createWishList="createWishList" v-if="showCreateWishlistModal" @close="closeCreateWishlistModal" />
      <WishDetailView v-if="showWishDetailsModal" @close="closeWishDetailsModal" :wish="showPrevWish" />
    </div>
  </div>
  <Loader :show="loading" />
</template>

  
  <script>
  import Loader from '@/components/Loader.vue';
  import EmptyStateExplore from '@/components/Dashboard/EmptyState.vue';
  import AppHeader from '@/components/Dashboard/AppHeader.vue';
  import TabNavigationsWishlist2 from '@/components/Dashboard/TabNavigationsWishlist2.vue';
  import FriendorWishlist from '@/components/Dashboard/FriendorWishlist.vue';
  import Popup from '@/components/Dashboard/Popup.vue';
  import CategoryPopup from '@/components/Dashboard/CategoryPopup.vue';
  import CreateWishlistModal from '@/components/Dashboard/CreateWishlistModal.vue';
  import SearchComponent from '@/components/Dashboard/SearchComponent.vue';
  import SearchResultsComponent from '@/components/Dashboard/SearchResultsComponent.vue';
  import CreatedWishlistModal from '@/components/Dashboard/CreatedWishlistModal.vue';
  import WishDetailView from '@/components/Dashboard/WishDetailView.vue';
  import { eventBus } from '@/eventBus.js';
  export default {
    components: {
      Loader,
      EmptyStateExplore,
      AppHeader,
      TabNavigationsWishlist2,
      FriendorWishlist,
      Popup,
      CategoryPopup,
      CreateWishlistModal,
      SearchComponent,
      SearchResultsComponent,
      CreatedWishlistModal,
      WishDetailView,
    },
    data() {
    return {
      search: null,
      showPrevWish: null,
      showWishDetailsModal: false,
      showCreatedWishlistModal: false,
      showCategoryModal: false,
      showInitialModal: true,
      showCreateWishlistModal: false,
      openDropdownId: null,
      activeTab: 'Wishes',
      exploreWishlists: { trending: [], recent: [], birthdays: [] },
      friendsWishlists: { recent: [], birthdays: [], reserved_wishes: [] },
      isSearching: false,
      isSearchingLoading: false,
      searchResults: [],
      selectedOption: 'Friends', // 'Friends' or 'Wishlist'
      loading:true
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    currentWishlists() {
      return this.activeTab === 'Wishes' ? this.exploreWishlists : this.friendsWishlists;
    },
    currentWishlistsHaveItems() {
      return (
        (this.currentWishlists.trending && this.currentWishlists.trending.length > 0) ||
        (this.currentWishlists.recent && this.currentWishlists.recent.length > 0) ||
        (this.currentWishlists.birthdays && this.currentWishlists.birthdays.length > 0) ||
        (this.activeTab === 'Friends' && this.currentWishlists.reserved_wishes && this.currentWishlists.reserved_wishes.length > 0)
      );
    },
  },
    methods: {

      shareWishlist(wishlistId, wishlistUser){
      this.$emit('shareWishlist', wishlistId, wishlistUser);
    },

      handleFriendRequestSent({ friend, message }) {
      // Update the searchResults array to reflect the new friendship status
      const index = this.searchResults.findIndex(f => f.username === friend.username);
      if (index !== -1) {
        this.searchResults[index] = {
          ...this.searchResults[index],
          friendship_status: friend.friendship_status,
          friendship_id: friend.friendship_id
        };
      }
      
      // Show success message to user
      eventBus.onSuccess(message || `Friend request sent to ${friend.username}`);
    },

      async loadData() {
      this.loading = true;  // Start loading
      try {
        await Promise.all([
        this.fetchExploreWishlists(),
        this.fetchFriendsWishlists(),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;  // Stop loading
      }
    },

      async fetchExploreWishlists() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/explore/wishlists`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const data = response.data.data;
        this.exploreWishlists = {
          trending: data.trending || [],
          recent: data.recent || [],
          birthdays: data.birthdays || [],
        };
      } catch (error) {
        console.error('Error fetching explore wishlists:', error);
      }
    },
    async fetchFriendsWishlists() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/explore/friends`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const data = response.data.data;
        this.friendsWishlists = {
          recent: data.recent || [],
          birthdays: data.birthdays || [],
          reserved_wishes: data.reserved_wishes || [],
        };
      } catch (error) {
        console.error('Error fetching friends wishlists:', error);
      }
    },
      
      prevWish(wishId) {
        this.showWishDetailsModal = true;
        this.showPrevWish = this.showPrevWish === wishId ? null : wishId;
      },
      closeWishDetailsModal() {
        this.showWishDetailsModal = false;
        this.showPrevWish = null;
      },
      createWishList() {
        this.showCreatedWishlistModal = true;
        this.showCreateWishlistModal = false;
      },
      closeCreatedWishlistModal() {
        this.showCreateWishlistModal = false;
      },
      addNewWishList() {
        this.showCategoryModal = true;
      },
      closeCategoryModal() {
        this.showCategoryModal = false;
      },
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      closeInitialModal() {
        this.showInitialModal = false;
      },
      closeCreateWishlistModal() {
        this.showCreateWishlistModal = false;
      },
      handleToggleDropdown(wishlistId) {
        this.openDropdownId = this.openDropdownId === wishlistId ? null : wishlistId;
      },
      handleCloseDropdown() {
        this.openDropdownId = null;
      },
      async startSearch(query) {
        this.search = query;
        if (query && query.length >= 2) {
          this.isSearchingLoading = true
          try {
            let response;
            if (this.selectedOption === 'Friends') {
              response = await this.$axios.get(`${this.$baseURL}/explore/search`, {
                params: {
                  type: 'friends',
                  value: query
                },
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
              });
            } else {
              response = await this.$axios.get(`${this.$baseURL}/explore/search`, {
                params: {
                  type: 'wishlists',
                  value: query
                },
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
              });
            }
            this.searchResults = response.data.data || [];
            this.isSearching = true;
          } catch (error) {
            console.error('Search error:', error);
            this.searchResults = [];
            this.isSearching = false;
          }finally {
          this.isSearchingLoading = false; // Stop searching
        }
        } else {
          this.isSearching = false;
          this.searchResults = [];
        }
      },
      selectOption(option) {
        this.selectedOption = option;
        this.isSearching = false;
      }
    },
  };
  </script>
  