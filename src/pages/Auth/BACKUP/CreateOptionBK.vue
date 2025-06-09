<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-8">
        <div class="w-full max-w-5xl min-h-[80vh] flex bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Left Side: Form -->
            <div class="w-1/2 p-8 flex flex-col justify-center items-center">
                <!-- Logo -->
               <div class=" flex justify-start w-full">
                <div class="w-16 h-16 mb-8  ">
                    <img src="/assets/Logo-single.svg" alt="Logo" />
                </div>
               </div>
    
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Create your Account on Moments Hub today!</h2>
                <p class="text-gray-600 mb-8">
                    Create, share, and explore wishlists with friends and family. Turn every occasion into a celebration with your wishlist. Sign up now and start exploring.
                </p>
    
                <!-- Sign Up Buttons -->
                <div class="w-full space-y-4">
                    <button class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
                        <img src="/assets/mail.svg" class="w-4 h-4 mr-2" alt="Email Icon" />
                        <span class="text-gray-800 font-medium">Sign up with email</span>
                    </button>
    
                    <button class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
                        <img src="/assets/apple.svg" class="w-4 h-4 mr-2" alt="Apple Icon" />
                        <span class="text-gray-800 font-medium">Sign up with Apple</span>
                    </button>
    
                    <button class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
                        <img src="/assets/facebook.svg" class="w-4 h-4 mr-2" alt="Facebook Icon" />
                        <span class="text-gray-800 font-medium">Sign up with Facebook</span>
                    </button>
    
                    <button class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
                        <img src="/assets/google.svg" class="w-4 h-4 mr-2" alt="Google Icon" />
                        <span class="text-gray-800 font-medium">Sign up with Google</span>
                    </button>
                </div>
    
                <div class="flex items-center my-8">
                    <span class="mx-2 text-gray-600">Or</span>
                </div>
    
                <div class="text-gray-600">
                    Already have an account? <a href="#" class="text-primaryColor font-medium">Log in</a>
                </div>
            </div>
    
            <!-- Right Side: Image -->
            <div class="w-4/6 relative flex justify-center p-4  items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style=" background-image: url('/assets/image-91.svg'); background-position: center center; background-size: cover;">
                <div class="relative z-10  login-side-advert">
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
        name: 'SignUp',
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
        box-shadow: -5px -5px 250px 0px #FFFFFF05 inset;
        background: radial-gradient(199.2% 299.24% at -16.97% -72.08%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.28) 59.24%, rgba(255, 255, 255, 0) 83.7%);
        padding: 24px 24px 23px 24px;
        gap: 0px;
        border-radius: 20px;
        border: 2px solid;
        border-image-source: linear-gradient(169.15deg, rgba(255, 255, 255, 0.4) 0%, rgba(254, 254, 254, 0.2) 96.79%);
        backdrop-filter: blur(10px);
        /* Adds blur effect */
        -webkit-backdrop-filter: blur(10px);
        /* For Safari support */
    
    }
    </style>
    