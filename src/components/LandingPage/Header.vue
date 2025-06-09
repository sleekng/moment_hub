<!-- Header.vue -->
<template>
    <header class="w-full h-[100px] bg-gradient-to-b from-purple-400 to-pink-200 lg:hidden flex items-center relative overflow-hidden" style="background-position:center center; background-size:cover; background-repeat:no-repeat;">
      <div class="ml-4">
        <router-link to="/">
          <img src="/assets/Logo-white.svg" alt="Moments Hub Logo" class="lg:h-9" />
      </router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  header {
    background-image: url('/assets/sign-in-banner.png');
  }
  </style>
  