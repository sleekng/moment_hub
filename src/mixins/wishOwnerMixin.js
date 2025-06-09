// src/mixins/wishOwnerMixin.js
export const wishOwnerMixin = {
  computed: {
    currentUser() {
      return JSON.parse(localStorage.getItem('user')) || {};
    },
    isWishOwner() {
      if (!this.wish) return false;
      return this.wish.wishlist?.user_id === this.currentUser.id;
    },
  },
};
