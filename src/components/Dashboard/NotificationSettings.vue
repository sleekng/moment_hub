<template>
  <div v-if="!loading" class="w-3/4 space-y-16 pb-8">
    <!-- Email Notifications -->
    <div>
      <h1 class="font-bold text-2xl mb-4 lg:hidden block">Notification</h1>
      <ToggleSection 
        title="Email Notifications" 
        :options="emailNotifications"
        :selected="selectedEmailNotifications"
        :notificationIds="emailNotificationIds"
        @update="updateEmailSelections" 
      />
    </div>

    <!-- Push Notifications -->
    <div>
      <ToggleSection 
        title="Push Notifications" 
        :options="pushNotifications"
        :selected="selectedPushNotifications"
        :notificationIds="pushNotificationIds"
        @update="updatePushSelections" 
      />
    </div>
  </div>
  <Loader :show="loading" />
</template>

<script>
import ToggleSection from '@/components/Dashboard/ToggleSection.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: "NotificationSettings",
  components: {
    ToggleSection,
    Loader
  },
  data() {
    return {
      emailNotifications: [],
      pushNotifications: [],
      emailNotificationIds: [],
      pushNotificationIds: [],
      selectedEmailNotifications: [],
      selectedPushNotifications: [],
      loading: false
    };
  }, 
  async created() {
    this.loadData();
  },
  methods: {


    async loadData() {
      this.loading = true;  // Start loading
      try {
        await Promise.all([
        this.fetchNotificationSettings()
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;  // Stop loading
      }
    },



    async fetchNotificationSettings() {
      try {
        const response = await fetch(`${this.$baseURL}/notification-settings`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        });

        const { data } = await response.json();
        this.emailNotifications = data.map(item => item.title);
        this.pushNotifications = data.map(item => item.title);
        this.emailNotificationIds = data.map(item => item.id);
        this.pushNotificationIds = data.map(item => item.id);
        this.selectedEmailNotifications = data.map(item => item.email);
        this.selectedPushNotifications = data.map(item => item.push);
      } catch (error) {
        console.error('Failed to fetch notification settings:', error);
      }
    },
    updateEmailSelections(selections) {
      this.selectedEmailNotifications = selections;
    },
    updatePushSelections(selections) {
      this.selectedPushNotifications = selections;
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    }
  },

};
</script>
