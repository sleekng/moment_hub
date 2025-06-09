<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl w-[600px]">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-6 bg-[#f8f9fa] rounded-t-2xl">
          <h2 class="text-2xl font-bold text-[#121212] tracking-tight">Delete your account</h2>
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
            <p class="text-[#865707] text-base font-normal leading-6">
              We are sad to see you go. Deleting your MomentsHub account is a permanent action. This means that all of your data, including your profile, moments, and connections, will be permanently removed and cannot be restored. If you are sure about this decision, please enter your password below to delete your account.
            </p>
          </div>
  
          <!-- Password Input -->
          <div class="space-y-1.5">
            <label class="block text-[#4c515b] text-base font-medium">Password</label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full px-3.5 py-3.5 border border-[#d0d5dd] rounded-lg text-[#667085]"
              />
              <i 
                :class="showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                aria-hidden="true"
              ></i>
            </div>
          </div>
  
          <!-- Delete Button -->
          <div class="flex justify-end">
            <button 
              @click="handleDelete"
              :disabled="isDeleting"
              class="px-5 py-2.5 bg-[#e32e2e] hover:bg-[#d42828] text-white rounded-full font-semibold text-lg transition-colors"
            >
              {{ isDeleting ? 'Deleting...' : 'Delete account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { eventBus } from '@/eventBus.js'; // Import eventBus

  export default {
    name: 'DeleteAccountModal',
    data() {
      return {
        password: '',
        showPassword: false,
        isDeleting: false
      }
    },
    methods: {
      async handleDelete() {
        if (!this.password) {
          return;
        }
  
        this.isDeleting = true;
        try {
          const response = await fetch(`${this.$baseURL}/delete-account`, {
            method: 'DELETE',
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
          eventBus.onSuccess('Account deleted successfully!'); // Notify success
        } catch (error) {
          eventBus.onError('An unexpected error occurred. Please try again.');
        } finally {
          this.isDeleting = false;
        }
      },
      getAuthToken() {
        return localStorage.getItem('authToken') || '';
      }
    }
  }
  </script>
  