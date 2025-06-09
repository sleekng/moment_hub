<template>
  <div
    class="fixed inset-0 z-[9999999] overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b bg-gray-200">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-gift mr-1"></i>
          <h1 class="font-semibold text-lg">Add to my wishlist</h1>
        </div>
        <button @click="closeModal">
          <i class="fa-regular fa-close text-lg mr-1"></i>
        </button>
      </div>
      <div class="flex items-center bg-white border border-gray-300 m-4 rounded-lg p-2 gap-2 min-h-[56px]">
        <i class="fa-regular fa-search ml-4 text-gray-400"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Find wishlist" 
          class="flex-grow border-none outline-none text-base font-normal text-gray-600 placeholder-gray-600"
        />
        <i v-if="isSearching" class="fa-solid fa-spinner fa-spin text-gray-400"></i>
      </div>
      <div class="flex flex-col gap-0 w-full min-w-md max-h-[402px] overflow-y-auto mb-5 px-4">
        <div v-if="loading" class="flex items-center justify-center h-[300px]">
          <i class="fa-solid fa-spinner fa-spin text-primaryColor"></i>
        </div>
        <div 
          v-for="wishlist in filteredWishlists" 
          :key="wishlist.id" 
          class="flex flex-row gap-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100" 
          @click="selectWishlist(wishlist.id)"
        >
          <div class="w-[97px] h-[74px] bg-blue-100 rounded-lg overflow-hidden">
            <img :src="wishlist.photo || `/assets/`+ wishlist.category.slug + `.svg`" alt="Wishlist Image" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col gap-1 pt-2 flex-grow">
            <h3 class="font-semibold text-lg text-black leading-6">{{ wishlist.title }}</h3>
            <div class="flex items-center gap-1 mt-1">
              <i class="fa-solid fa-gift mr-1 text-sm text-primaryColor"></i>
              <span class="font-normal text-base text-gray-600 leading-6"><span class="text-black">{{ wishlist.wishes_count }}</span> Wishes</span>
            </div>
          </div>
          <div v-if="selectedWishlistId === wishlist.id" class="flex items-center mr-10">
            <i class="fa-solid fa-check text-green-500"></i>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center px-5 py-4 border-t">
        <button class="flex items-center bg-none border py-2 px-4 rounded-full text-base font-normal cursor-pointer">
          <i class="fa-solid fa-plus text-sm mr-2" alt="Add Icon"></i>
          Create a new wishlist
        </button>
        <button
          v-if="filteredWishlists.length > 0"
          @click="saveToWishlist"
          :disabled="!selectedWishlistId || isAddingtoWishlist"
          :class="[
            'px-8 py-2 rounded-full relative',
            selectedWishlistId && !isAddingtoWishlist
              ? 'bg-primaryColor text-white opacity-100 hover:shadow-lg'
              : 'bg-gray-400 text-white opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="flex justify-center">
            <span v-if="isAddingtoWishlist" class="absolute">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Save
          </span>
        </button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'AddToWishlist',
  props: {
    wish: {
      type: Object,
      required: true
    },
    isAddingtoWishlist: {
      type: Boolean,
    },
  },
  data() {
    return {
      wishlists: [],
      selectedWishlistId: null,
      searchQuery: '',
      loading: false
    }
  },
  
  computed: {
    filteredWishlists() {
      return this.wishlists.filter(wishlist => wishlist.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    isSearching() {
      return this.searchQuery.length > 0 && this.filteredWishlists.length === 0;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async fetchWishlists() {
      this.loading = true;
      try {
        const response = await this.$axios.get(`${this.$baseURL}/wishlists`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.wishlists = response.data.data;
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      } finally {
        this.loading = false;
      }
    },
    selectWishlist(id) {
      this.selectedWishlistId = id;
    },
    saveToWishlist() {
      this.$emit('saveToWishlist', this.wish, this.selectedWishlistId);
    }
  },
  mounted() {
    this.fetchWishlists();
  }
}
</script>
