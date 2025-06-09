<template>
  <div
    class="lg:px-12 py-8 bg-white rounded-b-lg"
    @mouseleave="handleCloseDropdown"
  >
    <!-- Reserved Wishes -->

    <div class="mb-8" v-if="filteredWishes('reserved').length > 0">
      <div class="text-[18px] lg:text-2xl font-bold mb-4">
        Wishes You Reserved for Your Friends
      </div>
      <div class="flex w-full overflow-x-auto space-x-3 lg:space-x-6">
        <WishCard
          v-for="(wish, index) in filteredWishes('reserved')"
          :key="wish.id || index"
          :wish="wish"
          @deleteWish="handleDeleteWish"
          @editWish="openEditWishModal"
          @preview="preview"
          :openDropdownId="openDropdownId"
          @toggleDropdown="handleToggleDropdown"
          @closeDropdown="handleCloseDropdown"
          @markAsFulfilled="markAsFulfilled"
          @cancelReservation="cancelReservation"
          @newUpdate="newUpdate"
          class="md:w-[286px] w-40 flex-shrink-0"
          @updateSavedStatus="handleUpdateSavedStatus"
           @removeFromFulfiled="removeFromFulfiled"
           @showAddToWishlistModal="showAddToWishlistModal" 
        />
      </div>
    </div>

    <!-- Fulfilled Wishes -->
    <div class="mb-8" v-if="filteredWishes('fulfiled').length > 0">
      <div class="text-[18px] lg:text-2xl font-bold mb-4">
        Wishes You've Fulfilled for Your Friends
        <span class="hidden lg:inline">...awww</span>
      </div>
      <div class="flex w-full overflow-x-auto space-x-3 lg:space-x-6">
        <WishCard
          v-for="(wish, index) in filteredWishes('fulfiled')"
          :key="wish.id || index"
          :wish="wish"
          @deleteWish="handleDeleteWish"
          @editWish="openEditWishModal"
          @preview="preview"
          :openDropdownId="openDropdownId"
          @toggleDropdown="handleToggleDropdown"
          @closeDropdown="handleCloseDropdown"
          @removeFromFulfiled="removeFromFulfiled"
          class="md:w-[286px] w-40 flex-shrink-0"
          @newUpdate="newUpdate"
          @showAddToWishlistModal="showAddToWishlistModal" 
          
        />
      </div>
    </div>
  </div>
</template>

<script>
import WishCard from "@/components/Dashboard/WishCard.vue";
import { eventBus } from "@/eventBus.js";

export default {
  components: {
    WishCard,
  },
  props: {
    wishes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openDropdownId: null,
    };
  },
  methods: {

    showAddToWishlistModal(wish) {
        this.$emit('showAddToWishlistModal', wish);
        },

    handleUpdateSavedStatus(wishId, isSaved) {
      const wish = this.wishes.find(w => w.id === wishId);
      if (wish) {
        wish.isSaved = isSaved;
      }
      this.$emit("newUpdate");
    },
    newUpdate() {
      this.$emit("newUpdate");
    },
    async removeFromFulfiled(wishId) {
        this.$emit('removeFromFulfiled', wishId)
    },

    async markAsFulfilled(wish) {
    
      eventBus.setLoading(true);
      try {
        await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          {
            status: "fulfiled",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        wish.status = "fulfiled";
        eventBus.onSuccess("Wish marked as fulfilled.");
        this.$emit("newUpdate");
      } catch (error) {
        console.error("Error marking as fulfiled:", error);
        const errorMsg =
          error.response?.data?.message ||
          "Error marking as fulfiled. Please try again.";
        eventBus.onError(errorMsg);
      } finally {
        eventBus.setLoading(false);
      }
    },
    async cancelReservation(wish) {
      eventBus.setLoading(true); 
      try {
        const response =  await this.$axios.put(
          `${this.$baseURL}/wishes/${wish.id}`,
          { status: null },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        eventBus.onSuccess(response.data.message);
        this.$emit("newUpdate");
        wish.status = null;
      } catch (error) {
        console.error("Error canceling reservation:", error);
        const errorMsg =
          error.response?.data?.message ||
          "Error canceling reservation. Please try again.";
        eventBus.onError(errorMsg);
      } finally {
        eventBus.setLoading(false);
      }
    },

    openEditWishModal(wish) {
      this.$emit("editWish", wish);
    },
    handleDeleteWish(wishId) {
      this.$emit("deleteWish", wishId);
    },
    preview(wishId, isWishSaved) {
      this.$emit("preview", wishId, isWishSaved);
    },
    handleToggleDropdown(wishId) {
      this.openDropdownId = this.openDropdownId === wishId ? null : wishId;
    },
    handleCloseDropdown() {
      this.openDropdownId = null;
    },
    filteredWishes(status) {
      return this.wishes.filter((wish) => wish.status === status);
    },
  },
};
</script>
