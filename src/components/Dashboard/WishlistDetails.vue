<template>


    <div v-if="selectedWishlist" class="wishlist-cover mt-10 rounded-t-lg px-4 lg:p-12 pt-8 pb-4 relative" 
    :style="{ 
      background: selectedWishlist.category.name === 'Birthday' 
        ? 'linear-gradient(180deg, rgba(247,204,253,1) 10.74%, rgba(252,236,255,1) 103.53%)'
        : 'linear-gradient(180deg, rgba(155,201,255,1) 85.76%, rgba(210,241,255,1) 103.38%)'
    }">

    
    <!-- Overlay to disable interactions if wish is archived -->
    <div
      v-if="filteredWishes.length > 0 && filteredWishes[0].archived"
      class="absolute inset-0 bg-gray-500 bg-opacity-0 z-50 cursor-not-allowed lg:min-w-[286px]"
    ></div>

    <div class="flex flex-col md:flex-row gap-8 relative">
      <!-- Left Content -->
      <div class="flex flex-col gap-3 flex-1 z-40">
        <!-- Profile Image -->
        <div class="w-[120px] h-[120px] rounded-full bg-[#f8f9fa] overflow-hidden">
          <img :src=" selectedWishlist.photo || `/assets/`+ selectedWishlist.category.slug + `.svg`" alt="Profile" class="w-full h-full object-cover"/>
       
        </div>
        <!-- Content Section -->
        <div class="mt-4">
          <div class="space-y-2">
            <h1 style="font-family: Mukta; font-weight: 600; font-size: 26px; line-height: 120%; color: #26052b;">
              {{ selectedWishlist.title }}
            </h1>
            <p style="font-family: Mukta; font-weight: 400; font-size: 16px; line-height: 150%; color: #210d23;">
              {{ selectedWishlist.description }}
            </p>
          </div>

          <div class="flex items-center gap-1.5 mt-4">
            <i class="fa-regular fa-calendar-days" style="font-size: 18px; color: #140d14;"></i>
            <span style="font-family: Mukta; font-weight: 500; font-size: 16px; line-height: 150%; color: #140d14;">
              {{ new Date(selectedWishlist.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </span>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <div class="flex items-center gap-1" @click.stop="toggleLike">
              <i :class="selectedWishlist.liked_by_me ? 'fas fa-heart text-red-500' : 'far fa-heart'" style="font-size: 14px;"></i>
              <span style="font-family: Mukta; font-weight: 400; font-size: 14px; line-height: 150%; color: #140d14;">
                {{ selectedWishlist.likes_count }} Likes
              </span>
            </div>
            
            <div class="w-[0.8px] h-4 bg-[#2b2b2b]"></div>
            
            <div class="flex items-center gap-1.5">
              <i class="fa-regular fa-eye" style="font-size: 14px; color: #140d14;"></i>
              <span style="font-family: Mukta; font-weight: 400; font-size: 14px; line-height: 150%; color: #140d14;">
                {{ selectedWishlist.views_count }} Views
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Actions -->
      <!-- Right Actions -->
      <div class="flex gap-3.5 right-0 z-40 absolute">
        <button v-if="canShow" @click="$emit('editWishlist', selectedWishlist)"
          class="h-10 px-7 rounded-full bg-[#f0f1f2] border border-[#fef4ff]"
          style="font-family: Mukta; font-weight: 500; font-size: 16px; line-height: 150%; color: #2d3036;">
          Edit
        </button>
        <button @click="toggleShareMenu"
          class="h-10 px-7 rounded-full bg-[#f0f1f2] border border-[#fef4ff]"
          style="font-family: Mukta; font-weight: 500; font-size: 16px; line-height: 150%; color: #2d3036;">
          Share <span class=" hidden  lg:inline">wishlist</span>
        </button>
      </div>
    </div>

    <!-- Gift Image -->
    <img  v-if="selectedWishlist.category.name == 'Birthday'"
      src="@/assets/images/gift-birthday.svg" 
      alt="Gift"
      class="absolute lg:top-[32px] top-[190px] right-[-25px] lg:w-[423px] lg:h-[403px] w-[200px]  z-0"
    />
    <img  v-if="selectedWishlist.category.name != 'Birthday'"
      src="@/assets/images/gift.svg" 
      alt="Gift"
      class="absolute lg:top-[32px] top-[190px] right-[-25px] lg:w-[423px] lg:h-[403px] w-[200px]  z-0"
    />

    <!-- Share Modal -->
    <div v-if="isShareMenuOpen" class="fixed p-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button @click="toggleShareMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
        <div class="flex space-x-4 items-center pb-2">
          <span class="font-bold text-lg">Share with friends</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
          <button @click="copyLink" class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg">
            <i class="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
          <button @click="shareToEmail" class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg">
            <i class="fas fa-envelope"></i>
            <span>Share to Email</span>
          </button>
          <button @click="shareToWhatsApp" class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg">
            <i class="fab fa-whatsapp"></i>
            <span>Share to Whatsapp</span>
          </button>
          <button @click="shareToTwitter" class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg">
            <i class="fab fa-twitter"></i>
            <span>Share to Twitter</span>
          </button>
          <div class="lg:col-span-2 lg:inline-flex lg:justify-center w-full">
            <button @click="shareToFacebook"
              class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg lg:w-auto w-full">
              <i class="fab fa-facebook"></i>
              <span>Share to Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>



  </div>

  <div v-else class="flex justify-center w-full items-center p-12 bg-white mt-6 rounded-t-lg">
    <span class="text-gray-500 text-lg">No Wishlist Selected</span>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';
export default {
  name: 'WishlistDetails',
  props: {
    filteredWishes:{
      type: Array,
    },
    selectedWishlist: {
      type: Object,
      default: () => ({
        title: 'Other wishlist category',
        description: "Hello there! Here's my birthday wishlist.",
        date: '2024-05-24',
        likes_count: 200,
        views_count: 200,
        liked_by_me: false,
        photo: null
      })
    },
    canShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      isShareMenuOpen: false,
    }
  },
  mounted() {
   console.log(this.selectedWishlist);
   
  },
  methods: {
    toggleMenu() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeMenu() {
      this.isDropdownOpen = false;
    },
    toggleShareMenu() {
      this.isShareMenuOpen = !this.isShareMenuOpen;
    },
    copyLink() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.selectedWishlist.id}/${this.selectedWishlist.user.username}`;
      const message = this.canShow
        ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}`
        : `Check out this wishlist: ${wishlistUrl}`;
      navigator.clipboard.writeText(message).then(() => {
        eventBus.onSuccess("Wishlist link copied to clipboard!");
      });
    },
    shareToEmail() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.selectedWishlist.id}/${this.selectedWishlist.user.username}`;
      const subject = encodeURIComponent(
        this.canShow
          ? `Check out my wishlist on Moments Hub`
          : `Check out this wishlist: ${this.selectedWishlist.title}`
      );
      const body = encodeURIComponent(
        this.canShow
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}`
          : `Check out this wishlist: ${wishlistUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.selectedWishlist.id}/${this.selectedWishlist.user.username}`;
      const text = encodeURIComponent(
        this.canShow
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}`
          : `Check out this wishlist: ${wishlistUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.selectedWishlist.id}/${this.selectedWishlist.user.username}`;
      const text = encodeURIComponent(
        this.canShow
          ? `Hey there! I'd love for you to check out my wishlist on Moments Hub: ${wishlistUrl}`
          : `Check out this wishlist: ${wishlistUrl}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      const wishlistUrl = `${window.location.origin}/wishlist/${this.selectedWishlist.id}/${this.selectedWishlist.user.username}`;
      const url = encodeURIComponent(wishlistUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },
    async toggleLike() {
      try {
        const likeStatus = !this.selectedWishlist.liked_by_me;
        const response = await this.$axios.put(`${this.$baseURL}/wishlists/${this.selectedWishlist.id}`, {
          like: likeStatus
        }, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        if (response.data.success) {
          this.selectedWishlist.liked_by_me = response.data.data.liked_by_me;
          this.selectedWishlist.likes_count = response.data.data.likes_count;
        }
      } catch (error) {
        console.error('Error toggling like status:', error);
        eventBus.onError('Failed to update like status.');
      }
    }
  }
}
</script>

<style scoped>
.wishlist-cover {
  position: relative;
  overflow: hidden;
  min-height: 302px;
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #e5e7eb;
}
</style>