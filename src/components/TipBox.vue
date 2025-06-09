<template>
    <div class="flex items-start bg-gray-100 p-4 rounded-md gap-2 mb-6">
      <img src="./assets/information.svg" alt="Tip Icon" class="w-5 h-5" />
      <div>
        <strong>Tip:</strong> {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TipBox',
    data() {
      return {
        message: 'For your safety, we recommend sharing your public address for general use and your private address to only trusted friends. Your privacy is important to us!'
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  