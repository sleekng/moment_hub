<template>
  <h1 class="font-bold text-2xl mb-4 lg:hidden block">Privacy and safety</h1>
  <div v-if="!loading" class="w-3/4 space-y-8">
    <PrivacySection 
      v-for="(setting, index) in privacySettings" 
      :key="setting.id"
      :title="setting.title" 
      :options="setting.options"
      :selected="getSelectedIndex(setting.value, setting.options)"
      :settingId="setting.id"
      @update="updatePrivacySelection(index, $event)"
    />
  </div>
  <Loader :show="loading" />
</template>

<script>
import PrivacySection from '@/components/Dashboard/PrivacySection.vue';
import Loader from '@/components/Loader.vue';
export default {
  name: "PrivacySettings",
  components: {
    PrivacySection,
    Loader
  },
  data() {
    return {
      privacySettings: [],
      loading:false
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
        this.fetchPrivacySettings()
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;  // Stop loading
      }
    },



    async fetchPrivacySettings() {
      try {
        const response = await fetch(`${this.$baseURL}/user-privacy`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        });

        const { data } = await response.json();
        this.privacySettings = data;
      } catch (error) {
        console.error('Failed to fetch privacy settings:', error);
      }
    },
    updatePrivacySelection(index, selectedIndex) {
      // Update the settings array with new selection if additional handling is needed
      const setting = this.privacySettings[index];
      const newValue = setting.options[selectedIndex].toLowerCase();
      setting.value = newValue;
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    },
    getSelectedIndex(currentValue, options) {
      return options.findIndex(option => option.toLowerCase() === currentValue);
    }
  },

};
</script>
