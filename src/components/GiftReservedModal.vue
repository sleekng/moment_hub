<template>
    <div
      class="fixed overflow-y-auto inset-0 flex items-center justify-center bg-gray-800 p-4 bg-opacity-50 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
        <div class="bg-purple-100 flex justify-center items-center h-52">
          <img
            :src="imageSrc"
            :alt="imageAlt"
            class="w-auto h-full"
          />
        </div>
        <div class="px-6 py-4">
          <h2 class="text-center text-xl font-semibold text-gray-800 mb-1">
            {{ title }}
          </h2>
          <p class="text-center text-gray-600 text-sm">
            {{ description }}
          </p>
        </div>
        <div class="px-4 py-4 border-t">
          <div v-if="updateType == 'created'" class="flex justify-between">
            <button
              @click="viewWish"
              class="flex-1  text-gray-800 bg-[#F0F1F2] hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
            >
            View Wishlist
            </button>
            <button
              @click="makeAWish"
              class="flex-1 ml-2 text-white bg-primaryColor hover:shadow-lg transition-all font-medium py-3 px-4 rounded-full text-center focus:outline-none"
            >
            Add New Wish
            </button>
            
          </div>

          <div  class="flex justify-between space-x-2">
            <button @click="hasAddress" :disabled="isHasAddress" :class="[
                  'px-8 py-3  rounded-full relative flex-1 w-1/2',
                  isHasAddress
                    ? 'bg-[#F0F1F2] text-gray-800 font-medium hover:shadow-lg cursor-not-allowed flex-1   transition-all  py-2 px-2 rounded-full text-center focus:outline-none'
                    : 'bg-[#F0F1F2] text-gray-800 font-medium hover:shadow-lg flex-1   transition-all  py-2 px-2 rounded-full text-center focus:outline-none',
                ]">
                            <span class="w-full flex justify-center">
                                <span v-if="isHasAddress" class="  absolute ">
                                    <i class="fas fa-spinner fa-spin "></i>
                                </span>
                                I have address
                            </span>
            </button>
            <button @click="requestAddress" :disabled="isRequestingAddress" :class="[
                  'px-4 py-2  rounded-full  relative flex-1 w-1/2',
                  isRequestingAddress
                    ? 'bg-primaryColor text-white hover:shadow-lg py-2 px-4 cursor-not-allowed'
                    : 'bg-primaryColor text-white hover:shadow-lg py-2 px-4',
                ]">
                            <span class="w-full flex justify-center">
                                <span v-if="isRequestingAddress" class="  absolute ">
                                    <i class="fas fa-spinner fa-spin "></i>
                                </span>
                                Request Address
                            </span>
                        </button>
          </div>


        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'GiftReservedModal',
    props: {
      wish:{
        type: Object, 
      },
      title: {
        type: String,
        default: 'Gift Reserved!',
      },
      description: {
        type: String,
        default: ' Awwwn..You’ve just made someone\'s day brighter! Don\'t forget to fulfill this wish!',
      },
      imageSrc: {
        type: String,
        default: '/assets/gif/Gift_animation.gif',
      },
      updateType: {
        type: String,
      },
      imageAlt: {
        type: String,
        default: 'Wish Created',
      },

      isRequestingAddress:{
          type:Boolean,
        },
      isHasAddress:{
          type:Boolean,
        }

    },
    emits: ['close', 'requestAddress'],

    methods:{
      requestAddress() {
          this.$emit('requestAddress',this.wish.id)
        },
      hasAddress() {
          this.$emit('hasAddress',this.wish.id)
        },
    }
  };
  </script>
  