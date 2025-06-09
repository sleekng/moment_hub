<template>
<!-- Wishes Grid -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6  lg:px-12 py-6 pb-12 bg-white rounded-b-lg" @mouseleave="handleCloseDropdown">
    <WishCard  @cancelReservation="cancelReservation"     @showAddToWishlistModal="showAddToWishlistModal" v-for="(wish, index) in wishes" :status="'saved'" :key="index" :wish="wish" @preview="preview"   @reserveWish="reserveWish" :openDropdownId="openDropdownId" @toggleDropdown="handleToggleDropdown" @closeDropdown="handleCloseDropdown" @newUpdate="newUpdate"  @reserved="newUpdate"   :isReserving="isReserving"                @removeFromFulfiled="removeFromFulfiled" />
</div>
</template>

<script>
import WishCard from '@/components/Dashboard/WishCard.vue';

export default {
    components: {
        WishCard,
    },

    props: {

        isReserving:{
            type: Boolean,
            default: false,
        },

        wishes: {
    type: Array, // Ensure it's expected to be an array
    default: () => [] // Default to an empty array if not provided
  }
},


    data() {
        return {
            openDropdownId: null, // Track which dropdown is open by its ID
        };
    },

    methods: {

        showAddToWishlistModal(wish) {
        this.$emit('showAddToWishlistModal', wish);
        },


        async reserveWish(wish) {
           
            this.$emit('reserveWish',wish);
        },
        async cancelReservationh(wish) {

            return alert('cancelReservation');
           
            this.$emit('cancelReservation',wish);
        },

        handleUpdateSavedStatus(wishId, isSaved) {
      const wish = this.wishes.find(w => w.id === wishId);
      if (wish) {
        wish.isSaved = isSaved;
        
      }
    },
        newUpdate(){
            this.$emit('newUpdate');
        },
        preview(wishId, isWishSaved) {
        this.$emit('preview', wishId, isWishSaved)
        },
        handleToggleDropdown(wishId) {
            this.openDropdownId = this.openDropdownId === wishId ? null : wishId;
        },

        handleCloseDropdown() {
            this.openDropdownId = null;
        },

        filteredWishes(status) {
            return this.wishes.filter(wish => wish.status === status);
        },
    },
};
</script>

<style scoped>
/* Optional: Add some styles for the scrollable area */
.flex {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}

.flex::-webkit-scrollbar {
    height: 6px;
}

.flex::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
}

.flex::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}
</style>
