<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-2d3036 text-xl">{{ title }}</h3>
      <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full" @click="toggleAll">Toggle all</button>
    </div>
    <hr class="mb-6">
    <div v-for="(option, index) in options" :key="index" class="flex items-center gap-4 mb-4 relative">
      <img
        :src="selectedOptions[index] ? '/assets/web-checkbox.svg' : '/assets/web-checkbox-17.svg'"
        alt="Toggle Checkbox"
        class="w-5 h-5 absolute cursor-pointer"
        @click="toggleCheckbox(index)"
      >
      <span class="ml-8 text-gray-600">{{ option }}</span>
    </div>
  </div>
</template>

<script>

import { eventBus } from '@/eventBus.js';
export default {
  name: "ToggleSection",
  props: ['title', 'options', 'selected', 'notificationIds'],
  data() {
    return {
      selectedOptions: this.selected.map(val => val)
    };
  },
  watch: {
    selected(newVal) {
      this.selectedOptions = [...newVal];
    }
  },
  methods: {
    async toggleCheckbox(index) {
      this.selectedOptions[index] = !this.selectedOptions[index];
      this.emitChange();
      await this.updateSingleNotification(index);
    },
    async emitChange() {
      this.$emit('update', this.selectedOptions);
    },
    async toggleAll() {
      const newState = !this.selectedOptions.every(val => val);
      this.selectedOptions = this.selectedOptions.map(() => newState);
      this.emitChange();
      await this.updateAllNotifications(newState);
    },
    async updateSingleNotification(index) {
      const id = this.notificationIds[index];
      const type = this.title.includes("Push") ? "push" : "email";
      try {
        eventBus.setLoading(true);
        await fetch(`${this.$baseURL}/notification-settings/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          },
          body: JSON.stringify({ [type]: this.selectedOptions[index] })
        });
      } catch (error) {

        const errorMsg = error.response ?.data ?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg); // Trigger the alert
        console.error('Error updating single notification:', error);
      }
      finally {
    eventBus.setLoading(false);
  }
    },
    async updateAllNotifications(newState) {
      const type = this.title.includes("Push") ? "push" : "email";
      try {
        eventBus.setLoading(true);
        await fetch(`${this.$baseURL}/notification-settings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          },
          body: JSON.stringify({ type, newState })
        });
      } catch (error) {

        const errorMsg = error.response ?.data ?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg); // Trigger the alert
        console.error('Error toggling all notifications:', error);
      }
      finally {
    eventBus.setLoading(false);
  }
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    }
  }
};
</script>
