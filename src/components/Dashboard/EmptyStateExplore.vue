<template>
    <div class="lg:px-12 px-4 py-8 bg-white rounded-b-lg" @mouseleave="handleCloseDropdown">
      <!-- Display Wishlist Sections or EmptyState -->
      <div v-if="hasItems">
        <div v-if="activeTab === 'Wishes' && wishlists.trending.length" class="mb-8">
          <div class="lg:text-2xl text-lg font-bold mb-2">Trending Wishlist Everyone's Talking About!</div>
          <div class="flex w-full overflow-x-auto space-x-6">
            <WishlistCard v-for="wishlist in wishlists.trending" 
                          :key="wishlist.id" 
                          :wishlist="wishlist" 
                          :openDropdownId="openDropdownId" 
                          @toggleDropdown="handleToggleDropdown" 
                          @closeDropdown="handleCloseDropdown" 
                          class="w-[286px] flex-shrink-0" />
          </div>
        </div>
  
        <div v-if="wishlists.recent.length" class="mb-8">
          <div class="lg:text-2xl text-lg font-bold mb-2">Recently Added Wishlist You Can't Miss</div>
          <div class="flex w-full overflow-x-auto space-x-6">
            <WishlistCard v-for="wishlist in wishlists.recent" 
                          :key="wishlist.id" 
                          :wishlist="wishlist" 
                          :openDropdownId="openDropdownId" 
                          @toggleDropdown="handleToggleDropdown" 
                          @closeDropdown="handleCloseDropdown" 
                          class="w-[286px] flex-shrink-0" />
          </div>
        </div>
  
        <div v-if="wishlists.birthdays.length" class="mb-8">
          <div class="lg:text-2xl text-lg font-bold mb-2">It's Raining Birthdays</div>
          <div class="flex w-full overflow-x-auto space-x-6">
            <WishlistCard v-for="wishlist in wishlists.birthdays" 
                          :key="wishlist.id" 
                          :wishlist="wishlist" 
                          :openDropdownId="openDropdownId" 
                          @toggleDropdown="handleToggleDropdown" 
                          @closeDropdown="handleCloseDropdown" 
                          class="w-[286px] flex-shrink-0" />
          </div>
        </div>
  
        <div v-if="activeTab === 'Friends' && wishlists.reserved_wishes.length" class="mb-8">
          <div class="lg:text-2xl text-lg font-bold mb-2">Wishes You Reserved For Your Friends</div>
          <div class="flex w-full overflow-x-auto space-x-6">
            <WishlistCard v-for="wish in wishlists.reserved_wishes" 
                          :key="wish.wishlist.id" 
                          :wishlist="wish.wishlist" 
                          :openDropdownId="openDropdownId" 
                          @toggleDropdown="handleToggleDropdown" 
                          @closeDropdown="handleCloseDropdown" 
                          class="w-[286px] flex-shrink-0" />
          </div>
        </div>
      </div>
      <EmptyState 
        v-else 
        :title="'No wishlists to explore'" 
        :message="'It looks like there are no public wishlists to discover right now. Check back later or create your own wishlist!'" 
        :showButton="false" 
      />
    </div>
  </template>
  
  <script>
  import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
  import EmptyState from '@/components/Dashboard/EmptyState.vue';
  
  export default {
    components: {
      WishlistCard,
      EmptyState,
    },
    props: {
      wishlists: {
        type: Object,
        required: true,
      },
      activeTab: {
        type: String,
        required: true,
      },
    },
    computed: {
      hasItems() {
        return this.wishlists.trending.length > 0 || 
               this.wishlists.recent.length > 0 || 
               this.wishlists.birthdays.length > 0 || 
               (this.activeTab === 'Friends' && this.wishlists.reserved_wishes.length > 0);
      },
    },
    data() {
      return {
        openDropdownId: null,
      };
    },
    methods: {
      preview(wishId) {
        this.$emit('preview', wishId);
      },
      handleToggleDropdown(wishId) {
        this.openDropdownId = this.openDropdownId === wishId ? null : wishId;
      },
      handleCloseDropdown() {
        this.openDropdownId = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .flex {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
  .flex::-webkit-scrollbar {
    height: 6px;
  }
  .flex::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  .flex::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  </style>
  