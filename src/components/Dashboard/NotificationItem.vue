<template>
  <div class="p-4 border-b border-gray-200 flex items-start space-x-3">
    <div class="-z-10 relative space-x-2 flex items-center">
      <div v-if="notification.read_at === null" class="w-2 h-2 bg-primaryColor rounded-full"></div>
      <div class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
        <img :src="notification.notifier?.avatar || '/assets/avatar.svg'" alt="Profile" class="w-full rounded-full object-cover">
      </div>
    </div>
    {{ notification }}

    <div class="w-full">
      <p class="text-sm text-gray-700">
        <span @click="navigateToUserProfile(notification.notifier?.username)" class="cursor-pointer">
          <strong class="hover:underline">{{ notification.notifier?.username || 'Unknown User' }}</strong>
        </span> {{ notification.data.message }}
      </p>
      
      <div v-if="notification.type === 'wishlist' || notification.type === 'birthdays'"
        @click="navigateTo(notificationLink)"
        class="mt-2 flex w-full items-center space-x-3 p-2 border border-gray-300 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-3">
          <img :src="notification.action?.photo || '/assets/default-image.svg'" alt="Product" class="w-16 h-16 object-cover rounded-md">
          <div>
            <p class="text-sm font-medium text-gray-800">{{ notification.action?.name || 'Unnamed Item' }}</p>
            <div v-if="notification.action?.priority" :class="priorityClass(notification.action.priority)"
              class="inline-flex items-center text-sm font-medium py-1 px-2 rounded-full">
              {{ notification.action.priority }} priority
              <img :src="priorityIcon(notification.action.priority)" alt="Priority" class="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      
      <p class="text-xs text-gray-500 mt-1">{{ formatDate(notification.created_at) }}</p>
      <div v-if="notificationActions.length && notification.action_taken" class="flex mt-2 space-x-2">
        <button v-for="action in notificationActions" :key="action.text" :class="actionClass(action.primary)" class=" relative flex justify-center items-center"
          @click.stop="handleActionClick(action, notification)" :disabled="loadingActions[action.text]">
          <span v-if="loadingActions[action.text]" class=" absolute">
            <i class="fas fa-spinner fa-spin"></i>
          </span>
          <span class="text-xs lg:text-base">
            {{ action.text }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus.js";
export default {
  name: 'NotificationItem',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loadingActions: {}
    };
  },
  emits: ['shareAddress'],
  computed: {
    hasUnreadNotifications() {
      return this.notifications.some(notification => notification.read_at === null);
    },
    notificationLink() {
      if (this.notification.data.type === 'wishlist' && this.notification.notifier) {
        return { name: 'Wishlist', params: { id: this.notification.action?.id, username: this.notification.notifier.username } };
      } else if (this.notification.type === 'birthdays' || this.notification.type === 'friend') {
        return { name: 'UsersProfile', params: { username: this.notification.notifier?.username } };
      } else if (this.notification.data.type === 'wish' && !this.notification.notifier) {
        const user = JSON.parse(localStorage.getItem('user')); // Parse the user object from LocalStorage
        const loggedInUsername = user?.username; // Get the username from the parsed object
        return { name: 'Wishlist', params: { id: this.notification.action?.wishlist_id, username: loggedInUsername } };
      } else if (this.notification.data.type === 'wish' && this.notification.notifier) {
        return { name: 'Wishlist', params: { id: this.notification.action?.wishlist_id, username: this.notification.notifier.username } };
      }
      return null;
    },
    isNotificationRead() {
      return this.notification.read_at !== null;
    },
    notificationActions() {
      const actions = [];
      const message = this.notification.data.message;
    
      

      if (message.includes('fulfilled your wish')) {
        actions.push({ text: 'Move to archive', primary: true });
      } else if (message.includes('birthday is just around the corner')) {
        actions.push({ text: 'Check them out', primary: true });
      } else if (message.includes('birthday is today')) {
        actions.push({ text: 'View wishlist', primary: true });
      } else if (message.includes('birthday is in 1 month')) {
        actions.push({ text: 'Create wishlist', primary: true });
      } else if (message.includes('sent you a friend request')) {
        actions.push({ text: 'Accept', primary: true }, { text: 'Decline', primary: false });
      } else if (message.includes('requested your delivery address')) {
        actions.push({ text: 'Share address', primary: true }, { text: 'Cancel reservation', primary: false });
      } else if (message.includes('reserved your wish')) {
        actions.push({ text: 'Cancel reservation', primary: true });
      }

      return actions;
    }
  },
  methods: {
    navigateToUserProfile(username) {
      if (username) {
        const resolved = this.$router.resolve({ name: 'UsersProfile', params: { username } });
        window.location.href = resolved.href; // Navigate using the resolved URL
      }
    },
    async navigateTo(link) {
      console.log(this.notification);

      if (link) {
        // Send a PUT request to mark the notification as read
        try {
          await this.$axios.get(`${this.$baseURL}/notifications/${this.notification.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
          });
          console.log('Notification marked as read');
        } catch (error) {
          console.error('Error marking notification as read:', error);
        }

        const resolved = this.$router.resolve(link);
        window.location.href = resolved.href;
      }
    },
    formatDate(date) {
      const dateObj = new Date(date);
      const now = new Date();
      const diffInSeconds = Math.floor((now - dateObj) / 1000);

      const secondsInMinute = 60;
      const secondsInHour = secondsInMinute * 60;
      const secondsInDay = secondsInHour * 24;
      const secondsInMonth = secondsInDay * 30; // Approximation
      const secondsInYear = secondsInDay * 365; // Approximation

      if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < secondsInMonth) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
      } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
      }
    },
    priorityClass(priority) {
      switch (priority) {
        case 'low':
          return 'bg-[#FAFFFF] border border-[#37B1B5] text-[#37B1B5]';
        case 'medium':
          return 'bg-[#FCF8EE] border border-[#DAA520] text-[#DAA520]';
        case 'high':
          return 'bg-red-100 border border-red-600 text-red-600';
        default:
          return '';
      }
    },
    priorityIcon(priority) {
      switch (priority) {
        case 'low':
          return '/assets/gift.svg';
        case 'medium':
          return '/assets/star.svg';
        case 'high':
          return '/assets/frame-1618868307.svg';
        default:
          return '';
      }
    },
    actionClass(isPrimary) {
      return isPrimary ? 'bg-primaryColor text-white py-1 px-3 rounded-full' : 'bg-gray-200 text-gray-700 py-1 px-3 rounded-full';
    },
    handleActionClick(action, notification) {
      console.log('Action:', action, 'Notification:', notification);
    this.$emit('handleAction', { action, notification });
  

    // Instead of using $set, directly modify the object
    this.loadingActions = { ...this.loadingActions, [action.text]: true };

    // Simulate an async operation
    setTimeout(() => {
      this.loadingActions = { ...this.loadingActions, [action.text]: false };
    }, 2000); // Replace with actual async operation
  }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
