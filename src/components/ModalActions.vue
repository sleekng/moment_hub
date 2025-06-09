<template>
    <div class="flex justify-center gap-4 mt-6">
      <button class="bg-gray-200 text-gray-800 rounded-full px-6 py-2" @click="$emit('cancel')">Cancel</button>
      <button class="bg-purple-500 text-white rounded-full px-6 py-2" @click="$emit('share')">Share</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalActions'
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  