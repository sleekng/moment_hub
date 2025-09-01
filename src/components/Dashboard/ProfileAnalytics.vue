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
    </div>/
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
    async handleDateRangeChange(startDate) {
      this.selectedDateRange = startDate;
      this.isInitialLoad = false;
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` };
        const [analyticsResponse, pieChartResponse, wishGraphResponse] = await Promise.all([
          this.$axios.get(`${this.$baseURL}/analytics?start_date=${startDate}`, { headers }),
          this.$axios.get(`${this.$baseURL}/analytics/pie-chart`, { headers }),
          this.$axios.get(`${this.$baseURL}/analytics/wish-graph?start_date=${startDate}`, { headers })
        ]);
        this.$emit('update:analyticsData', {
          ...analyticsResponse.data.data,
          pieChart: pieChartResponse.data.data,
          wishGraph: wishGraphResponse.data.data
        });
        console.log('Emitted updated analyticsData');
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    }
  }
};
</script>
