<!-- LoginForm.vue -->
<template>
   <div class="w-full lg:w-1/2 p-4 py-8 lg:p-8 flex overflow-y-auto flex-col  justify-center items-center">
    <!-- Logo -->
    <OptinLogo />

    <h2 class="text-2xl font-bold mb-4 text-gray-800 self-start">Create your Account on Moments Hub today!</h2>
    <p class="text-gray-600 mb-8 self-start">
        Create, share, and explore wishlists with friends and family. Turn every occasion into a celebration with your wishlist. Sign up now and start exploring.
    </p>
 
    <!-- Sign Up Buttons -->
    <div class="w-full space-y-4">
      
        <router-link to="/register"  class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm text-gray-800 font-medium" >
            <img src="/assets/mail.svg" class="w-4 h-4 mr-2" alt="Email Icon" />
                Sign up with email
         </router-link>
        

     <!--    <button class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
            <img src="/assets/apple.svg" class="w-4 h-4 mr-2" alt="Apple Icon" />
            <span class="text-gray-800 font-medium">Sign up with Apple</span>
        </button> -->

     <!--    <button 
        @click="handleOAuthSignIn('facebook')" 
        class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
        <img src="/assets/facebook.svg" class="w-4 h-4 mr-2" alt="Facebook Icon" />
        <span class="text-gray-800 font-medium">Sign up with Facebook</span>
    </button> -->

    <button 
        @click="handleOAuthSignIn('google')" 
        class="w-full flex items-center justify-center p-3 bg-gray-200 rounded-full shadow-sm">
        <img src="/assets/google.svg" class="w-4 h-4 mr-2" alt="Google Icon" />
        <span class="text-gray-800 font-medium">Sign up with Google</span>
    </button>
    </div>

    <div class="flex items-center my-8">
        <span class="mx-2 text-gray-600">Or</span>
    </div>

    <div class="text-gray-600">
        Already have an account?<router-link to="/login" class="text-primaryColor font-medium"> Login
        </router-link>
    </div>
</div>
</template>

<script>
import OptinLogo from '../Dashboard/OptinLogo.vue';
import { eventBus } from "@/eventBus.js";
export default {
    components: {
        OptinLogo
    },
    name: 'SignUp',

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
                console.error(`${provider} authentication error:`, error);
            }
        }
    }

};
</script>

<style scoped>
/* Add specific styles here if needed */
</style>
