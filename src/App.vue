<template>
  <div v-if="isLoading" class="progress-bar"></div>
  <Alert ref="alertComponent" class=" fixed top-4 right-2 lg:top-10 lg:right-10 z-[9999999999]" />
  <div :class="{ 'blurred-content': isLoading }">
    <!-- SEO Headings - Hidden but accessible to screen readers -->
    <h1 class="sr-only">Moment Hub - Create and Share Your Perfect Wishlist</h1>
    <h2 class="sr-only">Create and share your perfect wishlist with Moment Hub. Make gifting easy and meaningful for birthdays, holidays, or any special occasion</h2>

    <!-- Internal Navigation Links -->
    <nav class="sr-only" aria-label="Main navigation">
      <ul>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/privacy">Privacy Policy</router-link></li>
        <li><router-link to="/terms-condition">Terms & Conditions</router-link></li>
      </ul>
    </nav>

    <AppHeader @showCategoryModal="showCategoryModal = true" @navigateToAddressSettings="setCurrentPage('delivery')" />
    <RouterView
      @shareWishlist="toggleShareMenu"
      @showCreateWishlistModal="openCreateWishlistModal"
      @showCategoryModal="showCategoryModal = true"
      :showNotifications=" showNotifications" 
      @hideNotification = "showNotifications = true"
    />

    <CategoryPopup
      v-if="showCategoryModal"
      @close="closeCategoryModal"
      @showCreateWishlistModal="openCreateWishlistModal"
    />

    <!-- Share Modal -->
    <div
      v-if="isShareMenuOpen"
      class="fixed left-0 inset-0 flex items-center p-4 justify-center bg-black bg-opacity-50 z-[100]"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          @click="toggleShareMenu"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="flex space-x-4 items-center pb-2">
          <span class="font-bold text-lg">Share with friends</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
          <button
            @click="copyLink"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
          <button
            @click="shareToEmail"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-envelope"></i>
            <span>Share to Email</span>
          </button>
          <button
            @click="shareToWhatsApp"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-whatsapp"></i>
            <span>Share to Whatsapp</span>
          </button>
          <button
            @click="shareToTwitter"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-twitter"></i>
            <span>Share to Twitter</span>
          </button>
          <div class="lg:col-span-2 lg:inline-flex lg:justify-center w-full">
            <button
              @click="shareToFacebook"
              class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg lg:w-auto w-full"
            >
              <i class="fab fa-facebook"></i>
              <span>Share to Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <CreateWishlistModal
      v-if="showCreateWishlistModal"
      :selectedCategory="selectedCategory"
      :wishlist="editingWishlist"
      @createWishList="createdWishList"
      @updateWishList="UpdatedWishList"
      @close="closeCreateWishlistModal"
    />
    

    <CreatedWishlistModal
      v-if="wishlistCreated || wishlistUpdated"
      :wishlistUpdated="wishlistUpdated"
      @shareWishlist="toggleShareMenu"
      :title="modalTitle"
      :description="modalDescription"
      :createdWishlistId="createdWishlistId"
      @viewWishlist="viewCreatedWishlist"
      @makeAWish="openCreateWishModal"
      :viewWishlistText="viewWishlistText"
      :makeAWishText="makeAWishText"
    />

    <CreatedWishModal
      @closeCreatedModal="closeCreatedModal"
      v-if="wishCreated || wishUpdated"
      :title="WishmodalTitle"
      :description="WishmodalDescription"
      :createdWishId="createdWishId"
      @viewWish="viewCreatedWish"
      @makeAWish="openCreateWishModal"
      :updateType="updateType"
    />

    <CreateWishModal
      v-if="showCreateWishModal"
      @createWish="createdWish"
      :selectedWishlist="currentWishlist"
      @updateWish="UpdatedWish"
      :wishlistId="currentWishlistId"
      @close="closeCreateWishModal"
    />
  </div>
</template>

<script>
import CreatedWishModal from "@/components/Dashboard/CreatedWishModal.vue";
import CreateWishModal from "@/components/Dashboard/CreateWishModal.vue";
import { onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import CreateWishlistModal from "@/components/Dashboard/CreateWishlistModal.vue";

import { isTokenExpired } from "@/router/index.js"; // Import the function
import Alert from "@/components/Alert.vue";
import { eventBus } from "@/eventBus.js";
import CategoryPopup from "@/components/Dashboard/CategoryPopup.vue";
import CreatedWishlistModal from "./components/Dashboard/CreatedWishlistModal.vue";
import AppHeader from '@/components/Dashboard/AppHeader.vue';

export default {
  components: {
    CreateWishlistModal,
    CategoryPopup,
    Alert,
    CreatedWishlistModal,
    CreateWishModal,
    CreatedWishModal,
    AppHeader
  },
  data() {
    return {
      wishCreated: false,
      wishUpdated: false,
      wishlistUser:null,
      isShareMenuOpen: false,
      updateType: null,
      showCategoryModal: false,
      showCreateWishlistModal: false,


      isLoading: false,
      selectedCategory: null,
      editingWishlist: null,
      wishlistCreated: false,
      wishlistCreated: false,
      wishlistUpdated: false,
      createdWishlistId: null,
      currentWishlistId: null,
      currentWishlist: null,
      showCreateWishModal: false,
      user: null,
      showNotifications: false, // Add this line
    };
  },
  computed: {

    modalTitle() {
      return this.wishlistCreated
        ? "New Wishlist Created! ✨"
        : "Wishlist Updated! ✨";
    },
    modalDescription() {
      return this.wishlistCreated
        ? "Your wishlist is live and ready to shine! Start adding those dream wish items and share it with friends to get the gifts you've been wishing for."
        : "Your wishlist is looking more fabulous already! Don't forget to share your newly updated wishlist with your friends.";
    },
    viewWishlistText() {
      return this.wishlistCreated ? "View Wishlist" : "Maybe Later";
    },
    makeAWishText() {
      return this.wishlistCreated ? "Make a Wish" : "Share with Friends";
    },
  },
  mounted() {
    onMounted(() => {
      eventBus.setLoading(false);
    });

    watch(
      () => eventBus.loading,
      (newValue) => {
        this.isLoading = newValue;
      }
    );

    watch(
      () => eventBus.message,
      (newMessage) => {
        if (newMessage) {
          this.successMessage = newMessage;
          this.$refs.alertComponent.showAlert(newMessage);

             // Clear the message after showing it
             eventBus.message = null;
        }
      }
    );

    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }

    eventBus.onError = this.handleError;

    document.addEventListener('click', this.handleGlobalClick);
  },
  beforeDestroy() {
    // Remove event listener
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {


    handleGlobalClick(event) {

      if(this.showNotifications ===true){
        console.log('workingin');
        
        this.showNotifications = false;
      }
    },

    closeCreateWishModal(){
      this.showCreateWishModal = false
    },
    async fetchWishlistDetails(wishlistId) {
      try {
        const response = await this.$axios.get(`${this.$baseURL}/wishlists/${wishlistId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        this.currentWishlist = response.data.data;
      } catch (error) {
        console.error('Error fetching wishlist details:', error);
      }
    },

    
    toggleShareMenu(wishlistId, wishlistUser) {
      this.currentWishlistId = wishlistId;
      this.wishlistUser = wishlistUser
      this.isShareMenuOpen = !this.isShareMenuOpen;
    },
    copyLink() {
      navigator.clipboard
        .writeText(
          `${this.$website}/wishlist/${this.currentWishlistId}/${this.wishlistUser}`
        )
        .then(() => {
          eventBus.onSuccess("Wishlist link copied to clipboard!");
        });
    },
    shareToEmail() {
      const subject = encodeURIComponent(
        `Check out this Wishlist: ${this.user.username}`
      );
      const body = encodeURIComponent(
        `${this.$website}/wishlist/${this.currentWishlistId}/${this.user.username}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      const text = encodeURIComponent(
        `Check out this Wishlist: ${this.$website}/wishlist/${this.currentWishlistId}/${this.user.username}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      const text = encodeURIComponent(
        `Check out this Wishlist: ${this.$website}/wishlist/${this.currentWishlistId}/${this.user.username}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      const url = encodeURIComponent(
        `${this.$website}/wishlist/${this.currentWishlistId}/${this.user.username}`
      );
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },

    closeCreatedModal() {
      this.wishCreated = this.wishUpdated = false;
    },

    viewCreatedWish() {
      this.$router.push({
        name: "Wishlist",
        params: { id: this.currentWishlistId },
      });
      this.wishCreated = false;
      this.wishUpdated = false;
    },

    createdWish(wishData) {
      console.log(wishData.wishlist_id + "woking");
      this.currentWishlistId = wishData.wishlist_id;
      this.createdWishId = wishData.id;
      this.editingWish = null;
      this.updateType = "created";
      this.showCreateWishModal = false;
      this.wishCreated = true;
      /* this.currentWishlistId = wishData.wishlist_id || this.currentWishlistId; */
    },
    UpdatedWish(wishData) {
      console.log("Wish modified:", wishData);
      this.createdWishId = wishData.id;
      this.editingWish = null;
      this.updateType = "updated";
      this.showCreateWishlistModal = false;
      this.wishUpdated = true;
    },

    async openCreateWishModal() {
      console.log(
        "Opening wish modal for wishlist ID: App",
        this.currentWishlistId
      ); // Debugging
      this.wishlistCreated = false;
      this.wishlistUpdated = false;
      this.editingWish = null;
      await Promise.all([
          this.fetchWishlistDetails(this.currentWishlistId),
        ]);

        this.$router.push({
      name: "Wishlist",
      params: { id: this.createdWishlistId, username: this.user.username },
    }).then(() => {
      this.showCreateWishModal = true; // Trigger the modal to show after navigation
    });
   /*    this.showCreateWishModal = true; */
    },
    closeCategoryModal() {
      this.showCategoryModal = false;
    },
    createdWishList(wishlistData) {
      this.createdWishlistId = wishlistData.id;
      this.currentWishlistId = wishlistData.id; // Ensure this is set
      this.editingWishlist = null;
      this.showCreateWishlistModal = false;
      this.wishlistCreated = true;
    },
    UpdatedWishList(wishlistData) {
      console.log("Wishlist modified:", wishlistData);
      this.createdWishlistId = wishlistData.id;
      this.editingWishlist = null;
      this.showCreateWishlistModal = false;
      this.wishlistUpdated = true;
    },

    openCreateWishlistModal(category, wishlist) {
      this.selectedCategory = category;
      this.editingWishlist = wishlist;
      this.showCreateWishlistModal = true;
    },
    closeCreateWishlistModal() {
      this.showCreateWishlistModal = false;
      this.editingWishlist = null;
    },
    handleError(message) {
      this.$refs.alertComponent.showAlert(message);
    },
    viewCreatedWishlist() {
      /*       this.$router.push({ name: 'Wishlist', params: { id: this.createdWishlistId } });
       */

      window.location.href = this.$router.resolve({
        name: "Wishlist",
        params: { id: this.createdWishlistId, username: this.user.username },
      }).href;

      this.wishlistCreated = false;
      this.wishlistUpdated = false;
    },
  },
};
</script>

<style>
.blurred-content {
  transition: filter 0.3s ease;
  filter: blur(5px);
  pointer-events: none;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #e567f8;
  animation: progress-bar-animation 1.5s linear infinite;
  z-index: 2000;
}

@keyframes progress-bar-animation {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
