<template>
<div class="flex justify-center items-center min-h-screen bg-gray-100 p-8">
    <div class="w-full max-w-6xl flex bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Left Side: Form -->
        <div class="w-1/2 p-8 flex flex-col justify-center items-center">
            <!-- Logo -->
            <div class="flex justify-start w-full">
                <div class="w-16 h-16 mb-8">
                    <img src="/assets/Logo-single.svg" alt="Logo" />
                </div>
            </div>

            <div class="flex justify-start w-full">
                <h2 class="text-2xl font-bold mb-4 text-gray-800 text-left">
                    Welcome to Moments Hub.
                </h2>
            </div>
            <p class="text-gray-600 mb-8">
                Yay! Get ready to turn your dreams into reality and start curating
                your ultimate wishlist experience.
            </p>

            <!-- Email Input -->
            <div class="w-full mb-4">
                <label class="block text-gray-700 mb-2" for="email">Email</label>
                <input class="w-full p-3 bg-white border border-gray-300 rounded-md" type="email" id="email" placeholder="Janedoe@email.com" />
            </div>

            <!-- Password Input -->
            <div class="w-full mb-4 relative">
                <label class="block text-gray-700 mb-2" for="password">Password</label>
                <div class="relative">
                    <input class="w-full p-3 bg-white border border-gray-300 rounded-md" :type="showPassword ? 'text' : 'password'" id="password" placeholder="***************" v-model="password" @input="checkPasswordStrength" />
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" @click="togglePassword" class="absolute top-4 right-3 cursor-pointer"></i>
                </div>
            </div>

            <!-- Password Strength -->
            <div v-if="passwordStrength" class="w-full mb-4">
                <div class="flex flex-col items-start">
                    <div class=" h-2 rounded-md w-full mb-2" :class="passwordStrengthClass"></div>
                    <span class="text-sm text-black font-bold">Password Strength: {{ passwordStrength }}
                         <span class=" text-[#616874] text-[12px]" v-if="passwordStrength == 'Good'">( You can make your password stronger by including a combination of uppercase, lower case, number, and special characters !$@%).</span> 
                         <span class=" text-[#616874] text-[12px]" v-if="passwordStrength == 'Weak'">( You can make your password stronger by including a combination of uppercase, lower case, number, and special characters !$@%).</span> 
                    </span>
                </div>
            </div>
            <div v-else class="w-full mb-4 ">
                <div class="flex flex-col items-start">
                    <div class=" h-2 rounded-md w-full mb-2 bg-[#F3F4F5]"></div>
                    <span class="text-sm password-check-text text-black font-bold"> Your password must be at least 8 characters and should include a combination of an uppercase and lower case.</span>
                </div>
            </div>

            <!-- Confirm Password Input -->
            <div class="w-full mb-4 relative">
                <div class="flex justify-between items-center">
                    <label class="block text-gray-700 mb-2" for="password-confirm">Re-enter Password</label>
                </div>
                <div class="relative">
                    <input class="w-full p-3 bg-white border border-gray-300 rounded-md" :type="showConfirmPassword ? 'text' : 'password'" id="password-confirm" placeholder="***************" v-model="confirmPassword" />
                    <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" @click="toggleConfirmPassword" class="absolute top-4 right-3 cursor-pointer"></i>
                </div>
            </div>

            <div class="text-gray-600 mb-8 text-sm">
                By clicking ‘Create Account’, you agree to Moments Hub's
                <a href="#" class="text-primaryColor font-medium">Terms and Condition</a>.
            </div>

            <button class="max-w-fit px-24 py-3 bg-primaryColor text-white font-semibold text-lg rounded-full shadow-lg">
                Create Account
            </button>

            <div class="text-center text-sm text-gray-600 mt-8">
                Already have an account? <a href="#" class="text-primaryColor font-medium">Log in</a>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="w-1/2 relative flex justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-image: url('/assets/image-91.svg'); background-position: center center; background-size: cover;">
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

.progress-bar {
    height: 2px;
}

.password-check-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    color: #616874;


}

</style>
