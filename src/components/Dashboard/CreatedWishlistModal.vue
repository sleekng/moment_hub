<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
      <div class="bg-purple-100 flex justify-center items-center h-52">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="w-auto h-full"
        />
      </div>
      <div class="px-6 py-4">
        <h2 class="text-center text-xl font-semibold text-gray-800 mb-1">
          {{ title }}
        </h2>
        <p class="text-center text-gray-600 text-sm">
          {{ description }}
        </p>
      </div>
      <div class="px-4 py-4 border-t">
        <div class="flex justify-between">
          <button
            @click="viewWishlist"
            class="flex-1 text-gray-800 bg-[#F0F1F2] hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
          >
            {{ viewWishlistText }}
          </button>
          <button v-if="wishlistUpdated"
            @click="shareWishlist"
            class="flex-1 ml-2 text-white bg-primaryColor hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
          >
            {{ makeAWishText }}
          </button>
          <button v-if="!wishlistUpdated"
            @click="makeAWish"
            class="flex-1 ml-2 text-white bg-primaryColor hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
          >
            {{ makeAWishText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    wishlistUpdated: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'New Wishlist Created! ✨',
    },
    description: {
      type: String,
      default: 'Your wishlist is live and ready to shine!',
    },
    imageSrc: {
      type: String,
      default: '/assets/gif/Gift_animation.gif',
    },
    imageAlt: {
      type: String,
      default: 'Wishlist Created',
    },
    viewWishlistText: { 
      type: String,
      default: 'View Wishlist',
    },
    makeAWishText: {
      type: String,
      default: 'Make a Wish',
    },
    createdWishlistId: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    viewWishlist() {
      this.$emit('viewWishlist', this.createdWishlistId);
      this.closeModal();
    },
    shareWishlist(){
      this.$emit('shareWishlist', this.createdWishlistId);
    },
    makeAWish() {
      this.$emit('makeAWish', this.createdWishlistId);
      this.closeModal();
    }
  }
};
</script>
