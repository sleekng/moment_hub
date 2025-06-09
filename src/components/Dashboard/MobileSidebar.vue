<template>
<div class="bg-white min-h-screen">
    <div class="py-4 pb-6 border-b">
        <div class="text-lg font-semibold" style="font-family: Mukta; color: #2d3036;">
            Settings
        </div>
    </div>
    <nav class=" ">
        <div v-for="(item, index) in menuItems" :key="index" class="flex justify-between items-center  py-4 font-medium border-b cursor-pointer" :class="{ 'bg-gray-100': currentPage === item.page }" @click="selectPage(item.page)">
            <span :class="{ 'text-gray-900': currentPage === item.page, 'text-gray-700': currentPage !== item.page }" style="font-family: Mukta;">
                {{ item.label }}
            </span>
            <img src="/assets/arrow-right.svg" class="w-4 h-4" alt="arrow" />
        </div>
    </nav>
</div>
</template>

  
<script>
export default {
    name: "Sidebar",
    emits: ['pageSelected'],  // Declare emitted events
    props: ['currentPage'],
    data() {
        return {
            menuItems: [{
                    label: 'Your profile',
                    page: 'profile'
                },
                {
                    label: 'Your account',
                    page: 'account'
                },
                {
                    label: 'Password',
                    page: 'password'
                },
                {
                    label: 'Notification',
                    page: 'notification'
                },
                {
                    label: 'Privacy and safety',
                    page: 'privacy'
                },
                {
                    label: 'Delivery location',
                    page: 'delivery'
                },
            ]
        };
    },
    methods: {
        selectPage(page) {
            this.$emit('pageSelected', page);
        }
    }
};
</script>

  
<style scoped>
/* Add custom styles if needed */
</style>
