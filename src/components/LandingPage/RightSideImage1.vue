<!-- RightSideImage.vue -->
<template>
    <div class="hidden lg:flex w-4/6 h-auto lg:p-8 relative justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-position: center -100px; background-size: cover;">
      <div class="relative z-10 login-side-advert">
        <p class="text-black font-bold text-2xl">
          Turn your dreams into reality and start curating your ultimate wishlist experience
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RightSideImage',
  };
  </script>
  
  <style scoped>
  div {
    background-image: url('/assets/Splash-screen.jpg');
  }

  .login-side-advert {
    box-shadow: -5px -5px 250px 0px #ffffff05 inset;
    background: radial-gradient(199.2% 299.24% at -16.97% -72.08%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.28) 59.24%, rgba(255, 255, 255, 0) 83.7%);
    padding: 24px 24px 23px 24px;
    gap: 0px;
    border-radius: 20px;
    border: 2px solid;
    border-image-source: linear-gradient(169.15deg, rgba(255, 255, 255, 0.4) 0%, rgba(254, 254, 254, 0.2) 96.79%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
  </style>
  