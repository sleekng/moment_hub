<template>
    <div class="w-full lg:w-1/2 p-4 py-8 lg:p-8 flex overflow-y-auto flex-col justify-start items-center">
      <!-- Logo -->
      <OptinLogo />
  
      <h2 class="text-2xl self-start font-bold mb-4 text-gray-800 text-left">
        Reset your Password
      </h2>
  
      <p class="text-gray-600 mb-8 self-start">
        Create a shiny new password and back to discovering wishlists! Enter your new password below and confirm it to reset.
      </p>
  
      <div v-if="message" class="mb-4 text-sm" :class="{'text-green-600': success, 'text-red-600': !success}">
        {{ message }}
      </div>
  
      <!-- Password Input -->
      <div class="w-full mb-4 relative">
        <label class="block text-gray-700 mb-2" for="password">Password</label>
        <div class="relative">
          <input class="w-full p-3 bg-white border border-gray-300 rounded-md" 
                 :type="showPassword ? 'text' : 'password'"
                 id="password" 
                 placeholder="***************"
                 v-model="password" 
                 @input="checkPasswordStrength" />
          <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" 
             @click="togglePassword" 
             class="absolute top-4 right-3 cursor-pointer"></i>
        </div>
      </div>
  
      <!-- Password Strength -->
      <div v-if="passwordStrength" class="w-full mb-4">
        <div class="flex flex-col items-start">
          <div class="h-2 rounded-md w-full mb-2" :class="passwordStrengthClass"></div>
          <span class="text-sm text-black font-bold">Password Strength: {{ passwordStrength }}</span>
        </div>
      </div>
      <div v-else class="w-full mb-4">
        <div class="flex flex-col items-start">
          <div class="h-2 rounded-md w-full mb-2 bg-[#F3F4F5]"></div>
          <span class="text-sm password-check-text text-black font-bold"> Your password must be at least 8 characters, include both uppercase and lowercase letters, and contain at least one symbol.</span>
        </div>
      </div>
  
      <!-- Confirm Password Input -->
      <div class="w-full mb-4 relative">
        <div class="flex justify-between items-center">
          <label class="block text-gray-700 mb-2" for="password-confirm">Re-enter Password</label>
        </div>
        <div class="relative">
          <input class="w-full p-3 bg-white border border-gray-300 rounded-md" 
                 :type="showConfirmPassword ? 'text' : 'password'"
                 id="password-confirm" 
                 placeholder="***************" 
                 v-model="confirmPassword" />
          <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-regular fa-eye'" 
             @click="toggleConfirmPassword" 
             class="absolute top-4 right-3 cursor-pointer"></i>
        </div>
      </div>
      <button @click="resetPassword" class="max-w-fit px-24 py-3 mt-6 bg-primaryColor text-white transition-all font-semibold text-lg rounded-full hover:shadow-lg">
        Reset Password
      </button>
    </div>
  </template>
  
  <script>
  import OptinLogo from '../Dashboard/OptinLogo.vue';
  import { eventBus } from '@/eventBus.js';
  
  export default {
    components: {
      OptinLogo
    },
    props: {
      token: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        showPassword: false,
        showConfirmPassword: false,
        password: '',
        confirmPassword: '',
        passwordStrength: '',
        passwordStrengthClass: '',
        message: '',
        success: false,
        token: this.token, 
        email: this.email 
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
      },
      checkPasswordStrength() {
        const length = this.password.length;
        const hasUpperCase = /[A-Z]/.test(this.password);
        const hasLowerCase = /[a-z]/.test(this.password);
        const hasNumber = /\d/.test(this.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  
        if (length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
          this.passwordStrength = 'Weak';
          this.passwordStrengthClass = 'bg-red-500';
        } else if (length < 10) {
          this.passwordStrength = 'Medium';
          this.passwordStrengthClass = 'bg-yellow-500';
        } else {
          this.passwordStrength = 'Strong';
          this.passwordStrengthClass = 'bg-green-500';
        }
      },
      async resetPassword() {

        if (this.password !== this.confirmPassword) {
          this.message = "Passwords do not match";
          this.success = false;
          return;
        }
        try {
          eventBus.setLoading(true);
          const response = await this.$axios.post(`${this.$baseURL}/reset-password`, {
            token: this.token,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
  
          eventBus.onSuccess(response.data.message);
          localStorage.setItem("authToken", token);
       
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
          this.$router.push({
            path: "/dashboard",
          });
        }
      },
      async signOut() {
      try {
        eventBus.setLoading(true);
        const response = await fetch(`${this.$baseURL}/logout`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          },
        });

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg);
        console.error('Error logging out', error);
      } finally {
        eventBus.setLoading(false);
      }
    },
    getToken() {
      return localStorage.getItem('authToken');
    }
    },
    beforeMount() {
    if (this.getToken()) {
      this.signOut();
    }
  }

  };
  </script>
  
  <style scoped>
  .password-check-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    color: #616874;
  }
  </style>
  