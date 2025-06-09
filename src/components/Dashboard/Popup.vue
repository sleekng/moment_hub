<template>
    <div class="fixed inset-0 px-4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-2xl p-4 pb-10 relative  max-w-[400px]">
        <button @click="closeModal" class="absolute top-4 right-4">
          <img src="/assets/close.svg" alt="Close" class="w-6 h-6">
        </button>
        <div class="flex justify-center">
          <img src="/assets/ConfettiMH.gif" alt="Confetti" class="w-[400px] h-full">
        </div>
        <div class="text-center -mt-20">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">Congratulations! 🥳</h2>
          <p class="text-gray-600">We're thrilled to have you here! Get ready to create, share, and discover amazing wishlists. Let's make every moment unforgettable.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Popup',
    methods: {
      closeModal() {
        this.$emit('close'); // Emit a 'close' event to the parent
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  