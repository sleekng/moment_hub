
<template>
    <div class="flex flex-col lg:justify-center lg:flex-row lg:items-center items-center h-screen  bg-white lg:p-8">
      <!-- Header -->
      <Header />
  
      <div class="w-full  h-[95vh] flex space-x-10 bg-white rounded-2xl  overflow-hidden">
        <VerificationSentForm />
  
         <!-- Right Side: Image -->
         <div class="hidden lg:flex w-4/6 relative justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-image: url('/assets/verification-image.svg'); background-position: center center; background-size: cover;"></div>
      </div>
    </div>
  </template>

 
<script>
import Header from '@/components/LandingPage/Header.vue';
import VerificationSentForm from '@/components/LandingPage/VerificationSentForm.vue';
export default {
    components: {
        Header,
        VerificationSentForm,
    },
};
</script>

 
<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    font-family: 'Mukta', sans-serif;
}

.bg-image {
    background: radial-gradient(circle, rgba(239, 151, 252, 1) 36.9%, rgba(78, 249, 255, 1) 16.7%, rgba(161, 197, 255, 1) 8.24%, rgba(241, 146, 255, 1) 105.84%);
    position: relative;
}

.fade {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.28) 59%, rgba(255, 255, 255, 0));
}
</style>
