<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed z-50 inset-0 py-4 overflow-y-auto ">
      <div class="flex  justify-center min-h-screen px-4 lg:text-center">
        <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full">
          <div class="flex  lg:justify-between items-center bg-[#F8F9FA] h-[73px] px-4 lg:px-[32px]">
            <i
              class="fa-regular fa-xmark h-6 w-6 lg:hidden mt-2 inline-block cursor-pointer"
              @click="close"
            ></i>
            <div class="w-full flex lg:justify-center lg:h-full items-center">
              <h3 class="text-[12px] lg:text-2xl  font-bold text-gray-900">
                What type of wishlist are you creating?
              </h3>
            </div>
            <img
              src="/assets/close.svg"
              alt="Close"
              class="h-6 w-6 hidden lg:inline-block cursor-pointer"
              @click="close"
            />
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-8">
              <WishlistCategory
                v-for="category in categories"
                :key="category.id"
                :title="category.name"
                :image="getImageForCategory(category.slug)"
                :isSelected="selectedCategory === category"
                @click="selectCategory(category)"
              />
            </div>
          </div>
          <div class="px-4 justify-center text-center w-full inline-block pt-4 pb-8 lg:py-10">
            <button
              type="button"
              class="rounded-full border border-transparent shadow-sm lg:px-32 px-16 lg:py-4 py-2 bg-primaryColor text-base font-medium text-white hover:shadow-lg transition-all sm:ml-3 sm:w-auto"
              @click="next"
              :disabled="!selectedCategory"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import WishlistCategory from './WishlistCategory.vue';

export default {
  components: {
    WishlistCategory,
  },
  data() {
    return {
      isVisible: true,
      categories: [],
      selectedCategory: null,
      categoryImages: {
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
      }
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      // Check if categories are stored in localStorage
      const storedCategories = localStorage.getItem('categories');
      
      if (storedCategories) {
        // Use stored categories
        this.categories = JSON.parse(storedCategories);

         // Fetch categories from API
         const response = await this.$axios.get(`${this.$baseURL}/categories`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          this.categories = response.data.data;
            
          // Store fetched categories in localStorage for future use
          localStorage.setItem('categories', JSON.stringify(this.categories));
      } else {
        try {
          // Fetch categories from API
          const response = await this.$axios.get(`${this.$baseURL}/categories`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          this.categories = response.data.data;
            
          // Store fetched categories in localStorage for future use
          localStorage.setItem('categories', JSON.stringify(this.categories));
        } catch (error) {
          console.error('Error fetching categories:', error.response?.data?.message || error.message);
        }
      }
    },
    getImageForCategory(slug) {
      return this.categoryImages[slug] || '/assets/others-9.svg'; // Default image if not found
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    next() {
      this.$emit('close');
      this.$emit('showCreateWishlistModal', this.selectedCategory);
    },
    close() {
      this.isVisible = false;
      this.$emit('close');
    },
  },

  emits: ['close','showCreateWishlistModal'],  // Declare emitted events
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
