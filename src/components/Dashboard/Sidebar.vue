<template>
    <div class="w-1/4">
      <nav class="space-y-6">
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'profile' }"
          @click="selectPage('profile')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'profile', 'text-gray-500': currentPage !== 'profile' }">Your profile</span>
        </div>
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'account' }"
          @click="selectPage('account')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'account', 'text-gray-500': currentPage !== 'account' }">Your account</span>
        </div>
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'password' }"
          @click="selectPage('password')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'password', 'text-gray-500': currentPage !== 'password' }">Password</span>
        </div>
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'notification' }"
          @click="selectPage('notification')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'notification', 'text-gray-500': currentPage !== 'notification' }">Notification</span>
        </div>
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'privacy' }"
          @click="selectPage('privacy')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'privacy', 'text-gray-500': currentPage !== 'privacy' }">Privacy and safety</span>
        </div>
        <div
          class="flex items-center gap-4 px-2 cursor-pointer"
          :class="{ 'border-black border-l-2': currentPage === 'delivery' }"
          @click="selectPage('delivery')"
        >
          <span :class="{ 'text-gray-900 font-medium': currentPage === 'delivery', 'text-gray-500': currentPage !== 'delivery' }">Delivery location</span>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
    props: ['currentPage'],
    methods: {
      selectPage(page) {
        this.$emit('pageSelected', page);
      }
    }
  };
  </script>
  