<template>
  <div class="search-container mt-10 bg-gradient-to-r from-pink-500 overflow-hidden via-purple-500 to-blue-500 rounded-lg w-full p-4 lg:p-10 relative min-h-[180px] lg:min-h-[279px] flex justify-center items-center">
    <div class="search-content hidden lg:flex flex-col gap-5 items-center max-w-[717px] w-full">
      <h1 class="text-white font-mukta text-3xl font-extrabold leading-tight text-center m-0">
        Want to find a Friend or Wishlist?
      </h1>

      <div class="search-bar flex w-full h-12 rounded-full bg-white">
        <div class="dropdown-section w-[170px] h-full border-r border-gray-300 relative" @mouseleave="closeDropdown">
          <button @click="toggleDropdown" class="flex items-center justify-between w-full h-full px-4 bg-transparent border-none cursor-pointer">
            <div class="flex items-center gap-2">
              <i class="fas fa-users text-gray-800 text-lg"></i>
              <span class="font-mukta text-base text-gray-800">{{ selectedOption }}</span>
            </div>
            <i class="fas fa-chevron-down text-gray-800 text-lg"></i>
          </button>

          <div v-if="dropdownOpen" class="absolute top-12  w-40 transform translate-x-4 bg-white rounded-lg shadow-lg border border-gray-300">
            <!-- Dropdown items -->
            <div class="flex flex-col p-1">
              <div class="flex moment-text-effect-parent justify-between items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="selectOption('Friends')">
                <div class="flex items-center space-x-3 " :class="selectedOption === 'Friends' ? 'text-primaryColor' : ''">
                  <i class="fas fa-users moment-text-effect-child  w-4 h-4"></i>
                  <span class=" moment-text-effect-child text-base" style="font-family: Mukta">Friends</span>
                </div>
                <i v-if="selectedOption === 'Friends'" class="fas fa-check text-primaryColor moment-text-effect-child w-4 h-4"></i>
              </div>
              <div  class="flex items-center justify-between moment-text-effect-parent p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="selectOption('Wishlist')">
                <div class="flex items-center space-x-3 " :class="selectedOption === 'Wishlist' ? 'text-primaryColor' : ''">
                  <i class="fas fa-gift  moment-text-effect-child w-4 h-4"></i>
                <span class="ml-3  text-base moment-text-effect-child" style="font-family: Mukta">Wishlist</span>
                </div>
                <i v-if="selectedOption === 'Wishlist'" class="fas fa-check text-primaryColor moment-text-effect-child w-4 h-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="search-input flex flex-1 items-center px-4">
          <i v-if="!loading" class="fas fa-search text-gray-600 w-4 h-4"></i>
          <i v-if="loading" class="fas fa-spinner fa-spin text-gray-600 w-4 h-4"></i>
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            @input="debounceInput"
            class="border-none bg-transparent ml-2 w-full font-mukta text-base text-gray-800 outline-none"
          />
        </div>
      </div>
    </div>

    <img v-for="i in (0, 10)" :key="i" :src="`/assets/star-${i}.svg`" alt="" class="absolute w-2" :style="{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }" />
    <div class="  lg:hidden block  relative w-full ">
  
      <div class="flex flex-col items-center gap-6  ">
        <p class="text-center font-bold text-lg leading-tight text-white" style="font-family: Mukta;">
          Want to find a Friend or Wishlist?
        </p>
        <div class="bg-white h-11 w-full  rounded-full shadow-sm flex items-center relative">
          <div class="relative h-full" @mouseleave="closeDropdown">
            <button @click="toggleDropdown" class="flex justify-between items-center space-x-2  md:w-32 pl-3 pr-2 border-r border-gray-300 bg-gray-100 h-full rounded-l-full">
              <div class="flex items-center space-x-2">
                <i v-if="selectedOption === 'Friends'" class="fas fa-users text-gray-600 w-4 h-4"></i>
              <i v-if="selectedOption === 'Wishlist'" class="fas fa-gift text-gray-600 w-4 h-4"></i>
              </div>
              <img src="/assets/dropdown.svg" alt="Dropdown" class="w-4 h-4" />
            </button>
            
  <!-- Modal for mobile screens -->
  <div v-if="dropdownOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20  ">
    <div class="bg-white rounded-lg p-4 w-80 relative">
      <!-- Close Icon -->
      <button @click="closeDropdown" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
        <i class="fas fa-times"></i>
      </button>
      <h2 class="text-lg font-bold mb-2">Select an Option</h2>
      <div class="flex flex-col">
        <div class="flex justify-between moment-text-effect-parent items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="selectOption('Friends')">
          <div class="flex items-center space-x-2">
            <i class="fas fa-users w-4 h-4 moment-text-effect-child"></i>
            <span class="ml-2 text-sm moment-text-effect-child" style="font-family: Mukta;">Friends</span>
          </div>
          <i v-if="selectedOption === 'Friends'" class="fas fa-check text-primaryColor w-4 h-4"></i>
        </div>
        <div class="flex justify-between moment-text-effect-parent items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer" @click="selectOption('Wishlist')">
          <div class="flex items-center space-x-2">
            <i class="fas fa-gift text-gray-600 w-4 h-4 moment-text-effect-child"></i>
            <span class="ml-2 text-gray-800 text-sm moment-text-effect-child" style="font-family: Mukta;">Wishlist</span>
          </div>
          <i v-if="selectedOption === 'Wishlist'" class="fas fa-check text-primaryColor w-4 h-4"></i>
        </div>
      </div>
      <!-- Removed the previous close button -->
      <!-- <button @click="closeDropdown" class="mt-4 w-full bg-red-500 text-white rounded-lg py-2">Close</button> -->
    </div>
  </div>

          </div>
          <div class="flex-grow w-d flex items-center h-full pl-4 bg-white rounded-r-full">
            <i v-if="!loading" class="fas fa-search text-gray-600 w-4 h-4"></i>
            <i v-if="loading" class="fas fa-spinner fa-spin text-gray-600 w-4 h-4"></i>
            <input 
              type="text" 
              placeholder="Search name, username" 
              style="font-family: Mukta;" 
              @input="debounceInput"
              class="ml-2 px-4 border-none focus:outline-none w-full focus:ring-0 bg-transparent text-gray-500 text-sm" 
            />
          </div>
        </div>
      </div>
    </div>

    <img 
      src="@/assets/images/box-gift.svg" 
      alt="Decoration" 
      class="absolute lg:top-0 top-[130px] right-[-5px] lg:w-[223px] lg:h-[403px] w-[80px] "
    />
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  props: {
    selectedOption: {
      type: String,
      default: 'Friends'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdownOpen: false,
      searchQuery: '',
      timeout: null
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth < 768; // Adjust the breakpoint as needed
    },
    searchPlaceholder() {
      return this.selectedOption === 'Friends' 
        ? 'Search by name or username...' 
        : 'Search wishlists...'
    }
  },
  methods: {
    debounceInput(event) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('startSearch', event.target.value)
      }, 300)
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    closeDropdown() {
      this.dropdownOpen = false
    },
    selectOption(option) {
      this.searchQuery = ''
      this.$emit('selectOption', option)
      this.dropdownOpen = false
    }
  }
}
</script>
