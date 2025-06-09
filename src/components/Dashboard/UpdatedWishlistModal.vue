<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4"
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
            class="flex-1  text-gray-800 bg-[#F0F1F2] hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
          >
            {{ viewWishlistText }}
          </button>
          <button
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
    title: {
      type: String,
      default: 'New Wishlist Created! ✨',
    },
    description: {
      type: String,
      default: 'Your wishlist is live and ready to shine! Start adding those dream wish items and share it with friends to get the gifts you’ve been wishing for.',
    },
    imageSrc: {
      type: String,
      default: '/assets/modal-illustration.svg',
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
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    viewWishlist() {
      // Add your custom code for viewing the wishlist
      console.log('View Wishlist');
      this.closeModal();
    },
    makeAWish() {
      // Add your custom code for making a wish
      console.log('Make a Wish');
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
