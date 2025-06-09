<template>
  <div class=" px-2 py-4 lg:p-6 bg-white inline-flex flex-col lg:flex-row space-y-2 space-x-2 lg:space-x-4 lg:items-center rounded-lg  transition-shadow duration-300 border">
    <div>
        <div :class="iconBgClass + ' w flex items-center justify-center rounded-full w-12 h-12'">
      <img :src="icon" :alt="title" class="h-6 w-6" />
    </div>
    </div>
    <div>
      <h2 class="text-xs text-gray-600 whitespace-nowrap">{{ title }}</h2>
      <p class="text-xl font-bold text-gray-900">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconBgClass: {
      type: String,
      required: true,
    }
  },
};
</script>
