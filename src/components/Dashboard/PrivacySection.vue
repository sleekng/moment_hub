<template>
  <div>
    <h3 class="text-2d3036 text-lg font-medium mb-4">{{ title }}</h3>
    <hr class="mb-6">
    <div v-for="(option, index) in options" :key="index" class="flex items-center gap-4 mb-4">
      <img
        :src="selectedOption === index ? '/assets/web-radio-btn.svg' : '/assets/web-radio-btn-18.svg'"
        alt="Radio Button"
        class="w-5 h-5 cursor-pointer"
        @click="selectOption(index)"
      >
      <span class="text-gray-600">{{ option }}</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';
export default {
  name: "PrivacySection",
  props: ['title', 'options', 'selected', 'settingId'],
  data() {
    return {
      selectedOption: this.selected,
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
      this.$emit('update', index);
      this.updatePrivacySetting(index);
    },
    async updatePrivacySetting(index) {
      const settingValue = this.options[index].toLowerCase();
      try {
        eventBus.setLoading(true);
        await fetch(`${this.$baseURL}/user-privacy/${this.settingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          },
          body: JSON.stringify({ value: settingValue })
        });
      } catch (error) {
        const errorMsg = error.response ?.data ?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg); // Trigger the alert
        console.error('Error updating privacy setting:', error);
      }
      finally {
    eventBus.setLoading(false);
  }
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    },
  },

};
</script>
