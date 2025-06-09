<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" v-if="isOpen" @click="closeModal">
      <div class="bg-white rounded-xl w-[352px] p-6 flex flex-col gap-8" @click.stop>
        <div class="flex flex-col gap-5">
          <div class="w-12 h-12 bg-[#fee4e2] rounded-full flex justify-center items-center border-8 border-[#fef3f2]">
            <img src="https://dashboard.codeparrot.ai/api/image/Z9hNwCppvFKitUSk/alert-ci.png" alt="alert" class="w-6 h-6"/>
          </div>
          
          <div class="flex flex-col gap-2">
            <h2 class="font-mukta font-semibold text-lg text-[#101828]">Cancel reservation</h2>
            <p class="font-mukta font-normal text-sm text-[#667085]">
              Are you sure you want to cancel the reservation of this wish? This action cannot be undone.
            </p>
          </div>
        </div>
  
        <div class="flex gap-3">
          <button class="flex-1 h-12 rounded-full bg-[#f0f1f2] text-[#2d3036] font-mukta font-medium text-base" @click="handleNo">No</button>
          <button class="flex-1 h-12 rounded-full bg-[#e32e2e] text-white font-mukta font-medium text-base" @click="handleYes">Yes</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 
  
  export default {
    name: 'CancelReservationModal',

    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
      },
      handleNo() {
        this.$emit('cancel')
        this.closeModal()
      },
      handleYes() {
        this.$emit('confirm')
        this.closeModal()
      }
    }
  }
  </script>
  