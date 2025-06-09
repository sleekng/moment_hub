<template>
  <div class=" lg:px-12 bg-white">
    <div class="flex justify-between items-center ">
      <!-- Tabs -->
      <div class="flex overflow-x-auto">
        <!-- My Wishlist Tab -->
        <div class="flex flex-col items-center cursor-pointer" @click="switchTab('myWishes')">
          <div :class="activeTab === 'myWishes' ? 'text-gray-900' : 'text-[#616874]'" class="lg:text-base text-[12px] px-2 whitespace-nowrap lg:px-8 font-medium">
            My Wishlist <span class="text-[16px]">{{ myWishlistCount }}</span>
          </div>
          <div :class="activeTab === 'myWishes' ? 'bg-black' : ''" class="w-full h-1 lg:mt-2"></div>
        </div>

        <!-- Reserved Wish Tab -->
        <div class="flex flex-col items-center cursor-pointer" @click="switchTab('reserved')">
          <div :class="activeTab === 'reserved' ? 'text-gray-900' : 'text-[#616874]'" class="lg:text-base text-[12px] px-2 whitespace-nowrap lg:px-8 font-medium">
            Reserved Wish <span class="text-[16px]">{{ reservedWishesCount }}</span>
          </div>
          <div :class="activeTab === 'reserved' ? 'bg-black' : ''" class="w-full h-1 lg:mt-2"></div>
        </div>

        <!-- Received Wish Tab -->
        <div class="flex flex-col items-center cursor-pointer" @click="switchTab('saved')">
          <div :class="activeTab === 'saved' ? 'text-gray-900' : 'text-[#616874]'" class="lg:text-base text-[12px] px-2 whitespace-nowrap lg:px-8 font-medium">
            Saved Wish <span class="text-[16px]">{{ savedwishesCount }}</span>
          </div>
          <div :class="activeTab === 'saved' ? 'bg-black' : ''" class="w-full h-1 lg:mt-2"></div>
        </div>
      </div>
      
      <!-- Sort By Dropdown -->
      <div class="relative flex items-center space-x-2 z-30" >
        
        <i class="fa-regular text-gray-600 fa-arrow-up-arrow-down" @click="toggleDropdown"></i>
        <span class="text-base hidden lg:inline font-medium text-[#616874] cursor-pointer" @click="toggleDropdown">Sort by</span>
        <i class="fa-regular text-gray-600 fa-angles-up-down" @click="toggleDropdown"></i>
        
        <!-- Dropdown MyWishList -->
         <template v-if="selectedTab == 'myWishes' ">
            <div v-if="isDropdownOpen"  class="w-52 absolute top-6 -right-3 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'title'}"
                   @click="setSorting('title')">
                <span class="ml-2" :class="sortBy === 'title' ? 'text-primaryColor' : 'text-gray-800'">Name</span>
                <img v-if="sortBy === 'title'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'event_date'}"
                   @click="setSorting('event_date')">
                <span class="ml-2" :class="sortBy === 'event_date' ? 'text-primaryColor' : 'text-gray-800'">Event date</span>
                <img v-if="sortBy === 'event_date'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'likes'}"
                   @click="setSorting('likes')">
                <span class="ml-2" :class="sortBy === 'likes' ? 'text-primaryColor' : 'text-gray-800'">Number of likes</span>
                <img v-if="sortBy === 'likes'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'views'}"
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
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer"
                   :class="{'primaryColor/50': sortOrder === 'desc'}"
                   @click="setSortOrder('desc')">
                <span class="ml-2" :class="sortOrder === 'desc' ? 'text-primaryColor' : 'text-gray-800'">Descending</span>
                <img v-if="sortOrder === 'desc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
            </div>
         </template>


         <!-- DropDown Reserved Wish -->
         <template v-if="selectedTab == 'reserved'">
            <div v-if="isDropdownOpen"  class="w-52 absolute top-6 -right-5 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'name'}"
                   @click="setSorting('name')">
                <span class="ml-2" :class="sortBy === 'name' ? 'text-primaryColor' : 'text-gray-800'">Name</span>
                <img v-if="sortBy === 'name'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'amount'}"
                   @click="setSorting('amount')">
                <span class="ml-2" :class="sortBy === 'amount' ? 'text-primaryColor' : 'text-gray-800'">Amount</span>
                <img v-if="sortBy === 'amount'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'reserved_date'}"
                   @click="setSorting('reserved_date')">
                <span class="ml-2" :class="sortBy === 'reserved_date' ? 'text-primaryColor' : 'text-gray-800'">Date reserved</span>
                <img v-if="sortBy === 'reserved_date'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer mt-2"
                   :class="{'primaryColor/50': sortOrder === 'asc'}"
                   @click="setSortOrder('asc')">
                <span class="ml-2" :class="sortOrder === 'asc' ? 'text-primaryColor' : 'text-gray-800'">Ascending</span>
                <img v-if="sortOrder === 'asc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer"
                   :class="{'primaryColor/50': sortOrder === 'desc'}"
                   @click="setSortOrder('desc')">
                <span class="ml-2" :class="sortOrder === 'desc' ? 'text-primaryColor' : 'text-gray-800'">Descending</span>
                <img v-if="sortOrder === 'desc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
            </div>
         </template>

         <!-- DropDown Saved Wish -->
         <template v-if="selectedTab == 'saved'">
            <div v-if="isDropdownOpen"  class="w-52 absolute top-6 -right-5 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'name'}"
                   @click="setSorting('name')">
                <span class="ml-2" :class="sortBy === 'name' ? 'text-primaryColor' : 'text-gray-800'">Name</span>
                <img v-if="sortBy === 'name'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'amount'}"
                   @click="setSorting('amount')">
                <span class="ml-2" :class="sortBy === 'amount' ? 'text-primaryColor' : 'text-gray-800'">Amount</span>
                <img v-if="sortBy === 'amount'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer hover:bg-primaryColor hover:bg-primaryColor/10"
                   :class="{'primaryColor/50': sortBy === 'saved_date'}"
                   @click="setSorting('saved_date')">
                <span class="ml-2" :class="sortBy === 'saved_date' ? 'text-primaryColor' : 'text-gray-800'">Date Saved</span>
                <img v-if="sortBy === 'saved_date'" src="/assets/check.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
              <hr>
              <div class="flex items-center my-1 p-2 rounded-lg cursor-pointer mt-2"
                   :class="{'primaryColor/50': sortOrder === 'asc'}"
                   @click="setSortOrder('asc')">
                <span class="ml-2" :class="sortOrder === 'asc' ? 'text-primaryColor' : 'text-gray-800'">Ascending</span>
                <img v-if="sortOrder === 'asc'" src="/assets/check-2.svg" class="w-3 h-3 ml-auto" alt="Check">
              </div>
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
    activeTab: {
      type: String,
      required: true
    },
    myWishlistCount: {
      type: Number,
      required: true
    },
    reservedWishesCount: {
      type: Number,
      required: true
    },
    savedwishesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 'myWishes',
      isDropdownOpen: false, // Track the dropdown visibility
      sortBy: 'name',
      sortOrder: 'asc',
    };
  },
  methods: {
    switchTab(tab) {
      this.$emit('switchTab', tab); // Emit event to parent
      this.selectedTab = tab; // Update the selected tab
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    hover(event) {
      event.currentTarget.classList.add('bg-primaryMainBright');
    },
    unhover(event) {
      event.currentTarget.classList.remove('bg-primaryMainBright');
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
