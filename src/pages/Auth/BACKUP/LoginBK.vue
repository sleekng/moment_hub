<template>
<div class="flex flex-col lg:justify-center lg:flex-row  lg:items-center items-start min-h-screen lg:bg-gray-100 bg-white lg:p-8">
    <header class="w-full h-[100px] bg-gradient-to-b from-purple-400 to-pink-200 lg:hidden flex items-center relative overflow-hidden" style=" background: url('/assets//Cover.png'); background-position:center center; background-size:cover; background-repeat:no-repeat;">
        <div class="ml-4">
            <img src="/assets/logo.svg" alt="Moments Hub Logo" class="lg:h-9" />
        </div>
    </header>
    <div class="w-full lg:max-w-6xl lg:min-h-[80vh] flex bg-white rounded-2xl lg:shadow-lg overflow-hidden">
        <!-- Left Side: Form -->
        <div class="w-full lg:w-1/2 p-4 py-8 lg:p-8 flex flex-col justify-center items-center">

            <!-- Logo -->
            <div class="lg:flex justify-start w-full hidden">
                <div class="w-16 h-16 mb-8">
                    <img src="/assets/Logo-single.svg" alt="Logo" />
                </div>
            </div>

            <div class="flex justify-start w-full">
                <h2 class="text-2xl font-bold mb-4 text-gray-800 text-left">
                    Welcome Back to Moments Hub!
                </h2>
            </div>
            <p class="text-gray-600 mb-8 flex justify-start w-full">
               <span> Ready to discover and share your dream wishlists? Sign in and start wishing!</span>
            </p>

            <!-- Email Input -->
            <div class="w-full mb-4">
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input class="w-full p-3 bg-white border border-gray-300 rounded-md" type="email" id="email" />
            </div>

            <!-- Password Input -->
            <div class="w-full mb-4 relative">
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <div class="relative">
                    <input class="w-full p-3 bg-white border border-gray-300 rounded-md" :type="showPassword ? 'text' : 'password'" id="password" v-model="password" @input="checkPasswordStrength" />
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" @click="togglePassword" class="absolute top-4 right-3 cursor-pointer"></i>
                </div>
            </div>

            <div class="text-gray-600 mb-8 text-sm flex justify-start w-full">
                <a href="#" class="text-primaryColor font-medium">Forgot Password?</a>.
            </div>

            <button class="max-w-fit px-24 py-3 bg-primaryColor text-white font-semibold text-lg rounded-full shadow-lg">
                Log into Account
            </button>

            <div class="text-center text-sm text-gray-600 mt-8">
                New to Moments Hub? <a href="#" class="text-primaryColor font-medium">Create Account</a>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="hidden lg:flex w-4/6 relative justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-image: url('/assets/teen2.svg'); background-position: center center; background-size: cover;">
            <div class="relative z-10 login-side-advert">
                <p class="text-black font-bold text-2xl">
                    Turn your dreams into reality and start curating your ultimate wishlist experience
                </p>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import LandingPageVue from '@/components/Layouts/LandingPage.vue';
export default {
    components:{
        LandingPageVue
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
