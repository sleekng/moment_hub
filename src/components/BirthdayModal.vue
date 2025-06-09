<template>
    <transition name="fade">
      <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <div class="relative">
            <img src="./assets/frame-1618868489.svg" alt="Celebration" class="w-full h-64 object-cover rounded-t-lg" />
            <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <img src="./assets/close.svg" alt="Close" class="w-6 h-6" />
            </button>
          </div>
          <div class="text-center mt-4">
            <h2 class="text-2xl font-semibold text-gray-800">Happy Birthday, {{ user.first_name }}! 🎂</h2>
            <p class="mt-2 text-gray-600">
              Birthdays are for celebrating all the amazing things about you! We hope your day is filled with joy, laughter, and cake (of course!)
            </p>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
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
  