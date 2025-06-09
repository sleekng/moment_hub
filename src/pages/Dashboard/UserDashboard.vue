<template>
  <div class="bg-white lg:bg-gray-100 py-10">
   <AppHeader @showCategoryModal="$emit('showCategoryModal')" /> 
    <div v-if="!loading" class="px-4 lg:px-16 pt-10 lg:pt-20">

      <ProfileDetails :user="user" @showAnalyticsModal="ToggleAnalyticsModal" :myWishlistCount="wishlists.length" />
      <TabNavigationsWishlist :myWishlistCount="wishlists.length" :savedwishesCount="savedwishes.length"
        :reservedWishesCount="reservedWishes.length" :activeTab="activeTab" @switchTab="setActiveTab"
        @sort="handleSort" />


      <div v-if="activeTab === 'myWishes'">
        <div v-if="wishlists.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:px-12 py-8 rounded-b-lg bg-white">
          <div class="flex flex-col items-center justify-center bg-gray-100 h-full rounded-lg p-4 py-8 cursor-pointer"
            @click="$emit('showCategoryModal')">
            <div class="flex items-center justify-center w-12 h-12 bg-black rounded-full mb-4">
              <img src="/assets/add.svg" alt="Add" class="h-5 w-5" />
            </div>
            <div class="text-lg font-medium text-center text-gray-800 leading-relaxed">Make a New wishlist</div>
          </div>
          <WishlistCard :user="user" @shareWishlist="shareWishlist" v-for="wishlist in wishlists" :key="wishlist.id"
            :wishlist="wishlist" :openDropdownId="openDropdownId" @toggleDropdown="handleToggleDropdown"
            @closeDropdown="handleCloseDropdown" @deleteWishlist="handleDeleteWishlist"
            @editWishlist="handleEditWishlist" @viewWishlist="navigateToAllWishes"
            @wishlistArchived="wishlistArchived" />
        </div>
        <div v-else>

          <EmptyState title="Your wishlist is empty" message="Go ahead and create your first wishlist"
            @button-click="$emit('showCategoryModal')" :showButton="true" :userOwnsWishlist="true"
            buttonText="Create Wishlist" />
        </div>
      </div>

      <div v-if="activeTab === 'reserved'">

        <ReservedWishes v-if="reservedWishes.length > 0" @editWish="openEditWishModal" @deleteWish="handleDeleteWish" @showAddToWishlistModal="showAddToWishlistModal"
          :wishes="reservedWishes" @preview="prevWish" @newUpdate="newUpdate" @removeFromFulfiled="removeFromFulfiled" />
        <EmptyState v-else title="No wishes reserved by you" message="Reserve a wish for your friends to surprise them."
          :showButton="false" />
      </div>

      <div v-if="activeTab === 'saved'">
        <SavedWishes  v-if="savedwishes.length > 0" :wishes="savedwishes" @editWish="openEditWishModal"  @removeFromFulfiled="removeFromFulfiled" @showAddToWishlistModal="showAddToWishlistModal"
          @deleteWish="handleDeleteWish" @preview="savedPrevWish" @newUpdate="newUpdate" @reserveWish="reserveWish"   :isReserving="isReserving" />
        <EmptyState v-else title="No saved wishes" message="Save your favorite wishes here to easily find them later."
          :showButton="false" />
      </div>


      <transition name="fade">
        <div v-if="showBirthdayModal"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div class="relative">
              <img src="/assets/gif/birthday-notify.svg" alt="Celebration"
                class="w-full h-64 object-cover rounded-t-lg" />
              <button @click="closeBirthdayModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <img src="./assets/close.svg" alt="Close" class="w-6 h-6" />
              </button>
            </div>
            <div class="text-center mt-4">
              <h2 class="text-2xl font-semibold text-gray-800">Happy Birthday, {{ user.first_name }}! 🎂</h2>
              <p class="mt-2 text-gray-600">
                Birthdays are for celebrating all the amazing things about you! We hope your day is filled with joy,
                laughter, and cake (of course!)
              </p>
            </div>
          </div>
        </div>
      </transition>


      <!-- Modals -->

      <AddToWishlist :isAddingtoWishlist="isAddingtoWishlist" @saveToWishlist="saveToWishlist"  v-if="AddToWishlistModal" :wish="wishToAdd" @close="AddToWishlistModal = false" />

      <WelcomeModal v-if="showWelcomeModal" @close="closeWelcomeModal" />

      <Congratulations v-if="showInitialModal" @close="closeInitialModal" />




      <WishDetailView v-if="showWishDetailsModal" :isWishSaved="isWishSaved" :isRequestingAddress="isRequestingAddress"
          @showAddToWishlistModal="showAddToWishlistModal"
        @requestAddress="requestAddress" @editWish="openEditWishModal" @close="closeWishDetailsModal"
        :wish="showPrevWish ? showPrevWish : showSavedPrevWish" @unSaveWish="unSaveWish" @newUpdate="newUpdate"
        :isReserving="isReserving" :isFulfilling="isFulfilling" :isUnReceiving="isUnReceiving"
        :isReceiving="isReceiving" :isHasAddress="isHasAddress" @deleteWish="handleDeleteWish"
        @wishUpdated="handleWishUpdate" @reserved="reservedWish" @updateSavedStatus="handleUpdateSavedStatus"
        @markAsReceived="markAsReceived" @markAsUnreceived="markAsUnreceived" @reserveWish="reserveWish"
        @markAsFulfilled="markAsFulfilled" @cancelReservation="cancelReservation"
        @removeFromFulfiled="removeFromFulfiled" />


      <GiftReservedModal v-if="showGiftReservedModal" @close="showGiftReservedModal = false"
        @requestAddress="requestAddress" @hasAddress="hasAddress" :isRequestingAddress="isRequestingAddress"
        :isHasAddress="isHasAddress" :wish="giftReservedWish" />


      <AnalyticsModal v-if="showAnalyticsModal" :analyticsData="analyticsData" @close="closeAnalyticsModal" />
      <CreateWishModal v-if="showCreateWishModal" :wish="editingWish" @addWish="AddWish"
        @close="closeCreateWishModal" />


      <DeleteConfirmationModal v-if="showDeleteModal" :title="'WishList'"
        :description="'Are you sure you want to delete this wishlist? This action cannot be undone.'"
        @confirm="confirmDelete" @cancel="cancelDelete" />
      <DeleteConfirmationModal v-if="showDeleteWishModal" :title="'Wish'"
        :description="'Are you sure you want to delete this wish? This action cannot be undone.'"
        @confirm="confirmDelete" @cancel="cancelDelete" />
    </div>
  </div>
  <Loader :show="loading" />
</template>

<script>
import EmptyState from '@/components/Dashboard/EmptyState.vue';
import Loader from '@/components/Loader.vue';
import WelcomeModal from '@/components/Dashboard/WelcomeModal.vue';
import { eventBus } from '@/eventBus.js';
import CreateWishModal from '@/components/Dashboard/CreateWishModal.vue';
import AppHeader from '@/components/Dashboard/AppHeader.vue';
import ProfileDetails from '@/components/Dashboard/ProfileDetails.vue';
import TabNavigationsWishlist from '@/components/Dashboard/TabNavigationsWishlist.vue';
import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
import Congratulations from '@/components/Dashboard/Popup.vue';
import ReservedWishes from '@/components/Dashboard/ReservedWishes.vue';
import SavedWishes from '@/components/Dashboard/SavedWishes.vue';
import WishDetailView from '@/components/Dashboard/WishDetailView.vue';
import AnalyticsModal from '@/components/Dashboard/AnalyticsModal.vue';
import DeleteConfirmationModal from '@/components/Dashboard/DeleteConfirmationModal.vue';
import GiftReservedModal from '@/components/GiftReservedModal.vue';
import AddToWishlist from '@/components/AddToWishlist.vue';


export default {
  components: {
    WelcomeModal,
    Loader,
    EmptyState,
    CreateWishModal,
    AppHeader,
    DeleteConfirmationModal,
    ProfileDetails,
    TabNavigationsWishlist,
    WishlistCard,
    Congratulations,
    ReservedWishes,
    SavedWishes,
    WishDetailView,
    AnalyticsModal,
    GiftReservedModal,
    AddToWishlist
  },

  data() {
    return {
      AddToWishlistModal: false,
      wishToAdd: null,
      showWelcomeModal: false,
      isAddingtoWishlist: false,
      isWishSaved: false,
      isRequestingAddress: false,
      isFulfilling: false,
      isReceiving: false,
      isReserving: false,
      isUnReceiving: false,
      isHasAddress: false,
      giftReservedWish: null,
      showGiftReservedModal: false,
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        gender: '',
        dob: '',
        country: '',
        state: '',
        verified: false,
        friends_count: 0,
        likes_count: 0,
        wishlists_count: 0,
        friendship_id: null,
        friendship_status: null,
        token: ''
      },
      showBirthdayModal: false,
      showCreateWishModal: false,
      analyticsData: null,
      showAnalyticsModal: false,
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
      loading: false,  // Add loading state
      currentUser: null,

    };
  },
  computed: {
    isDashboard() {
      return this.$route.path === "/dashboard";
    },
    filteredWishlist() {
      return this.wishlists.filter(wishlist => wishlist.status === this.activeTab);
    },
    filteredSavedWish() {
      return this.wishes.filter(wish => wish.status === this.activeTab);
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser.dob) {
          const today = new Date();
          const dob = new Date(newUser.dob);
          if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
            this.showBirthdayModal = true;
          }
        }
      }
    }
  },
  created() {
    this.loadCurrentUser(); // Load current user
  },
  mounted() {
    this.loadUserData();

    if (this.user.username === null) {
      this.$router.push('/basic-info');
    }

    if (this.$route.query.showCongratulations === 'true') {
      this.showInitialModal = true;
    }
    // Show welcome modal once after registration
    if (!localStorage.getItem('welcomeShown')) {
      this.showWelcomeModal = true;
      localStorage.setItem('welcomeShown', 'true');
    }

    this.fetchAnalyticsData();

    this.loadData();


  },



  methods: {

    showAddToWishlistModal(wish) {
      this.wishToAdd = wish;
      this.AddToWishlistModal = true;
    },

    async saveToWishlist(wish,  selectedWishlistId) {

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
        this.newUpdate()
      }




    },

    async markAsReceived(wish) {
      this.isReceiving = true;
      try {
        const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          {
            status: "fulfiled",
            received: true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.showPrevWish.received = true;
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
        this.isReceiving = false; // End loading state
      }
    },
    async markAsUnreceived(wish) {
      this.isUnReceiving = true;
      try {
        const response = await this.$axios.put(
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
        this.showPrevWish.received = false;
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
        this.isUnReceiving = false;
      }
    },

    async reserveWish(wish) {


      this.isReserving = true; // Start loading state
      try {
        const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          { status: "reserved" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        /*         if (this.isDashboard) {
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
                } */

        /*    this.wish.status = "reserved"; */

        eventBus.onSuccess(response.data.message);

        if (this.isDashboard) {
          this.newUpdate();
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
        this.showPrevWish.status = "fulfiled";

/*         if (this.isDashboard) {
          this.newUpdate();
        }
 */

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
        this.isFulfilling = false;
        this.showWishDetailsModal  = false;
        this.refreshClicked(wish.id)
      }
    },

    
    async cancelReservation(wish) {


      eventBus.setLoading(true);

      try {
        const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          { status: null },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        
        eventBus.onSuccess(response.data.message);
        this.showPrevWish.status = null;

        /*    setTimeout(() => {
             window.location.reload();
           }, 2000); */
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
       
        this.refreshClicked(wish.id) 
        this.showWishDetailsModal = false;
        eventBus.setLoading(false);
      }
    },

    async removeFromFulfiled(wishId) {

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
        this.refreshClicked(wishId)
        this.showWishDetailsModal  = false;
        eventBus.setLoading(false);
      }
    },

    reservedWish(wish) {
      this.giftReservedWish = wish
      this.showWishDetailsModal = false
      this.showGiftReservedModal = true
    },

    async hasAddress(wishID) {
      eventBus.setLoading(true);
      this.isHasAddress = true

      try {

        const response = await this.$axios.put(
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
        this.isHasAddress = false
        this.showGiftReservedModal = false
        this.hasAddressClicked(wishID)
      }
    },



    async refreshClicked(wishId) {

      try {
        await Promise.all([
          this.newUpdate(),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.showPrevWish = this.reservedWishes.find(w => w.id === wishId);
        this.showPrevWish.status = null;
        this.showSavedPrevWish = this.savedwishes.find(w => w.id === wishId);
        this.showSavedPrevWish.status = null;
        this.fetchSavedWishes();
        eventBus.setLoading(false);
      }



    },
    async hasAddressClicked(wishId) {

      try {
        await Promise.all([
          this.newUpdate(),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.showWishDetailsModal = true;
        this.showPrevWish = this.reservedWishes.find(w => w.id === wishId);
        this.showPrevWish.has_address = true;
        this.showSavedPrevWish = this.savedwishes.find(w => w.id === wishId);
        this.showSavedPrevWish.has_address = true;
        eventBus.setLoading(false);
      }



    },




    loadCurrentUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.currentUser = userData;
      } else {
        this.currentUser = []; // Explicitly set to null if no user data
      }
    },
    wishlistArchived() {
      this.loadData();

    },
    newUpdate() {

      this.loadUserData();
      this.fetchAnalyticsData();

      this.loadData();
    },
    shareWishlist(wishlistId, wishlistUser) {
      this.$emit('shareWishlist', wishlistId, wishlistUser);
    },
    closeBirthdayModal() {
      this.showBirthdayModal = false;
    },
    closeWelcomeModal() {
      this.showWelcomeModal = false;
    },
    async unSaveWish(wish) {
      console.log(wish);

      eventBus.setLoading(true);
      try {
        await this.$axios.post(
          `${this.$baseURL}/saved-wishes`, {
          'wish_id': wish.id
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
        );

        eventBus.onSuccess('Wish Saved.');
        wish.status = null;
      } catch (error) {
        console.error("Error Saving Wish:", error);
        const errorMsg = error.response?.data?.message || 'Error Saving Wish. Please try again.';
        eventBus.onError(errorMsg);
      } finally {
        eventBus.setLoading(false);
      }
    },



    async requestAddress(wishID) {
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


    async loadData() {
      this.loading = true;  // Start loading
      try {
        await Promise.all([
          this.fetchWishlists(),
          this.fetchReservedAndFulfilledWishes(),
          this.fetchSavedWishes(),
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;  // Stop loading
      }
    },

    async loadUserData() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    this.user = userData;
    
    // Fetch latest user data from API
    try {
      const response = await this.$axios.get(`${this.$baseURL}/users/${userData.username}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      
      const updatedUserData = response.data.data;
      
      // Update only the specific fields from the API response
      const updatedUser = {
        ...userData, // Keep existing data
        username: updatedUserData.username,
        first_name: updatedUserData.first_name,
        last_name: updatedUserData.last_name,
        email: updatedUserData.email,
        avatar: updatedUserData.avatar,
        gender: updatedUserData.gender,
        dob: updatedUserData.dob,
        country: updatedUserData.country,
        state: updatedUserData.state,
        verified: updatedUserData.verified,
        friends_count: updatedUserData.friends_count,
        likes_count: updatedUserData.likes_count,
        wishlists_count: updatedUserData.wishlists_count,
        friendship_id: updatedUserData.friendship_id,
        friendship_status: updatedUserData.friendship_status
      };

      // Update localStorage and component state
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.user = updatedUser;
      
    } catch (error) {
      console.error('Error fetching updated user data:', error);
      // Keep using existing user data if fetch fails
    }
  }
},


    navigateToAllWishes(wishlistId) {
      this.$router.push({ name: 'Wishlist', params: { id: wishlistId } });
    },

    async fetchSavedWishes() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/saved-wishes`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.savedwishes = response.data.data || [];
      } catch (error) {
        console.error('Error fetching saved wishes:', error);
        this.savedwishes = []; // Ensure it remains an array if the API call fails
      }
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
        this.loadData()


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
      this.showDeleteWishModal = false
    },



    closeCreateWishModal() {
      this.showCreateWishModal = false;
      this.editingWish = null;
    },

    openEditWishModal(wish) {
      this.editingWish = { ...wish }; // Ensure you pass a copy of the wish to avoid direct mutation
      this.showWishDetailsModal = false
      this.showCreateWishModal = true;
    },

    handleEditWishlist(wishlist) {
      this.$emit('showCreateWishlistModal', wishlist.category, wishlist);
    },

    async fetchWishlists() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/wishlists`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.wishlists = response.data.data;
      } catch (error) {
        console.error('Error fetching wishlists:', error.response?.data?.message || error.message);
      }
    },

    async fetchReservedAndFulfilledWishes() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/gifted-wishes`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.reservedWishes = [...response.data.data.reserved, ...response.data.data.fulfiled];
      } catch (error) {
        console.error('Error fetching reserved and fulfilled wishes:', error.response?.data?.message || error.message);
      }
    },

    navigateToAllWishes(wishlistId) {
      this.$router.push({ name: 'Wishlist', params: { id: wishlistId } });
    },
    async handleDeleteWishlist(wishlistId) {
      this.wishlistToDelete = wishlistId;
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      eventBus.setLoading(true);
      try {
        await this.$axios.delete(`${this.$baseURL}/wishlists/${this.wishlistToDelete}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.loadData();
        eventBus.onSuccess('Wishlist deleted successfully.');
      } catch (error) {
        console.error('Error deleting wishlist:', error.response?.data?.message || error.message);
      } finally {
        eventBus.setLoading(false);
        this.showDeleteModal = false;
      }
    },

    closeAnalyticsModal() {
      this.showAnalyticsModal = false;
    },

    async fetchAnalyticsData() {
      try {
        const [analyticsResponse, pieChartResponse, wishGraphResponse] = await Promise.all([
          this.$axios.get(`${this.$baseURL}/analytics`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          }),
          this.$axios.get(`${this.$baseURL}/analytics/pie-chart`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          }),
          this.$axios.get(`${this.$baseURL}/analytics/wish-graph`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          })
        ]);

        this.analyticsData = {
          ...analyticsResponse.data.data,
          pieChart: pieChartResponse.data.data,
          wishGraph: wishGraphResponse.data.data
        };
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    },
    ToggleAnalyticsModal() {
      this.fetchAnalyticsData()
      this.showAnalyticsModal = true;
    },
    prevWish(wishId, isWishSaved) {
      this.showWishDetailsModal = true;
      this.isWishSaved = isWishSaved
      this.showPrevWish = this.reservedWishes.find(w => w.id === wishId);
    },
    savedPrevWish(wishId, isWishSaved) {
      this.showWishDetailsModal = true;
      this.isWishSaved = isWishSaved
      this.showSavedPrevWish = this.savedwishes.find(w => w.id === wishId);
    },
    closeWishDetailsModal() {
      this.showWishDetailsModal = false;
      this.showPrevWish = null;
    },
    closeInitialModal() {
      this.showInitialModal = false;
      window.location.href = '/dashboard';
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
      let arrayToSort = [];

      switch (this.activeTab) {
        case 'myWishes':
          arrayToSort = this.wishlists;
          break;
        case 'reserved':
          arrayToSort = this.reservedWishes;
          break;
        case 'saved':
          arrayToSort = this.savedwishes;
          break;
      }

      arrayToSort.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'amount':
            comparison = (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0);
            break;
          case 'reserved_date':
            comparison = new Date(a.reserved_at) - new Date(b.reserved_at);
            break;
          case 'saved_date':
            comparison = new Date(a.created_at) - new Date(b.created_at);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>