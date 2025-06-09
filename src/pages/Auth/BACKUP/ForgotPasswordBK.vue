<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-8">
        <div class="w-full max-w-6xl min-h-[80vh] flex bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Left Side: Form -->
            <div class="w-1/2 p-8 flex flex-col  items-center">
                <!-- Logo -->
                <div class="flex justify-start w-full">
                    <div class="w-16 h-16 mb-8">
                        <img src="/assets/Logo-single.svg" alt="Logo" />
                    </div>
                </div>
    
                <div class="flex justify-start w-full">
                    <h2 class="text-2xl font-bold mb-4 text-gray-800 text-left">
                        Oops! Forgot Your Password?
                    </h2>
                </div>
                <p class="text-gray-600 mb-8">
                    Don't worry, it happens to the best of us. Enter your email address below, and we'll send you a link to reset your password.
                </p>
    
                <!-- Email Input -->
                <div class="w-full mb-4">
                    <label class="block text-gray-700 mb-2" for="email">Email</label>
                    <input class="w-full p-3 bg-white border border-gray-300 rounded-md" type="email" id="email"  />
                </div>

    
                <button class="max-w-fit px-24 py-3 mt-8 bg-primaryColor text-white font-semibold text-lg rounded-full shadow-lg">
                    Verify Email
                </button>
    
                <a href="#"  class="text-center text-sm text-gray-600 mt-4">
                    Back to sign in 
                </a>
            </div>
    
            <!-- Right Side: Image -->
            <div class="w-4/6 relative flex justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-image: url('/assets/teen2.svg'); background-position: center center; background-size: cover;">
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
    export default {
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
    