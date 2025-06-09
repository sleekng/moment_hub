<template>
  <div  v-if="showAppHeader && isLoggedIn">
    <div v-if="!isLoggedIn">
  
      <header class="flex justify-between items-center bg-white px-4 lg:px-16 border-b border-gray-300 fixed w-full top-0 z-50 lg:h-20 h-14">
        <!-- Logo and Navigation Toggle for Mobile -->
        <div class="flex items-center lg:hidden">
          <img @click="toggleMobileMenu" src="/assets/mobile-nav.svg" alt="Menu" class="h-5 w-5 mr-4 cursor-pointer" />
        </div>
    
        <!-- Logo and Navigation for Desktop -->
        <div class="hidden lg:flex items-center h-full">
          <router-link to="/">
            <img src="/assets/logo.svg" alt="Logo" class="h-10" />
          </router-link>
        
        </div>   
      </header>
      <!--Mobile Notification and Profile Section -->
      <div v-if="showNotifications" class="fixed left-0 lg:hidden top-12 w-full h-screen bg-white border overflow-hidden rounded-lg shadow-lg z-40">
        <NotificationDropdown :notifications="notifications" @shareAddress="showShareAddressModalMethod" @cancelReservation="cancelReservation"   @refreshNotifications="fetchNotifications" />
      </div>
    
      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" @click.stop="toggleMobileMenu" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex flex-col lg:hidden">
        <div class="bg-white w-72 h-screen space-y-2 shadow-lg">
  
        </div>
      </div>
    </div>
    <div v-else>
      <!--       <ShareAddressModal    ref="shareAddressModal"  @shareConfirmed="handleShareConfirmed"  @addressSelected="handleAddressSelected" @close="closeShareAddressModal" :selectedNotification="selectedNotification" :showShareAddressModal="true"/> -->
  
      <header class="flex justify-between items-center bg-white px-4 lg:px-16 border-b border-gray-300 fixed w-full top-0 z-50 lg:h-20 h-14">
        <!-- Logo and Navigation Toggle for Mobile -->
        <div class="flex items-center lg:hidden">
          <img @click="toggleMobileMenu" src="/assets/mobile-nav.svg" alt="Menu" class="h-5 w-5 mr-4 cursor-pointer" />
          <router-link to="/">
            <img src="/assets/logo.svg" alt="Moments Hub Logo" class="h-8" />
          </router-link>
        </div>
    
        <!-- Logo and Navigation for Desktop -->
        <div class="hidden lg:flex items-center h-full">
          <router-link to="/">
            <img src="/assets/logo.svg" alt="Logo" class="h-10" />
          </router-link>
          <nav class="flex ml-16 h-full space-x-8">
            <RouterLink to="/dashboard" :class="[isActiveRoute('dashboard') ? 'bg-primaryMainBright border-b-2 border-primaryColor' : '']" class="flex pb-4 mt-4 items-center space-x-1 px-2 whitespace-nowrap xl:px-4 py-2">
              <span :class="isActiveRoute('dashboard') ? 'text-gray-900' : 'text-gray-600'" class="text-xs xl:text-lg font-medium">
                My Wishlist
              </span>
            </RouterLink>
            <RouterLink to="/explore" :class="[isActiveRoute('explore') ? 'bg-primaryMainBright border-b-2 border-primaryColor' : '']" class="flex pb-4 mt-4 items-center space-x-1 px-4 py-2">
              <span :class="isActiveRoute('explore') ? 'text-gray-900' : 'text-gray-600'" class="text-xs xl:text-lg  font-medium">
                Explore
              </span>
            </RouterLink>
          </nav>
        </div>
    
        <div class="flex lg:hidden items-center h-full space-x-3">
          <img @click.stop="toggleNotifications" src="/assets/bell.svg" alt="Notifications" class="h-6 w-6" />
          <router-link to="/explore" class="flex items-center h-full">
            <i class="fa-regular fa-magnifying-glass text-gray-700 text-xl"></i>
          </router-link>
        </div>
     
        <!-- Search and Action Buttons for Desktop -->
        <div class="hidden lg:flex items-center space-x-6 relative">
          <!-- Search Input -->
          <div class="relative" ref="searchDropdown">
            <input type="text" placeholder="Search" v-model="searchQuery" @focus="showRecentSearches" @input="filterResults" class="py-2 pl-10 px-4 border rounded-md w-[320px] bg-gray-100" />
            <img v-if="!loading" src="/assets/magnifying-glass.svg" class="absolute left-0 top-[14px] px-4 w-12" alt="Search Icon" />
            <i v-if="loading" class="fas fa-spinner fa-spin absolute left-0 top-[14px] px-4 w-12 text-gray-500"></i>
    
            <!-- Search Dropdown -->
            <div v-if="showSearchDropdown" class="absolute left-0 top-12 mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
              <div class="p-4">
                <div class="flex justify-between items-center mb-4">
                  <span class="font-medium text-lg text-gray-900">{{ searchQuery ? 'Search Results' : 'Recent Searches' }}</span>
                  <button v-if="people.length > 0 || wishlists.length > 0" class="text-pink-500 text-sm" @click="clearRecentSearches">Clear all</button>
                </div>
                <RecentSearchList :people="searchQuery ? filteredPeople : people" :wishlists="searchQuery ? filteredWishlists : wishlists" @selectResult="selectResult" @removePerson="removePerson" @removeWishlist="removeWishlist" />
              </div>
            </div>
          </div>
    
          <!-- Create Wishlist Button -->
          <button @click="Createa" class="flex items-center justify-center  bg-primaryColor transition-all whitespace-nowrap hover:shadow text-white py-2 px-6 rounded-full">
            <img src="/assets/add-2.svg" alt="Add" class="h-4 w-4 " />
            <span class="text-xs xl:text-base"> Create wishlist</span>
           
          </button>
    
        <!-- Notification and Profile Section -->
        <div class="relative cursor-pointer">
          <img @click.stop="toggleNotifications" src="/assets/bell.svg" alt="Notifications" class="h-6 w-6" />
          <!-- Pink dot for new notifications -->
          <div v-if="hasUnreadNotifications" class="w-2 h-2 bg-pink-500 rounded-full absolute top-0 right-0"></div>
          <img v-if="showNotifications" src="/assets/notification-arrow.svg" alt="Notifications" class="h-6 w-6 absolute" />
    
        <!-- Notifications Dropdown -->
            <div v-if="showNotifications" ref="notificationDropdown" class="absolute -right-20 top-10 w-[450px] bg-white border overflow-hidden rounded-lg shadow-lg z-50">
              <NotificationDropdown :notifications="notifications" @shareAddress="showShareAddressModalMethod" @cancelReservation="cancelReservation" @refreshNotifications="fetchNotifications" @handleAction="handleAction"  />
            </div>
          </div>
    
          <!-- Profile Section -->
          <div class="relative">
            <div @click="toggleProfileDropdown" class="flex items-center cursor-pointer space-x-2">
              <img :src="user.avatar || '/assets/profile.svg'" alt="Profile" class="h-10 w-10 rounded-full" />
              <img src="/assets/arrow-down.svg" alt="Dropdown" class="h-4 w-4" />
            </div>
    
            <!-- Profile Dropdown -->
            <div v-if="showProfileDropdown" @mouseleave="showProfileDropdown = false" class="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
              <div class="p-4 flex items-center gap-4">
                <img :src="user.avatar || '/assets/profile.svg'" alt="Profile" class="w-12 h-12 rounded-full" />
                <div>
                  <p class="text-lg font-semibold text-gray-900">{{ user.first_name }} {{ user.last_name }}</p>
                  <p class="text-sm text-gray-500">@{{ user.username }}</p>
                </div>
              </div>
              <hr />
              <div class="py-2">
                <RouterLink to="/archived" class="px-4 py-2 cursor-pointer block hover:bg-gray-100">Archived wishlist</RouterLink>
                <RouterLink to="/account" class="px-4 block py-2 cursor-pointer hover:bg-gray-100">Account settings</RouterLink>
              </div>
              <hr />
              <div class="py-2">
                <a href="/" target="_blank" class="px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-100">
                  <span>How it works</span>
                  <img src="/assets/Gotoweb.svg" alt="External Link" class="w-4 h-4" />
                </a>
                <div @click="signOut" class="px-4 py-2 cursor-pointer hover:bg-gray-100">Sign out</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    
      <!--Mobile Notification and Profile Section -->
      <div v-if="showNotifications" class="fixed left-0 lg:hidden top-12 w-full h-screen bg-white border overflow-hidden rounded-lg shadow-lg z-[999999999]">
        <NotificationDropdown :notifications="notifications" @shareAddress="showShareAddressModalMethod" @cancelReservation="cancelReservation" @refreshNotifications="fetchNotifications" @handleAction="handleAction"   />
      </div>
    
      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" @click.stop="toggleMobileMenu" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex flex-col lg:hidden">
        <div class="bg-white w-72 h-screen space-y-2 shadow-lg">
          <div class="flex items-center p-6 justify-between">
            <div class="flex items-center">
              <img :src="user.avatar || '/assets/profile.svg'" alt="Profile" class="w-12 h-12 rounded-full mr-4" />
              <div>
                <p class="text-base font-semibold text-gray-900">{{ user.first_name }} {{ user.last_name }}</p>
                <p class="text-sm text-gray-500">@{{ user.username }}</p>
              </div>
            </div>
            <img @click.stop="toggleMobileMenu" src="/assets/close.svg" alt="Close" class="h-5 w-5 z-50 relative cursor-pointer self-start" />
          </div>
          <hr class="my-4" />
          <div class="px-6">
            <RouterLink to="/dashboard" class="block py-2 text-lg font-medium">My Wishlist</RouterLink>
            <RouterLink to="/explore" class="block py-2 text-lg font-medium">Explore</RouterLink>
            <RouterLink to="/archived" class="block py-2 text-lg font-medium">Archived wishes</RouterLink>
            <RouterLink to="/account" class="block py-2 text-lg font-medium">Account settings</RouterLink>
          </div>
          <hr class="my-4" />
          <div class="px-6">
            <a href="/" target="_blank" class="flex justify-between items-center py-2">
              <span class="text-lg font-medium">How it works</span>
              <img src="/assets/Gotoweb.svg" alt="External Link" class="w-4 h-4" />
            </a>
            <button @click="signOut" class="block py-2 font-medium text-lg">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
    <ShareAddressModal @addressSelected="handleAddressSelected"   ref="shareAddressModal"
    @shareConfirmed="handleShareConfirmed" @close="closeShareAddressModal" :selectedNotification="selectedNotification || {}" :showShareAddressModal="showShareAddressModal" />
  </div>

</template>

<script>
import ShareAddressModal from '@/components/ShareAddressModal.vue';
import NotificationDropdown from './NotificationDropdown.vue';
import RecentSearchList from './RecentSearchList.vue';
import { eventBus } from '@/eventBus.js';
import { isTokenExpired } from "@/router/index.js"; // Import the function

export default {
  emits: ['showCategoryModal'],

  components: {
    NotificationDropdown,
    RecentSearchList,
    ShareAddressModal,
    
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      showShareAddressModal: false,
      selectedNotification: null,
      selectedAddressId: null,
      loading: false,
      searchQuery: '',
      showNotifications: false,
      showProfileDropdown: false,
      showSearchDropdown: false,
      showMobileMenu: false,
      showAppHeader: true,
      user: {
        username: '',
        first_name: '',
        last_name: '',
        avatar: '',
      },
      people: [],
      wishlists: [],
      filteredPeople: [],
      filteredWishlists: [],
      notifications: [],
      headerPaths: [
        "/verification-sent",
        "/",
        "/login",
        "/forgot-password",
        "/create-option",
        "/register",
        "/privacy",
        "/password-reset",
        "/terms-condition",
        "/basic-info",
        "/additional-info"
      ]
    };
  },
  async mounted() {
    this.checkAuth();
    this.checkHeaderVisibility();
    window.addEventListener("resize", this.handleResize);

    if(this.isLoggedIn){
      this.loadUserData();
      this.getRecentSearches();
      document.addEventListener('click', this.handleClickOutside);
      await this.fetchNotifications();
    }
  },

  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.checkAuth();
        this.checkHeaderVisibility();
        if(this.isLoggedIn) {
          this.loadUserData();
        }
      }
    }
  },
  computed: {
    isLoggedIn() {
      // Check if the user is logged in by verifying the token
      return localStorage.getItem('authToken') && !isTokenExpired();
    },

    hasUnreadNotifications() {
      return this.notifications.some(notification => notification.read_at === null);
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },

    checkAuth() {
    this.isLoggedIn = localStorage.getItem('authToken') && !isTokenExpired();
  },

  checkHeaderVisibility(route) {
    const path = route?.path || this.$route?.path;
    if (!path) return;
    
    // Always show header if user is logged in, unless on specific paths
    if (this.isLoggedIn) {
      const shouldHide = this.headerPaths.some(hiddenPath => {
        return path === hiddenPath || path.startsWith(hiddenPath + '/');
      });
      this.showAppHeader = !shouldHide;
    } else {
      // If not logged in, only show on specific paths
      const shouldShow = this.headerPaths.some(hiddenPath => {
        return path === hiddenPath || path.startsWith(hiddenPath + '/');
      });
      this.showAppHeader = shouldShow;
    }
  },

  async handleAction({ action, notification }) {
      try {
      
        if(action.text === 'Share address'){

        }else{
          eventBus.setLoading(true);
        }

        // Send a PUT request to mark the notification as read
        await this.$axios.get(`${this.$baseURL}/notifications/${notification.id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        if (action.text === 'Accept') {
          eventBus.setLoading(true);
          const action_id = notification.action_id;
          const notification_id = notification.id;
          try {
            const response = await this.$axios.put(`${this.$baseURL}/friends/${action_id}?notification_id=${notification_id}`, { status: 'accepted' }, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            eventBus.onSuccess(response.data.message);
            await this.fetchNotifications();
          } catch (error) {
            if (error.response) {
              if (error.response.data.message) {
                eventBus.onError(error.response.data.message);
              } else if (error.response.data.errors) {
                const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
                eventBus.onError(errorMsg);
              } else {
                eventBus.onError("An unexpected error occurred. Please try again.");
              }
            }
          }
        } else if (action.text === 'Decline') {
          eventBus.setLoading(true);
          const action_id = notification.action_id;
          const notification_id = notification.id;
          try {
              const response = await this.$axios.put(`${this.$baseURL}/friends/${action_id}?notification_id=${notification_id}`, { status: 'rejected' }, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            eventBus.onSuccess(response.data.message);
            await this.fetchNotifications();
          } catch (error) {
            if (error.response) {
              if (error.response.data.message) {
                eventBus.onError(error.response.data.message);
              } else if (error.response.data.errors) {
                const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
                eventBus.onError(errorMsg);
              } else {
                eventBus.onError("An unexpected error occurred. Please try again.");
              }
            }
          }
        } else if (action.text === 'Share address') {
          this.showShareAddressModalMethod(notification);
        } else if (action.text === 'Cancel reservation') {
          this.cancelReservation(notification);
        } else if (action.text === 'Move to archive') {
          this.moveToArchive(notification.action.wishlist_id);
        } else if (action.text === 'Check them out') {
          this.viewWishlist(notification.action_id, notification.notifier.username);
        } else if (action.text === 'View wishlist') {
          this.viewWishlist(notification.action_id, notification.notifier.username);
        } else if (action.text === 'Create wishlist') {
          this.$router.push({ name: 'CreateWishlist' });
        }

        // Refresh notifications
      

      } catch (error) {
        console.error('Error handling action:', error);
      }
    },

    async moveToArchive(wishlistId){
      eventBus.setLoading(true);
      try {
        const response = await this.$axios.post(`${this.$baseURL}/archived-wishlists`, {
          wishlist_id: wishlistId
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        
        if (response.data.success) {
          eventBus.onSuccess(response.data.message);
          this.$emit('wishlistArchived', wishlistId);
        }

        await this.fetchNotifications();
      } catch (error) {
        if (error.response) {
              if (error.response.data.message) {
                eventBus.onError(error.response.data.message);
              } else if (error.response.data.errors) {
                const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
                eventBus.onError(errorMsg);
              } else {
                eventBus.onError("An unexpected error occurred. Please try again.");
              }
            }
      }
    },
    
    async fetchNotifications() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/notifications`, {
          headers: { 'Authorization': `Bearer ${this.getToken()}` }
        });
        if (response.data.success) {
          this.notifications = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
      finally {
        eventBus.setLoading(false);
      }
    },

    closeShareAddressModal() {
      this.showShareAddressModal = false;
      this.selectedNotification = null;
      this.selectedAddressId = null;
    },

    showShareAddressModalMethod(notification) {

      this.selectedNotification = notification;
      this.showShareAddressModal = true;
      this.selectedAddressId = null; // Reset selected address
      this.showNotifications = !this.showNotifications;
    },

    handleAddressSelected(addressId) {
      this.selectedAddressId = addressId;
    },
 
    async handleShareConfirmed({ addressId, notification }) {

      const wishId = notification.action_id;
      const notification_id = notification.id;
      eventBus.setLoading(true);

      try {
       const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${wishId}/address/${addressId}?notification_id=${notification_id}`,
          {},
          {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          }
        );

        eventBus.onSuccess(response.data.message);

        this.closeShareAddressModal();
        await this.fetchNotifications(); // Refresh notifications
      } catch (error) {
        if (error.response) {
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
        this.showShareAddressModal = false;
        eventBus.setLoading(false);
      }
    },

    handleClickOutside(event) {
      const searchDropdown = this.$refs.searchDropdown;
      if (searchDropdown && !searchDropdown.contains(event.target)) {
        this.showSearchDropdown = false;
      }
       const notificationDropdown = this.$refs.notificationDropdown;
      if (notificationDropdown && !notificationDropdown.contains(event.target)) {
        this.showNotifications = false;
      }
    },
    loadUserData() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.user = userData;
      }
    },
    removePerson(person) {
      this.people = this.people.filter(p => p.username !== person.username);
      this.updateRecentSearches();
    },
    removeWishlist(wishlist) {
      this.wishlists = this.wishlists.filter(w => w.name !== wishlist.name);
      this.updateRecentSearches();
    },
    updateRecentSearches() {
      const recentSearches = { people: this.people, wishlists: this.wishlists };
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    },
    getRecentSearches() {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || { people: [], wishlists: [] };
      this.people = recentSearches.people;
      this.wishlists = recentSearches.wishlists;
    },
    async search(type, value) {
      this.loading = true;
      try {
        const response = await fetch(`${this.$baseURL}/explore/search?type=${type}&value=${value}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const result = await response.json();

        if (response.ok && result.success) {
          if (type === 'friends') {
            this.filteredPeople = result.data.map(item => ({
              name: `${item.first_name} ${item.last_name}`,
              username: item.username,
              avatar: item.avatar,
              wishlists: item.wishlists_count
            }));
          } else if (type === 'wishlists') {
            this.filteredWishlists = result.data.map(item => ({
              name: item.title,
              id: item.id,
              photo: item.photo,
              username: item.user.username,
              wishes: item.wishes_count
            }));
          }
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        this.loading = false;
      }
    },
    async cancelReservation(notification) {
      const wishId = notification.action_id;
      const notification_id = notification.id;
 
      eventBus.setLoading(true);
      try {
      const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wishId}?notification_id=${notification_id}`,
          { 
            status: null,
            delivery_address:null
           },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
       
        eventBus.onSuccess(response.data.message);
        await this.fetchNotifications();
      } catch (error) {
        console.error("Error canceling reservation:", error);
        const errorMsg =
          error.response?.data?.message ||
          "Error canceling reservation. Please try again.";
        eventBus.onError(errorMsg);
      } finally {
     /*    eventBus.setLoading(false); */
      }
    },
    showRecentSearches() {
      this.showSearchDropdown = true;
      if (!this.searchQuery) {
        this.filteredPeople = [];
        this.filteredWishlists = [];
      }
    },
    filterResults() {
      const query = this.searchQuery.toLowerCase();
      if (query) {
        this.search('friends', query);
        this.search('wishlists', query);
      } else {
        this.filteredPeople = [];
        this.filteredWishlists = [];
      }
    },
    selectResult(result, type) {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || { people: [], wishlists: [] };
      if (type === 'people') {
        recentSearches.people = [...recentSearches.people.filter(person => person.username !== result.username), result];
      } else if (type === 'wishlists') {
        recentSearches.wishlists = [...recentSearches.wishlists.filter(wishlist => wishlist.name !== result.name), result];
      }
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    },
    clearRecentSearches() {
      localStorage.removeItem('recentSearches');
      this.people = [];
      this.wishlists = [];
    },
    Createa() {
      this.$emit('showCategoryModal');
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    clearSearch() {
      this.searchQuery = '';
      this.filteredPeople = [];
      this.filteredWishlists = [];
    },
    isActiveRoute(route) {
      return this.$route.name === route;
    },
    async signOut() {
      try {
        eventBus.setLoading(true);
        const response = await fetch(`${this.$baseURL}/logout`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          },
        });

        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('tokenExpiration');

          this.isLoggedIn = false;
          this.showAppHeader = false;

          this.$router.push({ path: '/login' });
          console.log('Logged out successfully');
        } else {
          console.error('Logout failed', response.status);
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg);
        console.error('Error logging out', error);
      } finally {
        eventBus.setLoading(false);
      }
    },
    getToken() {
      return localStorage.getItem('authToken');
    },
    handleAuthStateChange({ isLoggedIn, user }) {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn && user) {
        this.user = user;
        this.loadUserData();
        this.checkHeaderVisibility(); // Check header visibility after login
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  header {
    padding: 0 16px;
  }
  .text-lg {
    font-size: 1rem; /* Adjust font size for smaller screens */
  }
  .text-xl {
    font-size: 1.125rem; /* Adjust font size for smaller screens */
  }
  .h-10 {
    height: 2.5rem; /* Adjust height for smaller screens */
  }
  .w-10 {
    width: 2.5rem; /* Adjust width for smaller screens */
  }
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>