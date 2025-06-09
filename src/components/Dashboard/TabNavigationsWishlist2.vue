<template>
  <div class="lg:px-12 px-4 bg-white">
    <div class="flex justify-between items-center">
      <div class="flex">
        <div class="flex flex-col items-center cursor-pointer" 
             @click="switchTab('Wishes')">
          <div :class="tabClass('Wishes')" 
               class="lg:text-base text-base px-2 whitespace-nowrap lg:px-8 font-medium">
            Wishlists For You
          </div>
          <div :class="{'bg-black': activeTab === 'Wishes'}" 
               class="w-full h-1 mt-2"></div>
        </div>

        <div class="flex flex-col items-center cursor-pointer" 
             @click="switchTab('Friends')">
          <div :class="tabClass('Friends')" 
               class="lg:text-base text-base px-2 whitespace-nowrap lg:px-8 font-medium">
            Friends
          </div>
          <div :class="{'bg-black': activeTab === 'Friends'}" 
               class="w-full h-1 mt-2"></div>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-300"></div>
  </div>
</template>

<script>
export default {
  name: 'TabNavigationsWishlist2',
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    switchTab(tab) {
      this.$emit('switchTab', tab);
    },
    tabClass(tabName) {
      return {
        'text-gray-900': this.activeTab === tabName,
        'text-[#616874]': this.activeTab !== tabName
      };
    },
  },
};
</script>

<style scoped>
/* Additional styles if required */
</style>
