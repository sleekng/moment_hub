<template>
   <div class="w-full lg:w-1/2 p-4 py-8 lg:p-8 flex overflow-y-auto flex-col justify-start items-center">
    <!-- Logo -->
   <OptinLogo/>

   
        <h2 class="text-2xl font-bold mb-4 text-gray-800 self-start">
            Oops! Forgot Your Password?
        </h2>
    
    <p class="text-gray-600 mb-8 self-start">
        Don't worry, it happens to the best of us. Enter your email address below, and we'll send you a link to reset your password.
    </p>

    <!-- Email Input -->
    <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2" for="email">Email</label>
        <input v-model="email" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="email" id="email" placeholder="Enter your email" />
    </div>

    <button @click="sendPasswordReset" :class="opacity" :disabled="isSubmitting" class="max-w-fit px-24 py-3 mt-8 bg-primaryColor text-white font-semibold text-lg rounded-full transition-all hover:shadow-lg">
        Verify Email
    </button>

    <router-link to="/login" class="text-center text-sm text-gray-600 mt-4">Back to sign in</router-link>


    <div v-if="message" class="mt-4 text-sm" :class="{'text-green-600': success, 'text-red-600': !success}">
        {{ message }}
    </div>
</div>
</template>

<script>
import axios from 'axios';
import OptinLogo from '../Dashboard/OptinLogo.vue';
import { eventBus } from '@/eventBus.js';

export default {
    components:{
        OptinLogo
    },
    name: 'ForgotPasswordForm',
    data() {
        return {
            email: '',
            message: '',
            success: false,
            isSubmitting: false,
            opacity: 'opacity-100',
        };
    },
    methods: {
        async sendPasswordReset() {

            this.isSubmitting = true;
            this.opacity = 'opacity-40'

            try { 
                eventBus.setLoading(true);
                const response = await this.$axios.post(`${this.$baseURL}/forgot-password`, {
                    email: this.email
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {

                    this.message = response.data.message || 'Password reset link sent to your email.';
                    this.success = true;
                    this.isSubmitting = false;
                    this.opacity = 'opacity-100'
                } else {
                    this.message = response.data.message || 'Could not send reset link. Please try again later.';
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
                eventBus.onError(errorMsg); // Trigger the alert
                
                this.message = error.response.data.message || 'An error occurred. Please try again later.';
                this.success = false;
                this.isSubmitting = false;
                this.opacity = 'opacity-100'
            }
            finally {
    eventBus.setLoading(false);
  }
        }
    }
};
</script>

<style scoped>
/* Add specific styles here if needed */
</style>
