<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
    <!-- Total Impressions -->
    <div class="bg-[#fdebff] rounded-lg p-2 sm:p-7">
      <div class="flex flex-row gap-2 sm:gap-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e567f8] flex items-center justify-center">
          <i class="fas fa-chart-bar text-lg sm:text-xl text-white"></i>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-[#575757] text-xs sm:text-sm font-normal">Total Impressions</span>
          <span class="text-[#121212] text-xl sm:text-2xl font-semibold">{{ analyticsData.impressions }}</span>
        </div>
      </div>
    </div>

    <!-- Total Friends -->
    <div class="bg-[#dffeff] rounded-lg p-2 sm:p-7">
      <div class="flex flex-row gap-2 sm:gap-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#47e3e8] flex items-center justify-center">
          <i class="fas fa-user-friends text-lg sm:text-xl text-white"></i>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-[#575757] text-xs sm:text-sm font-normal">Total Friends</span>
          <span class="text-[#121212] text-xl sm:text-2xl font-semibold">{{ analyticsData.friends_count }}</span>
        </div>
      </div>
    </div>

    <!-- Total Likes -->
    <div class="bg-[#feebeb] rounded-lg p-2 sm:p-7">
      <div class="flex flex-row gap-2 sm:gap-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e32e2e] flex items-center justify-center">
          <i class="fas fa-heart text-lg sm:text-xl text-white"></i>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-[#575757] text-xs sm:text-sm font-normal">Total Likes</span>
          <span class="text-[#121212] text-xl sm:text-2xl font-semibold">{{ analyticsData.likes_count }}</span>
        </div>
      </div>
    </div>
    

    <!-- Total Views -->
    <div class="bg-[#e2f5ff] rounded-lg p-2 sm:p-7">
      <div class="flex flex-row gap-2 sm:gap-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#37b1b5] flex items-center justify-center">
          <i class="fas fa-eye text-lg sm:text-xl text-white"></i>
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="text-[#575757] text-xs sm:text-sm font-normal">Total Views</span>
          <span class="text-[#121212] text-xl sm:text-2xl font-semibold">{{ analyticsData.views }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsSummaryCards',
  props: {
    analyticsData: {
      type: Object,
      required: true
    }
  }
}
</script>
