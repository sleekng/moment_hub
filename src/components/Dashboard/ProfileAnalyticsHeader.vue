<template>
  <div class="flex flex-col sm:flex-row items-center justify-between w-full h-auto sm:h-[42px] gap-2 sm:gap-4">
    <div class="flex flex-row items-center w-full gap-2 sm:gap-4">
      <i class="fas fa-times text-xl cursor-pointer" @click="$emit('close')"></i>
      <h1 class="text-xl sm:text-2xl font-bold text-[#121212]">Profile Analytics</h1>
    </div>
    <div class="flex flex-row items-center w-full justify-between sm:justify-end gap-2 sm:gap-4">
      <span class="text-sm sm:text-base font-medium text-[#2d3036]">{{ dateRangeText }}</span>
      <div class="relative">
        <div 
          class="flex flex-row items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 border border-[#e0e1e4] rounded-lg cursor-pointer"
          @click="toggleDropdown"
        >
          <span class="text-sm sm:text-base text-[#4c515b]">{{ selectedRange.label }}</span>
          <i class="fas fa-chevron-down text-xs" :class="{ 'transform rotate-180': isDropdownOpen }"></i>
        </div>
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-[#e0e1e4] rounded-lg shadow-lg z-10">
          <div 
            v-for="range in dateRanges" 
            :key="range.value"
            class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            @click="selectDateRange(range)"
          >
            <span class="text-sm text-[#4c515b]">{{ range.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileAnalyticsHeader',
  data() {
    return {
      isDropdownOpen: false,
      selectedRange: { label: 'Last 30 days', value: '30' },
      dateRanges: [
        { label: 'Last 7 days', value: '7' },
        { label: 'Last 30 days', value: '30' },
        { label: 'Last 90 days', value: '90' },
        { label: 'Last year', value: '365' }
      ]
    }
  },
  computed: {
    dateRangeText() {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(this.selectedRange.value));
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectDateRange(range) {
      this.selectedRange = range;
      this.isDropdownOpen = false;
      this.$emit('dateRangeChanged', range.value);
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false;
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>
