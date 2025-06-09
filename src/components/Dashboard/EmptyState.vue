<template>
  <div class="flex justify-center items-center h-[400px] w-full bg-white">
    <div class="flex flex-col items-center justify-center p-6" style="width: 352px;">
      <img src="/assets/gift-empty.svg" alt="Gift Box" class="w-[83.32px] h-[93.92px] mb-[20px]" />
      <div class="text-center">
        <h2 class="text-[#2d3036ff] font-semibold lg:text-[22px]">{{ title }}</h2>
        <p class="text-[#616874ff] mt-[4px] text-[16px]"><span class=" font-bold">{{ userOwnsWishlist ? '' : currentUserUsername }}</span> {{ message }}</p>
      </div>
      <button 
        v-if="showButton && userOwnsWishlist"
        @click="buttonAction"
        class="mt-[20px] bg-[#e157f5ff] text-white font-medium text-[18px] py-[6px] px-[24px] rounded-full"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      required: true,
    },
    currentUserUsername: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String
    },
    userOwnsWishlist: { 
      type: Boolean, 
      default: false 
    },
  },
  methods: {
    buttonAction() {
      this.$emit('button-click');
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
