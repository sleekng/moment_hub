<template>
  <div @click="viewWishlist" class="card group hover:border-primaryColor h-full cursor-pointer" :class="['bg-white rounded-lg shadow-md p-4 border', isDropdownOpen ? 'border-primaryColor' : 'border-gray-100']">
    <div v-if="isExplore" class="flex items-center space-x-2 mt-2 pb-2">
      <div class="flex items-center space-x-2">
        <img :src="wishlist.user.avatar || '/assets/avatar.svg'" alt="Avatar" class="w-6 h-6 rounded-full">
        <span class="font-bold whitespace-nowrap text-sm">{{ wishlist.user.first_name }} {{ wishlist.user.last_name }}</span>
        <span class="text-gray-600 font-normal text-xs">@{{ wishlist.user.username }}</span>
      </div>
    </div>
    
    <!-- Conditional Image and Menu-option for Dashboard -->

    <div class="relative mb-4">
      <img class="w-full h-56 object-cover rounded-md" :src="wishlist.photo || `/assets/`+ wishlist.category.slug + `.svg` " alt="Wishlist Image" />
      <button v-if="!isExplore" @click.stop="toggleMenu" class="absolute z-30 top-2 right-2 p-1 bg-gray-200 rounded-full toggle-menu-button transition-opacity opacity-0 group-hover:opacity-100">
        <img src="/assets/frame-1618868216.svg" alt="Menu" class="h-6 w-6" />
      </button>

      <!-- Main dropdown container that only shows on Dashboard -->
      <div v-if="isDashboard">
        <!-- Dropdown menu that appears when isDropdownOpen is true and closes on mouseleave -->
        <div v-if="isDropdownOpen" @mouseleave="closeMenu" class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-50 right-4">
          <!-- Share wishlist option -->
          <div @click.stop="toggleShareMenu" class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer">
            <i class="fa-regular fa-arrow-up-from-bracket moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-sm">Share wishlist with friends</span>
          </div>

          <!-- Edit wishlist option -->
          <div class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200" @click.stop="$emit('editWishlist', wishlist)">
            <i class="fa-light fa-pen-to-square moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">Edit wishlist</span>
          </div>

          <!-- Archive wishlist option -->
          <div class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200" @click.stop="archiveWishlist">
            <i v-if="!isArchiving" class="fa-light fa-box-archive moment-text-effect-child"></i>
            <i v-else class="fa-solid fa-spinner fa-spin moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">
              {{ isArchiving ? 'Archiving...' : 'Archive wishlist' }}
            </span>
          </div>

          <!-- Delete wishlist option -->
          <div class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200" @click.stop="$emit('deleteWishlist', wishlist.id)">
            <i class="fa-light fa-light fa-circle-xmark moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">Delete</span>
          </div>
        </div> 
      </div>
      <div v-if="isArchived">
         <div v-if="isDropdownOpen" @mouseleave="closeMenu" class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-50 right-4">
          <div class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200" @click.stop="archiveWishlist">
  
            <i v-if="!isArchiving" class="fa-solid fa-gift mr-1 moment-text-effect-child"></i>
            <i v-else class="fa-solid fa-spinner fa-spin moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">
              {{ isArchiving ? 'Restoring...' : 'Restore' }}
            </span>
          </div>
           <div class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200" @click.stop="$emit('deleteWishlist', wishlist.id)">
            <i class="fa-light fa-light fa-circle-xmark moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">Delete</span>
          </div>
          
         </div>
       </div>
      <div v-if="UsersProfile">
         <div v-if="isDropdownOpen" @mouseleave="closeMenu" class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-50 right-4">
                  <!-- Share wishlist option -->
          <div @click.stop="toggleShareMenu" class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer">
            <i class="fa-regular fa-arrow-up-from-bracket moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium">Share wishlist</span>
          </div>
          
         </div>
       </div>
    </div>
    
    <!-- Content -->
    <div class="flex flex-col space-y-2">
      <!-- Tag -->
      <div class="bg-[#FEF7FF] text-primaryColor px-3 py-1 whitespace-nowrap rounded-full w-min text-xs">{{ wishlist.category.name }}</div>
      <!-- Title -->
      <h3 class="text-xl font-semibold">{{ wishlist.title }}</h3>
      <!-- Description -->
      <!-- Wishes -->
      <div class="flex items-center text-gray-600">
        <i class="fa-solid fa-gift mr-1 text-primaryColor text-[12px]"></i>
        <span class="font-bold mr-1">{{ wishlist.wishes_count }}</span> Wishes
      </div>
    </div>

    <!-- Stats -->
    <div class="flex justify-end space-x-2 items-center mt-4 text-gray-600">
      <div class="flex items-center" @click.stop="toggleLike">
        <i :class="wishlist.liked_by_me ? 'fa-solid fa-heart text-red-500' : 'fa-light fa-heart'" class="mr-1 text-[14px]"></i>
        <span>{{ wishlist.likes_count }}</span>
      </div>
      <div class="flex items-center">
        <i class="fa-light fa-eye mr-1 text-[14px]"></i>
        <span>{{ wishlist.views_count }}</span>
      </div>
    </div>

    <!-- Share Modal -->
    <div
      v-if="isShareMenuOpen"
      @click.stop
      class="fixed inset-0 flex p-4 items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          @click.stop="toggleShareMenu"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="flex space-x-4 items-center pb-2">
          <span class="font-bold text-lg">Share with friends</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
          <button
            @click.stop="copyLink"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
          <button
            @click.stop="shareToEmail"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-envelope"></i>
            <span>Share to Email</span>
          </button>
          <button
            @click.stop="shareToWhatsApp"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-whatsapp"></i>
            <span>Share to Whatsapp</span>
          </button>
          <button
            @click.stop="shareToTwitter"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-twitter"></i>
            <span>Share to Twitter</span>
          </button>
          <div class="lg:col-span-2 lg:inline-flex lg:justify-center w-full">
            <button
              @click.stop="shareToFacebook"
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
</template>

<script>
import { eventBus } from '@/eventBus.js';
import { isTokenExpired } from "@/router/index.js"; // Add this import

export default {
  name: 'WishlistCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    wishlist: {
      type: Object,
      required: true,
    },
    openDropdownId: {
      required: true,
    },
  },

  data(){
    return{
      currentUser: null,
      isArchiving: false,
      isShareMenuOpen: false,
    }
  },
  
  computed: {
    isLoggedIn() {
      // Check if the user is logged in by verifying the token
      return localStorage.getItem('authToken') && !isTokenExpired();
    },
    isWishOwner() {
        if (!this.currentUser || !this.wishlist) {
            return false;
        }
        // Find the current user's wishlist that matches this wishlist's ID
        const userWishlist = this.currentUser.wishlists.find(w => w.id === this.wishlist.id);
        return !!userWishlist; // Returns true if the wishlist belongs to the current user
    },
    isDashboard() {
      return this.$route.path === '/dashboard';
    },
    isArchived() {
      return this.$route.path === '/archived';
    },
    UsersProfile() {
      return this.$route.name === 'UsersProfile';
    },
    isExplore() {
      return this.$route.path === '/explore';
    },
    isDropdownOpen() {
      return this.openDropdownId === this.wishlist.id;
    },
    categoryImage() {
      const categoryImages = {
        anniversary: '/assets/others-3.svg',
        'baby-shower': '/assets/baby.svg',
        birthday: '/assets/13-1.svg',
        wedding: '/assets/wedding.svg',
        book: '/assets/others-5.svg',
        fashion: '/assets/others.svg',
        gadgets: '/assets/others-4.svg',
        graduation: '/assets/graduation.svg',
        holiday: '/assets/holiday.svg',
        'house-warming': '/assets/others-2.svg',
        others: '/assets/others-9.svg',
        personal: '/assets/personal.svg',
        'pet-supply': '/assets/others-7.svg',
        ramadan: '/assets/others-8.svg',
        travel: '/assets/others-6.svg',
      };
      return categoryImages[this.wishlist.category.slug];
    },
  },
  async created() {
    this.loadCurrentUser(); // Load user data when component is created
  },
  methods: {
    redirectToLogin() {
      this.$router.push('/login');
    },

    loadCurrentUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.currentUser = userData;
      }
    },

    toggleMenu(event) {
      if (!this.isLoggedIn) {
        event.stopPropagation();
        this.redirectToLogin();
        return;
      }
      this.$emit('toggleDropdown', this.wishlist.id);
    },

    closeMenu() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.$emit('closeDropdown', this.wishlist.id);
    },

    shareWishlist(event) {
      if (!this.isLoggedIn) {
        event.stopPropagation();
        this.redirectToLogin();
        return;
      }
      this.$emit('shareWishlist', this.wishlist.id, this.user.username ? this.user.username : this.currentUser.username);
    },

    viewWishlist() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      const routeParams = this.isWishOwner
        ? { id: this.wishlist.id, username: this.currentUser.username }
        : { id: this.wishlist.id, username: this.user.username };
      this.$router.push({ name: 'Wishlist', params: routeParams });
    },

    async archiveWishlist(event) {
      if (!this.isLoggedIn) {
        event.stopPropagation();
        this.redirectToLogin();
        return;
      }
      if (this.isArchiving) return;
      
      this.isArchiving = true;
      try {
        const response = await this.$axios.post(`${this.$baseURL}/archived-wishlists`, {
          wishlist_id: this.wishlist.id
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        
        if (response.data.success) {
          eventBus.onSuccess(response.data.message);
          this.$emit('wishlistArchived', this.wishlist.id);
        }
      } catch (error) {
        console.error('Error archiving wishlist:', error);
        eventBus.onError('Failed to archive wishlist');
      } finally {
        this.isArchiving = false;
      }
    },

    async toggleLike(event) {
      if (!this.isLoggedIn) {
        event.stopPropagation();
        this.redirectToLogin();
        return;
      }
      try {
        const likeStatus = !this.wishlist.liked_by_me;
        const response = await this.$axios.put(`${this.$baseURL}/wishlists/${this.wishlist.id}`, {
          like: likeStatus
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        if (response.data.success) {
          this.wishlist.liked_by_me = response.data.data.liked_by_me;
          this.wishlist.likes_count = response.data.data.likes_count;
        }
      } catch (error) {
        console.error('Error toggling like status:', error);
        eventBus.onError('Failed to update like status.');
      }
    },
    toggleShareMenu() {
      this.isShareMenuOpen = !this.isShareMenuOpen;
    },
    copyLink() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.wishlist.id}`;
      const message = this.isWishOwner 
        ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}/${this.user.username}`
        : `Check out this wishlist: ${wishlistUrl}/${this.user.username}`;
      navigator.clipboard.writeText(message).then(() => {
        eventBus.onSuccess("Wishlist link copied to clipboard!");
      });
    },
    shareToEmail() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.wishlist.id}`;
      const subject = encodeURIComponent(
        this.isWishOwner
          ? `Check out my wishlist on Moments Hub`
          : `Check out this wishlist: ${this.wishlist.title}`
      );
      const body = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}/${this.user.username}`
          : `Check out this wishlist: ${wishlistUrl}/${this.user.username}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.wishlist.id}`;
      const text = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}/${this.user.username}`
          : `Check out this wishlist: ${wishlistUrl}/${this.user.username}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.wishlist.id}`;
      const text = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}/${this.user.username}`
          : `Check out this wishlist: ${wishlistUrl}/${this.user.username}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.wishlist.id}/${this.user.username}`;
      const url = encodeURIComponent(wishlistUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.moment-text-effect-parent:hover {
  background-color: #FEF4FF;
  transition: all 0.2s linear;
}

.moment-text-effect-parent:hover .moment-text-effect-child {
  color: #E567F8;
  transition: all 0.2s linear;
}
</style>
