<template>
  <div class=" lg:px-12 bg-white">
    <div class="flex justify-between items-center ">
      <!-- Tabs -->
      <div class="flex overflow-x-auto">
        <!-- My Wishlist Tab -->
        <div class="flex flex-col items-center cursor-pointer" >
          <div  class="lg:text-lg text-[12px] whitespace-nowrap py-2 font-bold text-gray-900">
            {{ user.first_name }}'s wishlist
          </div>
        </div>

      </div>
      
      <!-- Sort By Dropdown -->
      <div class="relative flex items-center space-x-2 z-30" @mouseleave="isDropdownOpen = false">
        
        <i class="fa-regular text-gray-600 fa-arrow-up-arrow-down" @click="toggleDropdown"></i>
        <span class="text-base hidden lg:inline font-medium text-[#616874] cursor-pointer" @click="toggleDropdown">Sort by</span>
        <i class="fa-regular text-gray-600 fa-angles-up-down" @click="toggleDropdown"></i>
        
        <!-- Dropdown  MyWishList -->
         <template v-if="selectedTab == 'myWishes' ">
            <div v-if="isDropdownOpen"  class="w-52 absolute top-6 -right-5 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor/10"
                   :class="{'bg-primaryColor/10': sortBy === 'title'}"
                   @click="setSorting('title')">
                <span class="ml-2" :class="sortBy === 'title' ? 'text-primaryColor' : 'text-gray-800'">Name</span>
                <img v-if="sortBy === 'title'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor/10"
                   :class="{'bg-primaryColor/10': sortBy === 'event_date'}"
                   @click="setSorting('event_date')">
                <span class="ml-2" :class="sortBy === 'event_date' ? 'text-primaryColor' : 'text-gray-800'">Event date</span>
                <img v-if="sortBy === 'event_date'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor/10"
                   :class="{'bg-primaryColor/10': sortBy === 'likes'}"
                   @click="setSorting('likes')">
                <span class="ml-2" :class="sortBy === 'likes' ? 'text-primaryColor' : 'text-gray-800'">Number of likes</span>
                <img v-if="sortBy === 'likes'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor/10"
                   :class="{'bg-primaryColor/10': sortBy === 'views'}"
                   @click="setSorting('views')">
                <span class="ml-2" :class="sortBy === 'views' ? 'text-primaryColor' : 'text-gray-800'">Number of views</span>
                <img v-if="sortBy === 'views'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer mt-2"
                   :class="{'primaryColor/50': sortOrder === 'asc'}"
                   @click="setSortOrder('asc')">
                <span class="ml-2" :class="sortOrder === 'asc' ? 'text-primaryColor' : 'text-gray-800'">Ascending</span>
                <img v-if="sortOrder === 'asc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer"
                   :class="{'primaryColor/50': sortOrder === 'desc'}"
                   @click="setSortOrder('desc')">
                <span class="ml-2" :class="sortOrder === 'desc' ? 'text-primaryColor' : 'text-gray-800'">Descending</span>
                <img v-if="sortOrder === 'desc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
            </div>
         </template>



      </div>
 


    </div>
    <!-- Horizontal Line -->
    <div class="border-t border-gray-300"></div>
  </div>
</template>


<script>
export default {
  name: 'TabNavigationsWishlist',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 'myWishes',
      isDropdownOpen: false,
      sortBy: 'title',
      sortOrder: 'asc',
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    setSorting(type) {
      this.sortBy = type;
      this.$emit('sort', { sortBy: this.sortBy, sortOrder: this.sortOrder });
    },
    setSortOrder(order) {
      this.sortOrder = order;
      this.$emit('sort', { sortBy: this.sortBy, sortOrder: this.sortOrder });
    },
  },
};
</script>

<style scoped>
/* Additional styles if required */
</style>
