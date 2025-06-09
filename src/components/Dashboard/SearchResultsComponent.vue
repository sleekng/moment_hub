<template>
    <div class="lg:px-12 px-4 py-8 rounded-b-lg bg-white ">
      <div class="lg:mb-8 mb-4">
        <div class="lg:text-2xl lg:font-bold" style="font-family: Mukta">Search results for “ <span class="">{{ search }}</span> ”</div>
      </div>

       <!-- Show Empty State if no results -->
    <div v-if="!results.length">
      <EmptyState 
        :title="emptyStateTitle"
        :message="emptyStateMessage"
        :showButton="false"
      />
    </div>

 <!-- Friends Results -->
 <div v-else-if="selectedOption === 'Friends'">
    <div v-if="selectedOption === 'Friends'">
      
      <div v-for="friend in results" :key="friend.id" 
      class="flex flex-col sm:flex-row justify-between w-full p-4 border-b border-gray-300">
        
        <router-link :to="`/${friend.username}`" class="flex lg:items-center space-x-4 cursor-pointer" >
          <img :src="friend.avatar || '/assets/profile-7.svg'" 
               alt="Profile" 
               class="lg:w-20 lg:h-20 w-16 h-16 rounded-full" />
          <div>
            <div class="text-base lg:text-lg font-medium">
              {{ friend.first_name }} {{ friend.last_name }}
            </div>
            <div class="text-sm text-gray-600">
              @{{ friend.username }}
            </div>
            <div class="lg:mt-2 mt-1 flex space-x-2 lg:space-x-3 text-gray-600" style="font-family: Mukta">
                <span><span class="font-bold text-black">{{ friend.wishlists_count ? friend.wishlists_count : 0}}</span> Wishlist</span>
                <span><span class="font-bold text-black">{{ friend.friends_count ? friend.friends_count : 0 }}</span> Friends</span>
                <span><span class="font-bold text-black">{{ friend.likes_count ? friend.likes_count : 0 }}</span> Likes</span>
              </div>
          </div>
        </router-link>
        
        <!-- Friend Action Button -->
        <div class="flex self-end lg:self-auto lg:items-center space-x-4">
            <button
              :class="{
                'bg-gray-200 text-gray-800': friend.friendship_status === 'accepted',
                'bg-[#FEF4FF] text-primaryColor': friend.friendship_status === 'pending',
                'bg-primaryColor text-white': !friend.friendship_status
              }"
              class="lg:py-3 py-2 w-[180px] px-4 rounded-full transition-all hover:shadow focus:outline-none"
              @click="handleFriendAction(friend)"
              :disabled="isLoading && pendingUsername === friend.username"
            >
              <span v-if="isLoading && pendingUsername === friend.username">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              <span v-else>
                {{ getFriendshipButtonText(friend.friendship_status) }}
              </span>
            </button>
          </div>
      </div>
    </div>
  </div>

     <!-- Wishlists Results -->
      
     <div v-else class="grid grid-cols-4 gap-4">
    
      <div v-for="wishlist in results" :key="wishlist.id"  @click="viewWishlist(wishlist.id,wishlist.user.username)" class="card group hover:border-primaryColor h-full cursor-pointer" :class="['bg-white rounded-lg shadow-md p-4 border', isDropdownOpen ? 'border-primaryColor' : 'border-gray-100']">
    <div  class="flex items-center space-x-2 mt-2 pb-2">
      <div class="flex items-center space-x-2">
        <img :src="wishlist.user.avatar || '/assets/avatar.svg'" alt="Avatar" class="w-6 h-6 rounded-full">
        <span class="font-bold whitespace-nowrap text-sm">{{ wishlist.user.first_name }} {{ wishlist.user.last_name }}</span>
        <span class="text-gray-600 font-normal text-xs">@{{ wishlist.user.username }}</span>
      </div>
    </div>
    
     <!-- Conditional Image and Menu-option for Dashboard -->
    <div  class="relative mb-4">
      <img class="w-full h-56 object-cover rounded-md" :src="wishlist.photo ||  categoryImage(wishlist)" alt="Wishlist Image" />
      
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
        <i class="fa-solid fa-gift mr-1   text-primaryColor text-[12px]"></i>
        <span class="font-bold mr-1">{{ wishlist.wishes_count }}</span> Wishes
      </div>
    </div>

    <!-- Stats -->
    <div class="flex justify-end space-x-2 items-center mt-4 text-gray-600">
      <div class="flex items-center">
        <i class="fa-light fa-heart mr-1 text-[14px]"></i>
        <span>{{ wishlist.likes_count }}</span>
      </div>
      <div class="flex items-center">
        <i class="fa-light fa-eye mr-1 text-[14px]"></i>
        <span>{{ wishlist.views_count }}</span>
      </div>
    </div>
      </div>




    </div>
    </div>
  </template>
  
  <script>
  import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
  import EmptyState from '@/components/Dashboard/EmptyState.vue';
  import { eventBus } from '@/eventBus.js';

  export default {
    name: 'SearchResultsComponent',
    props: {
      results: {
        type: Array,
        required: true
      },
      search: {
        type: String,
        required: true
      },
      selectedOption: {
        type: String,
        required: true
      }
    },
    data() {
    return {
      isLoading: false,
      pendingUsername: null,
    };
  },
    components: {
      WishlistCard,
      EmptyState
    },

    computed: {
     
    emptyStateTitle() {
      return this.selectedOption === 'Friends' 
        ? 'No users found' 
        : 'No wishlists found';
    },
    emptyStateMessage() {
      return this.selectedOption === 'Friends'
        ? `We couldn't find any users matching "${this.search}". Try a different search term.`
        : `We couldn't find any wishlists matching "${this.search}". Try a different search term.`;
    }
  },

    methods: {
      categoryImage(wishlist) {
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
      return categoryImages[wishlist.category.slug];
    },
    getFriendshipButtonText(status) {
      switch(status) {
        case 'accepted':
          return 'Friends';
        case 'pending':
          return 'Request Pending';
        default:
          return 'Send friend request';
      }
    },
    viewWishlist(wishlistId, wishlistUser) {
/*       this.$router.push({ name: 'Wishlist', params: { id: wishlistId } }); */


      window.location.href = this.$router.resolve({
        name: "Wishlist",
        params: { id: wishlistId , username: wishlistUser},
      }).href;


    },
    async handleFriendAction(friend) {
      if (friend.friendship_status === 'accepted' || 
          friend.friendship_status === 'pending') return;
      
      this.isLoading = true;
      this.pendingUsername = friend.username;
      
      try {
        const response = await this.$axios.post(`${this.$baseURL}/friends`, 
          { username: friend.username },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          // Update the friend's status with the response data
          friend.friendship_status = response.data.data.friendship_status;
          friend.friendship_id = response.data.data.friendship_id;
          
          // Emit event with updated friend data
          this.$emit('friendRequestSent', {
            friend,
            message: response.data.message
          });
        }
        
      } catch (error) {
        console.error('Error sending friend request:', error);
        eventBus.onError(error.response?.data?.message || 'Failed to send friend request');
      } finally {
        this.isLoading = false;
        this.pendingUsername = null;
      }
    }
  }
};
</script>