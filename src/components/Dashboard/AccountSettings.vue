<template>
  <div class="w-3/4 space-y-16">
    <!-- Account Information -->
    <div>
      <h1 class="font-bold text-2xl mb-4 lg:hidden block">Your account</h1>
      <h2 class="text-lg font-medium text-gray-800 lg:mb-4">Account information</h2>
      <hr class="mb-6">
      <div class="space-y-8">
        <div>
          <label class="block text-gray-700 font-medium">Username</label>
          <input type="text" v-model="userData.username" class="w-full p-3 mt-2 border border-gray-300 rounded-md" />
          <div class="mt-2 flex items-center text-sm text-gray-600">
            <span>Your Moments Hub URL: https://momentshub.org/{{ userData.username }}</span>
            <img src="/assets/copy.svg" alt="Copy" class="w-4 h-4 ml-1 cursor-pointer" @click="copyToClipboard">
          </div>
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Birthday</label>
          <div class="flex space-x-2 mt-2">
            <input type="number" v-model="birthdayMonth" min="1" max="12" placeholder="MM" class="w-20 p-3 bg-gray-50 border border-gray-300 rounded-md" style="width: 4em;" />
            <input type="number" v-model="birthdayDay" min="1" max="31" placeholder="DD" class="w-20 p-3 bg-gray-50 border border-gray-300 rounded-md" style="width: 4em;" />
          </div>
          <p class="text-sm text-gray-600 mt-1">Format: MM/DD</p>
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Email</label>
          <input disabled type="email" v-model="userData.email" class="w-full p-3 mt-2 bg-gray-200 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div class="justify-end flex">
        <button @click="saveChanges" :disabled="isSaving" :class="{ 'opacity-40 cursor-not-allowed': isSaving }" class="duration-300 mt-8 bg-primaryColor transition-all hover:shadow text-white px-10 py-3 rounded-full">
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <!-- Deactivation and Deletion -->
    <div>
      <h2 class="text-lg font-medium text-gray-800 mb-4">Deactivation and deletion</h2>
      <hr class="mb-6">
      <div class="space-y-12">
        <div class="flex items-start gap-8">
          <div class="flex-grow">
            <h3 class="text-gray-900 font-medium mb-1">Deactivate your moments hub account</h3>
            <p class="text-gray-600">Temporarily hide your profile, wishlist and wishes. You can restore your account if it was accidentally or wrongfully deactivated for up to 30 days after deactivation.</p>
          </div>
          <button      @click="showDeactivateModal = true"  class="bg-gray-200 text-gray-800 px-6 py-2 rounded-full w-[168px] inline-block">Deactivate</button>
        </div>
        <div class="flex items-start gap-8">
          <div class="flex-grow">
            <h3 class="text-gray-900 font-medium mb-1">Delete your moments hub account</h3>
            <p class="text-gray-600">Permanently delete your data and everything associated with your account. Once you delete your account, your data will be gone forever.</p>
          </div>
          <button @click="showDeleteModal = true" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-full w-[168px] inline-block">Delete</button>
        </div>
      </div>
    </div>

    <!-- Delete & Deactivate Account Modal -->
    <DeleteAccountModal v-if="showDeleteModal" @close="showDeleteModal = false" />
    <DeactivateAccountModal v-if="showDeactivateModal" @close="showDeactivateModal = false" />
  </div>
</template>

<script>
import DeactivateAccountModal from './DeactivateAccountModal.vue';
import DeleteAccountModal from './DeleteAccountModal.vue';
import { eventBus } from '@/eventBus.js';

export default {
  name: "AccountSettings",
  components: {
    DeleteAccountModal,
    DeactivateAccountModal
  },
  data() {
    return {
      userData: {
        username: '',
        dob: '',  // Keep birthday in the MM/DD format for storage
        email: '',
      },
      birthdayMonth: '',
      birthdayDay: '',
      isSaving: false,
      showDeactivateModal: false,
      showDeleteModal: false
    };
  },
  mounted() {
    this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      const profile = JSON.parse(localStorage.getItem('user') || '{}');
      this.userData.username = profile.username || '';
      this.userData.dob = profile.dob || '';  // Assumes dob in MM/DD format
      this.userData.email = profile.email || '';
      
      // Split the MM/DD to respective fields
      if (this.userData.dob) {
        const [month, day] = this.userData.dob.split('/');
        this.birthdayMonth = month ? parseInt(month, 10) : '';
        this.birthdayDay = day ? parseInt(day, 10) : '';
      }
    },
    async saveChanges() {
      this.isSaving = true;
      try {
        eventBus.setLoading(true);
        // Formulate birthday as MM/DD
        this.userData.dob = `${String(this.birthdayMonth).padStart(2, '0')}/${String(this.birthdayDay).padStart(2, '0')}`;

        const response = await fetch(`${this.$baseURL}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          },
          body: JSON.stringify(this.userData)
        });
   
        const result = await response.json();
    const user = result.data;

    // Update the user object in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    eventBus.onSuccess(result.message || 'Profile updated successfully');

      } catch (error) {
        if (error.response) {
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
    copyToClipboard() {
      const url = `https://momentshub.org/${this.userData.username}`;
      navigator.clipboard.writeText(url).then(() => {
       
        eventBus.onSuccess('URL copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy URL:', err);
      });
    }
  }
};
</script>
