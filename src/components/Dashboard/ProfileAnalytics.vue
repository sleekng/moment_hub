<template>
  <div class="flex flex-col w-auto lg:p-6 bg-white rounded-2xl gap-4 sm:gap-6">
    <ProfileAnalyticsHeader 
      class="flex-grow h-auto" 
      @close="$emit('close')" 
      @dateRangeChanged="handleDateRangeChange"
    />
    <AnalyticsSummaryCards class="flex-grow h-auto" :analyticsData="analyticsData" />
    <TopPerformingWishlist class="flex-grow h-auto" :wishlists="analyticsData.top_wishlists" />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <WishPerformanceGraph 
        class="h-auto" 
        :wishData="isInitialLoad ? analyticsData.wishGraph : filteredWishData" 
        :dateRange="selectedDateRange" 
      />
      <AudiencePieChart class="h-auto" :audienceData="analyticsData.pieChart" />
    </div>
  </div>
</template>

<script>
import ProfileAnalyticsHeader from './ProfileAnalyticsHeader.vue';
import AnalyticsSummaryCards from './AnalyticsSummaryCards.vue';
import TopPerformingWishlist from './TopPerformingWishlist.vue';
import WishPerformanceGraph from './WishPerformanceGraph.vue';
import AudiencePieChart from './AudiencePieChart.vue';

export default {
  components: {
    ProfileAnalyticsHeader,
    AnalyticsSummaryCards,
    TopPerformingWishlist,
    WishPerformanceGraph,
    AudiencePieChart
  },
  props: {
    analyticsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedDateRange: '30', // Default to 30 days
      isInitialLoad: true,
      filteredWishData: {
        reserved: [],
        fulfilled: [],
        received: []
      }
    }
  },
  methods: {
    handleDateRangeChange(days) {
      this.selectedDateRange = days;
      this.isInitialLoad = false;
      this.filterWishDataForRange(days);
    },
    filterWishDataForRange(days) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days));

      // Helper function to filter data by date range
      const filterByDateRange = (dataArray) => {
        return (dataArray || []).filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      };

      // Filter each type of wish data from the original source
      this.filteredWishData = {
        reserved: filterByDateRange(this.analyticsData.wishGraph.reserved),
        fulfilled: filterByDateRange(this.analyticsData.wishGraph.fulfilled),
        received: filterByDateRange(this.analyticsData.wishGraph.received)
      };
    }
  }
};
</script>
