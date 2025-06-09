<template>
  <div v-if="showShareAddressModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999999]">
    <div class="bg-white rounded-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <img src="/assets/location.svg" alt="Location icon" class="w-6 h-6" />
          <h2 class="font-semibold text-xl text-gray-800">Share delivery address</h2>
        </div>
        <button class="text-gray-800 text-2xl" @click="closeModal">×</button>
      </div>

      <div>
        <div class="flex items-start bg-gray-100 p-4 rounded-md gap-2 mb-6">
          <img src="/assets/information.svg" alt="Tip Icon" class="w-5 h-5" />
          <div>
            <strong>Tip:</strong> {{ tipMessage }}
          </div>
        </div>

        <div class="my-6">
          <div>
            <div
              v-for="address in addresses"
              :key="address.id"
              class="border rounded-md p-4 mb-4"
              :class="{ 'bg-purple-50 border-primaryColor': selectedAddressId === address.id }"
              @click="handleSelect(address.id)"
            >
              <div class="flex items-center justify-between gap-2 mb-2 relative">
                <span class="font-medium">{{ address.private ? 'Private' : 'Public' }} address</span>
                <img
                  :src="selectedAddressId === address.id ? '/assets/selected-input.svg' : '/assets/not-selected-input.svg'"
                  alt="Toggle Checkbox"
                  class="w-5 h-5 right-4 absolute cursor-pointer"
                >
              </div>
              <div class="flex items-start gap-2">
                <img src="/assets/location-2.svg" alt="location icon" class="w-4 h-4" />
                <div>
                  <p>{{ address.street }}, {{ address.city }}, {{ address.state }}, {{ address.country }}, {{ address.zip_code || '' }}</p>
                  <p>Phone number: {{ address.phone }}</p>
                </div>
              </div>
            </div>
          </div>

          <button @click="navigateToAddressSettings" class="text-blue-600">
            Manage delivery location
          </button>
        </div>
        <div v-if="addresses.length > 0" class="flex justify-end gap-4 mt-6">
          <button class="bg-gray-200 text-gray-800 rounded-full px-6 py-2" @click="closeModal">Cancel</button>
          <button class="bg-primaryColor text-white rounded-full px-6 py-2" @click="showConfirmationModal = true">Share</button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex flex-col items-center">
          <img src="/assets/Content.svg" alt="Content" class="mb-4" />
          <h2 class="font-semibold text-xl text-gray-800 mb-2">Share delivery address?</h2>
          <p class="text-center text-gray-600 mb-6">Are you sure you want to share your public address as your delivery location?</p>
          <div class="flex p-6 justify-between w-full space-x-3 px-10 border-t">
            <button class="bg-gray-200 w-full text-gray-800 rounded-full px-6 py-2" @click="showConfirmationModal = false">Cancel</button>
            <button class="bg-primaryColor w-full text-white rounded-full px-6 py-2" @click="confirmShare">Yes, share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';

export default {
  name: 'ShareAddressModal',
  props: {
    selectedNotification: {
      type: Object,
      required: true
    },
    showShareAddressModal: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'addressSelected', 'shareConfirmed'],
  
  data() {
    return {
      tipMessage: 'For your safety, we recommend sharing your public address for general use and your private address to only trusted friends. Your privacy is important to us!',
      addresses: [],
      selectedAddressId: null,
      showConfirmationModal: false
    };
  },
  watch: {
    showShareAddressModal(newVal) {
      if (newVal) {
        this.fetchAddresses();
      }
    }
  },
  methods: {
    async fetchAddresses() {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/addresses`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        if (response.data.success) {
          this.addresses = response.data.data;
          if (this.addresses.length > 0) {
            this.selectedAddressId = this.addresses[0].id;
          }
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    },
    navigateToAddressSettings() {
      this.$router.push({ path: '/account', query: { page: 'delivery' } });
      this.closeModal();
    },
    closeModal() {
      this.showConfirmationModal = false;
      this.$emit('close');
    },
    handleSelect(addressId) {
      this.selectedAddressId = addressId;
      this.$emit('addressSelected', addressId);
    },
    async confirmShare() {
      if (!this.selectedAddressId) return;
      
      this.$emit('shareConfirmed', {
        addressId: this.selectedAddressId,
        notification: this.selectedNotification
      });
    }
/*     async confirmShare() {
      if (!this.selectedAddressId) return;
      const wishId = this.notification.action_id;
      const notification_id = this.notification.id;

      try {
        await this.$axios.put(`${this.$baseURL}/wishes/${wishId}/address/${this.selectedAddressId}`, {}, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        eventBus.onSuccess('Address shared successfully.');
        this.closeModal();
      } catch (error) {
        console.error("Error sharing address:", error);
        const errorMsg = error.response?.data?.message || 'Error sharing address. Please try again.';
        eventBus.onError(errorMsg);
      } finally {
        this.showShareAddressModal = false;
        this.showConfirmationModal = false;
      }
    } */





  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
