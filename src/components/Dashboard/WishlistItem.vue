<template>
  <div class="flex flex-col md:flex-row p-4 rounded-lg bg-white border mb-4 overflow-y-auto">
    <div class="w-36 h-36">
      <img :src="imgSrc" alt="Wishlist Image" class="w-full h-full rounded-xl object-cover bg-slate-300">
    </div>
    <div class="grid lg:grid-cols-12 lg:gap-6 grid-cols-1 w-full items-center">
      <!-- First Column with Vertical Border -->
      <div class="flex-1 flex w-full flex-col justify-between space-y-2 lg:space-y-8 col-span-4 lg:px-6 pb-4 lg:pb-0 lg:border-r">
        <div class="w-full">
          <h2 class="lg:text-lg mt-2 font-semibold text-gray-900 place-items-start">{{ title }}</h2>
        </div>
        <div class="flex justify-between space-x-3   lg:space-x-8 md:space-x-4">
          <div>
            <p class="text-sm text-gray-500 mb-2">Likes</p>
            <p class="lg:text-xl font-bold text-gray-900">{{ likes ? likes : 0 }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Views</p>
            <p class="lg:text-xl font-bold text-gray-900">{{ views ? views : 0 }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Saves</p>
            <p class="lg:text-xl font-bold text-gray-900">{{ saves ? saves : 0 }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Created</p>
            <p class="lg:text-xl font-bold text-gray-900">{{ created }}</p>
          </div>
        </div>
      </div>
      
      <!-- Second Column -->
      <div class="flex flex-1 flex-col col-span-8 justify-between space-y-2 mt-4 lg:mt-0">
        <div v-if="topWishes.length" class="text-gray-500 text-lg font-semibold pr-4 justify-self-start">Top wishes</div>
        <div v-if="topWishes.length" class="flex space-x-2 lg:space-x-8 overflow-x-auto w-full h-full">
          <div v-for="wish in topWishes" :key="wish.id" class="relative ">
            <div class="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden lg:w-24 lg:h-24 w-16 h-16 object-cover relative card group">
              <div class="relative">
                <img :src="wish.photo || '/assets/wishlist-category-placeholder.svg'" alt="Wishlist Item" class=" object-cover w-16 h-16">
              </div>
              <!-- Wish Detail -->
              <div class="absolute bottom-0 left-0 p-1 bg-gradient-to-t from-black z-50 to-transparent w-full text-white">
                <h2 class="text-[8px] font-semibold ">
                  <span class="hidden lg:inline">{{ wish.name.split(' ').slice(0, 3).join(' ') }}{{ wish.name.split(' ').length > 3 ? '...' : '' }}</span>
                  <span class="lg:hidden">{{ wish.name.split(' ').slice(0, 2).join(' ') }}{{ wish.name.split(' ').length > 2 ? '...' : '' }}</span>
                </h2>

                <div class="flex justify-between items-center mt-1">
                  <div class="flex items-center">
                    <img src="/assets/heart.svg" alt="Likes" class="w-3 h-3 mr-2">
                    <span class="text-[9px]">{{ likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          No Wish has been created for this Wishlist
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    imgSrc: { type: String, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true },
    saves: { type: Number, required: true },
    created: { type: String, required: true },
    topWishes: { type: Array, required: true },
  },
};
</script>
