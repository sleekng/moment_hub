<template>
   <div class="w-full lg:w-1/2 p-4 py-8 lg:p-8 flex overflow-y-auto flex-col justify-start items-center">
     <!-- Logo -->
     <OptinLogo />
     
 
      <h2 class="text-2xl font-bold mb-4 text-gray-800 self-start">
        Welcome Back to Moments Hub!
      </h2>
    <p class="text-gray-600 mb-8 w-full self-start">
      <span>Ready to discover and share your dream wishlists? Sign in and start wishing!</span>
    </p>

    <div class="w-full mb-4">
      <label class="block text-gray-700 mb-2" for="login-email">Email/Username</label> 
      <input v-model="email" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="email" id="login-email" @keyup.enter="handleSubmit" />
    </div>

    <div class="w-full mb-4 relative">
      <label class="block text-gray-700 mb-2" for="login-password">Password</label>
      <div class="relative">
        <input v-model="password" class="w-full p-3 bg-white border border-gray-300 rounded-md" :type="showPassword ? 'text' : 'password'" id="login-password" @keyup.enter="handleSubmit" />
        <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" @click="togglePassword" class="absolute top-4 right-3 cursor-pointer"></i>
      </div>
    </div>

    <div class="text-gray-600 mb-8 text-sm flex justify-start w-full">
      <router-link to="/forgot-password" class="text-primaryColor font-medium">Forgot Password?</router-link>
    </div>

    <button 
      @click="handleSubmit" 
      :disabled="isSubmitting"
      :class="opacity"
      class="max-w-fit lg:px-24 px-8 py-2 md:py-3 bg-primaryColor text-white font-semibold text-lg rounded-full shadow-lg"
    >
      Log into Account
    </button>

    <div class="mt-8 flex items-center space-x-2 justify-center">
      <span class="h-[1px] bg-[#F0F2F5] w-28 md:w-40"></span>
      <span class=" text-sm text-[#667185]">Or</span>
      <span class="h-[1px] bg-[#F0F2F5] w-28 md:w-40"></span>
    </div>

    <div class="flex justify-center space-x-4 p-4 rounded">
<!--       <img src="/assets/facebook.svg" class="w-8 h-8 rounded-full p-1 border" alt="Facebook Icon" /> -->
      <button   @click="handleOAuthSignIn('google')" >
        <img src="/assets/google.svg" class="w-8 h-8 rounded-full p-1 border" alt="Google Icon" />
      </button>
<!--       <img src="/assets/apple.svg" class="w-8 h-8 rounded-full p-1 border" alt="Apple Icon" /> -->
    </div>
    <div class="text-center text-sm create-bt  text-gray-600 mt-4">
      New to Moments Hub? 
      
      <router-link class="text-primaryColor font-medium" to="/create-option">
        Create Account
      </router-link>
    </div>
  </div>
</template>

<script>
import OptinLogo from '../Dashboard/OptinLogo.vue';

import { eventBus } from "@/eventBus.js";
export default {
  name: 'LoginForm',
  components:{
    OptinLogo
  },
  data() {
    return {
      opacity: 'opacity-100',
      showPassword: false,
      email: '',
      password: '',
      isSubmitting: false,
    };
  },
  methods: {
    async handleOAuthSignIn(provider) {
      eventBus.setLoading(true);
            try {
                const response = await this.$axios.get(`${this.$baseURL}/oauth/${provider}/sign-in`, {
                    params: {
                        redirect_uri: `${this.$website}/auth/${provider}/callback`
                    }
                });
                
                if (response.data.data.redirect_url) {
                    window.location.replace(response.data.data.redirect_url);
                }
            } catch (error) {
              if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
            }
        },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      if (this.email && this.password) {
        this.isSubmitting = true;
        this.opacity = 'opacity-40'
        try {
          // Simulate an API call
          await this.$emit('submit', { email: this.email, password: this.password });
          // Handle success, reset form, navigate, etc.
        } catch (error) {
          if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }
        } finally {
          this.isSubmitting = false;
          this.opacity = 'opacity-100'
        }
      } else {
       const errorMsg ='Please fill in both email and password.'
        eventBus.onError(errorMsg); // Trigger the alert
        console.error('Please fill in both email and password.');
      }
    },
  },
};
</script>

<style scoped>
/* Add specific styles here if needed */
button[disabled] {
  background-color: #bfc0c0;
  cursor: not-allowed;
}
</style>
