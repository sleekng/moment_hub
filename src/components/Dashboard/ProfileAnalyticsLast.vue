<template>
  <div class="bg-white rounded-2xl lg:p-4 mx-auto">
    <!-- Header -->
    <div class="flex items-center mb-8">
      <img src="/assets/close.svg" class="w-8 h-8 mr-4 cursor-pointer" alt="Close" @click="$emit('close')" />
      <h1 class="text-2xl font-bold text-gray-900">Profile Analytics</h1>
    </div>

    <div >
      <!-- Displaying Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <SummaryCard
          v-for="item in summaryItems"
          :key="item.title"
          :title="item.title"
          :value="item.value"
          :icon="item.icon"
          :icon-bg-class="item.bgColor"
        />
      </div>

      <!-- Wishlist Section -->
      <div  class="bg-white p-2 lg:p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Top performing wishlist</h2>
       <div v-if="hasData">
        <WishlistItem
          v-for="wishlist in analyticsData.top_wishlists"
          :key="wishlist.id"
          :title="wishlist.title"
          :img-src="wishlist.photo || '/assets/wishlist-category-placeholder.svg'"
          :likes="wishlist.likes_count"
          :views="wishlist.views_count"
          :saves="wishlist.saves_count"
          :created="new Date(wishlist.created_at).toLocaleDateString()"
          :top-wishes="wishlist.wishes"
        />
       </div>
        <div v-else class="text-center text-gray-500 h-[400px] flex flex-col justify-center items-center">
          <img src="/assets/stats.svg" alt="Icon" class="w-16 h-16 mx-auto mb-4" />
          No data to display
          <p class="mt-2">There’s currently no analytics to show.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SummaryCard from './SummaryCard.vue';
import WishlistItem from './WishlistItem.vue';

export default {
  components: {
    SummaryCard,
    WishlistItem,
  },
  props: {
    analyticsData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    summaryItems() {
      return [
        { title: 'Total Impressions', value: this.analyticsData.impressions.toLocaleString(), icon: '/assets/stat.svg', bgColor: 'bg-purple-100' },
        { title: 'Total Friends', value: this.analyticsData.friends_count.toString(), icon: '/assets/people.svg', bgColor: 'bg-blue-100' },
        { title: 'Total Likes', value: this.analyticsData.likes_count.toLocaleString(), icon: '/assets/heart-svgrepo-com-1.svg', bgColor: 'bg-red-100' },
        { title: 'Total Views', value: this.analyticsData.views.toLocaleString(), icon: '/assets/eye.svg', bgColor: 'bg-green-100' },
      ];
    },
    hasData() {
      return this.analyticsData.top_wishlists.length > 0;
    },
  }
};
</script>
