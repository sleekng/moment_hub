<template>
  <div class="flex flex-col items-center">
    <div
      class="relative w-20 h-20 lg:w-32 lg:h-32 bg-gray-100 rounded-lg flex items-center overflow-hidden justify-center mb-2"
    >
      <img :src="image" :alt="title" class="object-cover h-full" />
      <div
        v-if="isSelected"
        class="absolute inset-0 flex items-center justify-center bg-[#f865ce] bg-opacity-50"
      >
        <img
          src="/assets/check-white.svg"
          alt="Selected"
          class="w-10 h-10"
        />
      </div>
    </div>
    <p class="text-gray-800 text-xs lg:text-sm font-medium">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
    isSelected: Boolean,
  },
};
</script>

<style scoped>
.w-32 {
  width: 8rem;
}
.h-32 {
  height: 8rem;
}
</style>
