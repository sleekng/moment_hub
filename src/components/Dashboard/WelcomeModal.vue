<template>
  <transition name="fade">
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-[450px] w-full relative"
        :style="{ padding: '32px 20px', borderRadius: '14px' }">
        <button @click="close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <img src="/assets/close.svg" alt="Close" class="w-6 h-6" /> 
        </button>
        <div class="flex flex-col items-center">
          <div class="clearfix w-full lg:w-[400px]">
            <!-- Large Image (Top Left) -->
            <div
              class=" bg-gray-100 h-[244px] w-[130px] lg:w-[162px] lg:h-[252px] mr-4 rounded-l-3xl rounded-r-xl float-left  flex items-center">
              <img src="/assets/gif/dashboard-1.gif" alt="" class="w-full   object-contain ">
            </div>

            <!-- Medium Image (Top Right) -->
            <div class=" w-[183px] lg:w-[204.33px] bg-gray-100 float-left rounded-l-xl rounded-tr-3xl ">
              <img src="/assets/gif/dashboard-2.gif" alt="" class="w-full    object-contain">
            </div>

            <!-- Small Image (Bottom Left) -->
            <div class=" w-[83px] lg:w-[95.3px] bg-gray-100 float-left mt-4 mr-4 rounded-xl">
              <img src="/assets/gif/dashboard-3.gif" alt="" class="w-full h-[123px] object-cover">
            </div>

            <!-- Small Image (Bottom Right) -->
            <div class=" w-[83px] lg:w-[95.3px] bg-gray-100 float-left mt-4 rounded-l-xl  rounded-br-3xl">
              <img src="/assets/gif/dashboard-4.gif" alt="" class="w-full h-[123px] object-cover ">
            </div>
          </div>

          <div class=" mt-4">
            <h2 class="text-center font-semibold text-lg mb-2"
              style="font-family: Mukta; font-weight: 600; font-size: 22px; line-height: 120%; color: #121212;">
              Every moment is a chance to spread joy and make wishes a reality!
            </h2>
            <p class="text-center text-gray-600"
              style="font-family: Mukta; font-weight: 400; font-size: 16px; line-height: 150%; color: #616874;">
              Discover exciting wishes from others, and find the perfect present that will light up someone's special
              day.
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>