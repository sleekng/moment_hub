<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header with Logo -->
    <header class="flex justify-center items-center py-6 px-4 border-b border-gray-200">
      <router-link to="/">
        <img src="/assets/logo.svg" alt="Moments Hub Logo" class="h-10" />
      </router-link>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex justify-center items-center px-4">
      <div class="text-center max-w-md">
        <!-- 404 Illustration -->
        <img 
          src="/assets/gift-empty.svg" 
          alt="404 Illustration" 
          class="w-32 h-32 mx-auto mb-8 opacity-60"
        />
        
        <!-- Error Number -->
        <h1 class="text-6xl font-bold text-gray-300 mb-4" style="font-family: 'Mukta', sans-serif;">
          404
        </h1>
        
        <!-- Main Message -->
        <h2 class="text-2xl font-semibold text-gray-900 mb-4" style="font-family: 'Mukta', sans-serif;">
          Oops! Page not found
        </h2>
        
        <!-- Subtitle -->
        <p class="text-gray-600 mb-8 text-lg" style="font-family: 'Mukta', sans-serif;">
          The page you're looking for seems to have wandered off. Let's get you back to exploring amazing wishlists!
        </p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/" 
            class="bg-[#E567F8] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#d14ee8] transition-colors duration-200 text-lg"
            style="font-family: 'Mukta', sans-serif;"
          >
            Go Home
          </router-link>
          
          <router-link 
            to="/explore" 
            class="border-2 border-[#E567F8] text-[#E567F8] font-semibold py-3 px-8 rounded-full hover:bg-[#E567F8] hover:text-white transition-colors duration-200 text-lg"
            style="font-family: 'Mukta', sans-serif;"
          >
            Explore Wishlists
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
