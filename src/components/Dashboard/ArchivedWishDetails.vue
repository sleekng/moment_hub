<template>
<div class="lg:flex hidden bg-white shadow-lg rounded-t-lg mt-10 p-6 space-x-8 py-10 px-12 items-center">
    <!-- Image Section -->
    <div class="w-64 h-64 bg-gray-100 rounded overflow-hidden">
        <img src="/assets/wishlist-category-placeholder.svg" alt="Wishlist" class="object-cover w-full h-full">
    </div>

    <!-- Details Section -->
    <div class="flex-1 space-y-4">
        <div class="flex items-center space-x-2">
            <span class="bg-pink-100 text-primaryColor text-sm font-medium px-3 py-1 rounded-full">Birthday wishlist</span>
            <span class="text-xl font-semibold text-gray-900">24th Birthday</span>
        </div>
        <p class="text-gray-600">Hello there! Here's my birthday wishlist.</p>

        <!-- Date and Status -->
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 bg-primaryColor text-white px-3 py-2 rounded-full">
                <div class="bg-white text-primaryColor rounded-full h-[28px] w-[28px] flex items-center justify-center">
                    <span>{{
              date }}</span>
                </div>
                <span>May, 2024</span>
            </div>
            <div class="flex items-center space-x-2 bg-gray-100 text-green-600 px-3 py-2 rounded-full">
                <img src="/assets/checkmark.svg" alt="Checkmark" class="w-5 h-5">
                <span>All birthday wishes have been fully granted!</span>
            </div>
        </div>

        <!-- Likes and Views -->
        <div class="flex space-x-8">
            <div class="flex items-center space-x-1 text-gray-500">
                <img src="/assets/heart.svg" alt="Likes" class="w-4 h-4">
                <span>200 Likes</span>
            </div>
            <div class="flex items-center space-x-1 text-gray-500">
                <img src="/assets/eye.svg" alt="Views" class="w-4 h-4">
                <span>200 Views</span>
            </div>
        </div>
    </div>

    <!-- Restore Button -->
    <div class="flex self-start items-start mt-6">
        <button class="bg-gray-200 text-gray-700 px-6 py-2 rounded-full">Restore wishlist</button>
    </div>
</div>

<div class="bg-white lg:hidden block relative  px-6 py-10 max-w-sm md:max-w-xl mx-auto">
    <!-- Image Section -->
    <div class="flex justify-center mb-6">
        <div class="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
            <img src="/assets/wishlist-category-placeholder.svg" alt="Wishlist" class="object-cover w-full h-full">
        </div>
    </div>

    <!-- Tag, Title, and Description -->
    <div class="text-center mb-6">
        <span class="bg-pink-100 text-primaryColor text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
            Birthday wishlist
        </span>
        <div class="text-lg font-semibold text-gray-900">24th Birthday</div>
        <p class="text-gray-600 text-sm">Hello there! Here's my birthday wishlist.</p>
    </div>

    <!-- Date and Status -->
    <div class="flex justify-center mb-6">
        <div class="flex items-center space-x-2 bg-primaryColor text-white px-4 py-2 rounded-full">
            <div class="bg-white text-primaryColor rounded-full h-6 w-6 flex items-center justify-center">
                <span class="text-sm font-medium">{{ date }}</span>
            </div>
            <span class="text-sm">May, 2024</span>
        </div>
    </div>
    <div class="flex justify-center items-center mb-6">
        <div class="flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full">
            <img src="/assets/checkmark.svg" alt="Checkmark" class="w-4 h-4">
            <span class="text-sm">All birthday wishes have been fully granted!</span>
        </div>
    </div>

    <!-- Likes and Views -->
    <div class="flex justify-center space-x-8 mb-6">
        <div class="flex items-center space-x-1 text-gray-500">
            <img src="/assets/heart.svg" alt="Likes" class="w-4 h-4">
            <span class="text-sm">200 Likes</span>
        </div>
        <div class="flex items-center space-x-1 text-gray-500">
            <img src="/assets/eye.svg" alt="Views" class="w-4 h-4">
            <span class="text-sm">200 Views</span>
        </div>
    </div>

    <!-- Menu -->
    <div class="absolute top-4 right-4">
        <button class="bg-gray-100 rounded-full p-2">
            <img src="/assets/frame-1618868216.svg" alt="Menu" class="w-4 h-4">
        </button>
    </div>
</div>
</template>

  
<script>
export default {
    name: "ArchivedWishDetails",
    data() {
        return {
            date: "23"
        };
    }
};
</script>

  
<style scoped>
/* Custom styles if needed */
</style>
