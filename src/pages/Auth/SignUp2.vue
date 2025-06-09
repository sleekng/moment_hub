

<template>
    <Header />
    <div class="flex flex-col lg:justify-center lg:flex-row lg:items-center items-center h-screen  bg-white lg:p-8">
    
        <div class="w-full  h-full flex space-x-10 bg-white rounded-2xl  ">
          <SignUpForm2 />
    
          <!-- Right Side: Image -->
          <RightSideImage3 />
        </div>
      <!-- Header -->
    </div>
  </template>
    
       
    <script>
    import Header from '@/components/LandingPage/Header.vue';
    import RightSideImage3 from '@/components/LandingPage/RightSideImage3.vue';
    import SignUpForm2 from '@/components/LandingPage/SignUpForm2.vue';
    export default {
        components: {
            Header,
            SignUpForm2,
            RightSideImage3,
        },
        data() {
            return {
                showPassword: false,
                password: ''
            };
        },
        methods: {
            togglePassword() {
                this.showPassword = !this.showPassword;
            },
        }
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
    