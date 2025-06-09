<template>
  <div class="bg-white p-4 rounded-lg border border-[#f0f0f0]">
    <!-- Header section -->
    <div class="flex  flex-row justify-between items-center mb-4 gap-2 ">
      <h2 class="text-sm sm:text-xl font-semibold text-[#121212] leading-[150%]">
        Top Performing Wishlist
      </h2>
      
      <!-- Button group / Dropdown -->
      <div class="relative z-40 sm:flex gap-1 p-1 rounded-lg border border-[#f0f0f0]">
        <button 
          class="sm:hidden px-2 py-1 rounded text-xs font-medium leading-[120%] tracking-[-0.24px] bg-white text-[#4c515b]"
          @click="toggleDropdown"
        >
          {{ activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) }}
          <i class="fas fa-chevron-down ml-1"></i>
        </button>
        <div v-if="dropdownOpen || !isMobile" class="absolute sm:static bg-white sm:bg-transparent border sm:border-0 rounded-lg shadow-lg sm:shadow-none mt-2 sm:mt-0">
          <button 
            class="block sm:inline-block w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 rounded text-xs font-medium leading-[120%] tracking-[-0.24px]"
            :class="[
              activeFilter === 'engagement' 
                ? 'bg-[#eaebed] text-[#121212]' 
                : 'bg-white text-[#4c515b]'
            ]"
            @click="setFilter('engagement')"
          >
            Engagement
          </button>
          <button
            class="block sm:inline-block w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 rounded text-xs font-medium leading-[120%] tracking-[-0.24px]"
            :class="[
              activeFilter === 'fulfilled'
                ? 'bg-[#eaebed] text-[#121212]'
                : 'bg-white text-[#4c515b]'
            ]"
            @click="setFilter('fulfilled')"
          >
            Fulfilled
          </button>
        </div>
      </div>
    </div>

    <!-- Wishlists grid -->
    <div class="flex gap-3 overflow-x-auto">
      <div v-for="(wishlist, index) in wishlists" :key="index" 
           class="min-w-[160px] sm:min-w-[211px] h-[200px] sm:h-[250px] rounded-lg bg-white relative">
        <!-- Wishlist image -->
        <div class="w-full h-full rounded-lg overflow-hidden bg-[#fcede0]">
          <img :src="wishlist.photo || 'default-image-url'" class="w-full h-full object-cover" alt="Wishlist cover" />
        </div>

        <!-- Stats overlay -->
        <div class="absolute top-2 left-2 flex gap-1 bg-[#121212] rounded-full px-1 py-1 sm:px-2 sm:py-1.5">
          <div class="flex items-center gap-1">
            <i class="fas fa-heart text-xs text-[#f8f9fa]"></i>
            <span class="text-xs text-[#f8f9fa]">{{ wishlist.likes_count }}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fas fa-eye text-xs text-[#f8f9fa]"></i>
            <span class="text-xs text-[#f8f9fa]">{{ wishlist.views_count }}</span>
          </div>
        </div>

        <!-- Title overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-[rgba(18,18,18,1)] to-[rgba(18,18,18,0.57)]">
          <h3 class="text-sm sm:text-lg font-semibold text-[#f5f6f7] mb-1">{{ wishlist.title }}</h3>
          <div class="flex items-center gap-1">
            <i class="fas fa-gift text-xs text-[#f8f9fa]"></i>
            <span class="text-sm sm:text-base text-[#f8f9fa]">{{ wishlist.wishes_count }} Wishes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopPerformingWishlist',
  props: {
    wishlists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeFilter: 'engagement',
      dropdownOpen: false,
      isMobile: window.innerWidth < 640 // Tailwind's sm breakpoint
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
      this.dropdownOpen = false; // Close dropdown after selection
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 640;
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }
}
</script>
