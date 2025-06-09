<template>
  <div class="w-3/4 space-y-16">
    <!-- Password Change -->
    <div>
      <h1 class=" font-bold text-2xl mb-4 lg:hidden block">Password</h1>
      <h2 class="text-lg font-medium text-gray-800 mb-4 hidden lg:block">Change Password</h2>
      <hr class="mb-6 hidden lg:block">
      <div class="space-y-8">
        <div>
          <label class="block text-gray-700 font-medium">Current Password</label>
          <div class="relative">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="passwordData.current_password"
              class="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md"
            />
            <i 
               :class="showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'"
               @click="toggleCurrentPassword"
               class="fas absolute inset-y-0 right-3 top-6 cursor-pointer text-gray-500">
            </i>
          </div>
          <button @click="handleForgotPassword" class="text-pink-500 mt-2">Forgot Password?</button>
        </div>
        <div>
          
          <label class="block text-gray-700 font-medium">New Password</label>
          <div class="relative">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="passwordData.password"
              class="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md"
            />
            <i 
               :class="showNewPassword ? 'fa-eye-slash' : 'fa-eye'"
               @click="toggleNewPassword"
               class=" fas absolute inset-y-0 right-3 top-6 cursor-pointer text-gray-500">
            </i>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            Your password must be at least 8 characters, including uppercase and lowercase.
          </p>
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Re-enter Password</label>
          <div class="relative">
            <input
              :type="showReEnterPassword ? 'text' : 'password'"
              v-model="passwordData.password_confirmation"
              class="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md"
            />
            <i  
               :class="showReEnterPassword ? 'fa-eye-slash' : 'fa-eye'"
               @click="toggleReEnterPassword"
               class="absolute fas inset-y-0 right-3 top-6 cursor-pointer text-gray-500">
            </i>
          </div>
        </div>
      </div>
      <div class="justify-end flex">
        <button @click="updatePassword" :disabled="isSaving" :class="{ 'opacity-40 cursor-not-allowed': isSaving }" class="mt-8 bg-primaryColor transition-all hover:shadow text-white px-10 py-3 rounded-full">
          {{ isSaving ? 'updating...' : 'Update' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';
export default {
  name: "PasswordSettings",
  data() {
    return {
      passwordData: {
        current_password: '', // updated
        password: '', // updated
        password_confirmation: '' // updated
      },
      isSaving: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showReEnterPassword: false,
    };
  },
  methods: {

    async handleForgotPassword() {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user?.email;


      if (!email) {
        eventBus.onError('No email found for the logged-in user.');
        return;
      }

      try {
        eventBus.setLoading(true);
        const response = await this.$axios.post(`${this.$baseURL}/forgot-password`, { email }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        eventBus.onSuccess(response.data.message);

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
        eventBus.setLoading(false);
      }
    },

    async updatePassword() {
      this.isSaving = true;
      try {
        eventBus.setLoading(true);
        const response = await fetch(`${this.$baseURL}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          },
          body: JSON.stringify(this.passwordData)
        });

        eventBus.onSuccess(response.data.message);
        const result = await response.json();
        const user = result.data;
        localStorage.setItem('user', JSON.stringify(user));

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
        this.isSaving = false;
        eventBus.setLoading(false);
      }


    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    },

    toggleCurrentPassword() {
      this.showCurrentPassword = !this.showCurrentPassword;
    },
    toggleNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleReEnterPassword() {
      this.showReEnterPassword = !this.showReEnterPassword;
    },
  }
};
</script>

<style>
  /* Ensure you've included FontAwesome in your project */
</style>
