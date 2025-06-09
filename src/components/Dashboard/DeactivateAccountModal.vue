<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl w-[600px]">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-6 bg-[#f8f9fa] rounded-t-2xl">
          <h2 class="text-2xl font-bold text-[#121212] tracking-tight font-mukta">Deactivate your account</h2>
          <i 
            class="fas fa-times text-2xl cursor-pointer text-[#3B3F46]"
            @click="$emit('close')"
            aria-label="Close"
          ></i>
        </div>
  
        <!-- Content -->
        <div class="p-6 space-y-10">
          <!-- Warning Message -->
          <div class="flex gap-2.5 bg-[#fef5e7] rounded-lg p-3.5">
            <i 
              class="fa-light text-[#865707] fa-seal-exclamation w-5 h-5 mt-1"
              aria-hidden="true"
            ></i>
            <p class="text-[#865707] text-base font-normal leading-6 font-mukta">
              Need a break? Deactivating your Moments Hub account temporarily disables your profile and makes it invisible to others. You can reactivate your account anytime by simply logging back in. If you'd like to proceed, confirm below.
            </p>
          </div>
  
          <!-- Password Input -->
          <div class="space-y-1.5">
            <label class="block text-[#4c515b] text-base font-medium font-mukta">Password</label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-3.5 py-3.5 border border-[#d0d5dd] rounded-lg text-[#667085] font-inter"
              />
              <i 
                :class="showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
          </div>
  
          <!-- Deactivate Button -->
          <div class="flex justify-end">
            <button 
              @click="handleDeactivate"
              :disabled="isDeactivating"
              class="px-5 py-2.5 bg-[#e157f5] hover:bg-[#d042e0] text-white rounded-full font-semibold text-lg transition-colors font-mukta"
            >
              {{ isDeactivating ? 'Deactivating...' : 'Deactivate account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { eventBus } from '@/eventBus.js';
  
  export default {
    name: 'DeactivateAccountModal',
    data() {
      return {
        password: '',
        showPassword: false,
        isDeactivating: false
      }
    },
    methods: {
      async handleDeactivate() {
        if (!this.password) {
          return;
        }
  
        this.isDeactivating = true;
        try {
          const response = await fetch(`${this.$baseURL}/deactivate-account`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.getAuthToken()}`
            },
            body: JSON.stringify({
              password: this.password
            })
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 422) {
              eventBus.onError(errorData.message || 'The password is incorrect');
            } else {
              eventBus.onError(errorData.message || 'Failed to delete account');
            }
            return;
          }
          
  
          // Clear local storage and redirect to login
          localStorage.clear();
          this.$router.push('/login');
          eventBus.onSuccess('Account Deactivated');
        } catch (error) {
          eventBus.onError(error.message);
          console.error('Error deactivating account:', error);
        } finally {
          this.isDeactivating = false;
        }
      },
      getAuthToken() {
        return localStorage.getItem('authToken') || '';
      }
    }
  }
  </script>
  
  