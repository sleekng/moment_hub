<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg px-6 py-4 w-80 shadow-lg">

      <div class="flex items-center space-x-3 mb-4">
        <div class="bg-red-100 p-2 rounded-full">
          <img src="/assets/alert-circle.svg" alt="Alert" class="w-6 h-6">
        </div>
        <h3 class="text-lg font-semibold text-gray-900">Delete {{ title }}</h3>
      </div>

      <p class="text-gray-600 mb-4">{{ description }}</p>

      <div class="flex space-x-4 justify-end">
        <button @click="$emit('cancel')" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">Cancel</button>
        <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded-full">Delete</button>
      </div>

    </div>
  </div>
</template>


<script>
  export default {
    props: {
      title: String,
      description: String
      }
    
  }
</script>

<style lang="scss" scoped>

</style>