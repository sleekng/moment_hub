// src/eventBus.js
import { reactive } from 'vue';

export const eventBus = reactive({
  loading: false,
  authState: null,
  setLoading(value) {
    this.loading = value;
  },
  setLoading(value) {
    this.loading = value;
  },

  onSuccess(message) {
    this.message = message;
    this.type = 'success'; // Set type to success
    // Automatically clear message after 3 seconds
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  },

  onError(message) {
    this.message = message;
    this.type = 'error'; // Set type to error
    // Automatically clear message after 3 seconds
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  },

  clearMessage() {
    this.message = '';
    this.type = ''; // Reset type
  }
});
