<template>
  <div v-if="visible"  >
    <div  :class="alertBG" >
      <div :class="alertClasses">
        <i :class="iconClass" class=" text-xl"></i>
        <div class="flex-1 flex items-center gap-4">
          <span class="font-medium">{{ message }}</span>
          <div class="px-2 cursor-pointer hover:bg-gray-100 rounded">
          </div>
        </div>
        <i 
          class="fas fa-times w-4 h-4 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          @click="closeAlert"
        ></i>
      </div>
    </div>

  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';

export default {
  name: 'Alert',
  data() {
    return {
      visible: false,
      message: ''
    };
  },
  computed: {
    alertClasses() {
      return [
        'flex items-center p-3 rounded-lg gap-2',
        eventBus.type === 'success' ? 'bg-[#f6fff9] ' : 'bg-[#FFF7F7]  text-[#E32E2E]'
      ];
    },
    alertBG() {
      return [
        'rounded-lg pl-2',
        eventBus.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ];
    },
    iconClass() {
      return eventBus.type === 'success' ? 'fas fa-check-circle text-green-600' : 'fas fa-exclamation-circle  text-red-600';
    }
  },
  methods: {
    showAlert(msg) {
      this.message = msg;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 5000);
    },
    closeAlert() {
      this.visible = false;
    }
  },
  watch: {
    'eventBus.message'(newMessage) {
      if (newMessage) {
        this.showAlert(newMessage);
      }
    }
  }
};
</script>

<style scoped>
/* No additional styles needed as TailwindCSS is used */
</style>
