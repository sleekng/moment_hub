<template>
<div class="relative grid bg-[#EAEBED] overflow-x-auto lg:content-center  gap-16 rounded-xl px-4 py-8 lg:p-8 grid-col-1 lg:grid-cols-12 lg:justify-between lg:items-center my-6">
    <!-- Close Button -->
    <img src="/assets/close.svg" alt="Close" class="absolute top-4 right-4 h-6 w-6 cursor-pointer" />
    <!-- Text Content -->

    <div class="lg:col-span-6 lg:pl-4">
        <h1 class="text-2xl lg:text-4xl font-semibold mb-4">Every moment is a chance to spread joy and make wishes a reality!</h1>
        <p class="text-base lg:text-lg text-gray-700">Discover exciting wishes from others, and find the perfect present that will light up someone's special day.</p>
    </div>
    <!-- Animations -->
    <!--  <div class="  lg:space-x-4 lg:ml-6 lg:col-span-4  pl-10 w-[311px] pt-4 lg:pt-0 lg:w-full flex justify-end"> -->
    <div class="clearfix w-full lg:w-[400px]">
        <!-- Large Image (Top Left) -->
        <div class=" bg-white h-[244px] w-[130px] lg:w-[162px] lg:h-[252px] mr-4 rounded-l-3xl rounded-r-xl float-left  flex items-center">
            <img src="/assets/gif/dashboard-1.gif" alt="" class="w-full   object-contain ">
        </div>

        <!-- Medium Image (Top Right) -->
        <div class=" w-[183px] lg:w-[204.33px] bg-white float-left rounded-l-xl rounded-tr-3xl ">
            <img src="/assets/gif/dashboard-2.gif" alt="" class="w-full    object-contain">
        </div>

        <!-- Small Image (Bottom Left) -->
        <div class=" w-[83px] lg:w-[95.3px] bg-white float-left mt-4 mr-4 rounded-xl">
            <img src="/assets/gif/dashboard-3.gif" alt="" class="w-full h-[123px] object-cover">
        </div>

        <!-- Small Image (Bottom Right) -->
        <div class=" w-[83px] lg:w-[95.3px] bg-white float-left mt-4 rounded-l-xl  rounded-br-3xl">
            <img src="/assets/gif/dashboard-4.gif" alt="" class="w-full h-[123px] object-cover ">
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'CoverImage',
};
</script>

<style scoped>
/* Custom styles if necessary */
</style>
