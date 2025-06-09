<!-- src/components/Loader.vue -->
<template>
    <div v-if="show" class="overlay">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7); /* Slightly opaque white to give a disabled effect */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; /* Ensure it's above other content */
  }
  
  .spinner {
    border: 4px solid rgba(229, 103, 248, 0.3); /* Light outer */
    border-top: 4px solid #E567F8; /* Primary color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  