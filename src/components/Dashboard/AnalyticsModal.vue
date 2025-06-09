<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-gray-900 bg-opacity-50 px-4 ]">
    <div class="bg-white rounded-2xl shadow-2xl h-auto p-4 lg:p-6 w-full lg:w-[1200px]">
      <ProfileAnalytics 
        :analyticsData="analyticsData" 
        @close="closeModal" 
      />
    </div>
  </div>
</template>

<script>
import ProfileAnalytics from './ProfileAnalytics.vue';

export default {
  components: {
    ProfileAnalytics
  },
  props: {
    analyticsData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>
