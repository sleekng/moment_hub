<template>
  <div class="lg:px-12 px-4 py-8 bg-white rounded-b-lg" @mouseleave="handleCloseDropdown">
    <!-- Trending Wishlist Everyone's Talking About! -->
    <div v-if="activeTab === 'Wishes' && wishlists.trending" class="mb-8">
      <div class="lg:text-2xl text-lg font-bold mb-4">Trending Wishlist Everyone's Talking About!</div>
      <div class="flex w-full overflow-x-auto space-x-6">
        <WishlistCard v-for="wishlist in wishlists.trending" :user="wishlist.user" @shareWishlist="shareWishlist"
          :key="wishlist.id" :wishlist="wishlist" :openDropdownId="openDropdownId"
          @toggleDropdown="handleToggleDropdown" @closeDropdown="handleCloseDropdown" class="w-[286px] flex-shrink-0" />
      </div>
    </div>

    <!-- Recently Added Wishlist You Can't Miss -->
    <div v-if="(activeTab === 'Wishes' || activeTab === 'Friends') && wishlists.recent.length > 0" class="mb-8">
      <div class="lg:text-2xl text-lg font-bold mb-4">Recently Added Wishlist You Can't Miss</div>
      <div class="flex w-full overflow-x-auto space-x-6">
        <WishlistCard v-for="wishlist in wishlists.recent" @shareWishlist="shareWishlist" :user="wishlist.user"
          :key="wishlist.id" :wishlist="wishlist" :openDropdownId="openDropdownId"
          @toggleDropdown="handleToggleDropdown" @closeDropdown="handleCloseDropdown" class="w-[286px] flex-shrink-0" />
      </div>
    </div>

    <!-- Its Raining Birthdays -->
    <div v-if="(activeTab === 'Wishes' || activeTab === 'Friends') && wishlists.birthdays.length > 0" class="mb-8">
      <div class="lg:text-2xl text-lg font-bold mb-4">It's Raining Birthdays</div>
      <div class="flex w-full overflow-x-auto space-x-6">
        <WishlistCard v-for="wishlist in wishlists.birthdays" @shareWishlist="shareWishlist" :user="wishlist.user"
          :key="wishlist.id" :wishlist="wishlist" :openDropdownId="openDropdownId"
          @toggleDropdown="handleToggleDropdown" @closeDropdown="handleCloseDropdown" class="w-[286px] flex-shrink-0" />
      </div>
    </div>

    <!-- Wishes You Reserved For Your Friends -->
    <!--  <div v-if="activeTab === 'Friends' && wishlists.reserved_wishes.length >0" class="mb-8">
        <div class="lg:text-2xl text-lg font-bold mb-4">Wishes You Reserved For Your Friends</div>
        <div class="flex w-full overflow-x-auto space-x-6">
          <WishCard 
          v-for="(wish, index) in wishlists.reserved_wishes" 
          :key="wish.id || index" 
          :wish="wish" 
          @deleteWish="handleDeleteWish"  
          @editWish="openEditWishModal" 
          @preview="preview" 
          :openDropdownId="openDropdownId" 
          @toggleDropdown="handleToggleDropdown" 
          @closeDropdown="handleCloseDropdown" 
          class="md:w-[286px] w-40 flex-shrink-0" 
        />
        </div>
      </div> 

       -->


  </div>
</template>

<script>
import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
import WishCard from '@/components/Dashboard/WishCard.vue';

export default {
  components: {
    WishlistCard,
    WishCard
  },
  props: {
    wishlists: {
      type: Object,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openDropdownId: null,
    };
  },
  methods: {
    shareWishlist(wishlistId, wishlistUser) {
      this.$emit('shareWishlist', wishlistId, wishlistUser);
    },
    preview(wishId) {
      this.$emit('preview', wishId);
    },
    handleToggleDropdown(wishId) {
      this.openDropdownId = this.openDropdownId === wishId ? null : wishId;
    },
    handleCloseDropdown() {
      this.openDropdownId = null;
    },
  },
};
</script>

<style scoped>
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