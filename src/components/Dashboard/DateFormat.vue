<template>
    <div>
      <!-- Render the formatted date -->
      <span :class="classList" class="text-gray-600 font-normal ">{{ formattedDate }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      date: {
        type: String,
        required: true
      },
      classList: {
        type: String,
        required: true
      }
    },
    computed: {
      formattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.date).toLocaleDateString('en-US', options);
      }
    }
  }
  </script>
  