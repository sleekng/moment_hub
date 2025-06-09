<template>
  <div class="bg-white lg:rounded-t-lg md:px-12 pt-4 md:pt-12 lg:pb-4">
    <div
      class="flex flex-col md:flex-row lg:items-center md:items-start mb-4 lg:mb-8"
    >
      <div class="flex lg:block justify-between w-full lg:w-auto items-center">
        <!-- Avatar -->
         <div class="h-16 w-16 md:h-32 md:w-32 rounded-full mb-4 md:mb-0 md:mr-6 overflow-hidden">

           <img
             :src="user.avatar || '/assets/avatar.svg'"
             alt="Avatar"
             class=" w-full object-cover"
           />
         </div>

        <!-- Action Buttons Mobile-->
        <div
          class="flex justify-center md:justify-start lg:mt-4 md:mt-0 space-x-4 lg:hidden  hover:text-primaryColor transition-all"
        >
          <button
            v-if="isDashboard"
            @click="showAnalyticsModal"
            class="bg-gray-100 text-[#2D3036] py-2 px-4 md:px-6 rounded-full hover:shadow-xl"
          >
            View analytics
          </button>
          <button @click="toggleShareMenu" class="text-[#2D3036] py-2 md:px-6 rounded-full">
            <img src="/assets/share-arrow-svgrepo-com-1.svg" alt="Share"  class="hover:shadow-xl" />
          </button>
        </div>
      </div>

      <!-- User Information -->
      <div class="flex-1">
        <div class="flex items-center justify-start mb-2">
          <h2 class="text-lg md:text-2xl font-medium mr-2">
            {{ user.first_name }} {{ user.last_name }}
          </h2>
          <p class="text-sm md:text-lg text-gray-600">@{{ user.username }}</p>
        </div>
        <div class="flex items-center justify-start text-[#616874] mb-4">
          <span class="mr-2">🎂 Birthday, {{ formattedBirthday }}</span>
          <span class="flex items-center">
            <img
              src="/assets/frame-1618868316.svg"
              alt="Location"
              class="h-2.5 w-2.5 md:h-5 md:w-5 mr-1"
            />
            {{ user.state }}, {{ user.country }}
          </span>
        </div>
        <div class="flex justify-start text-[#616874] mb-4">
          <div class="mr-4">
            <span class="font-bold text-black mr-1">{{ myWishlistCount }}</span
            >Wishlist
          </div>
          <div class="mr-4">
            <span class="font-bold text-black mr-1">{{
              user.friends_count
            }}</span
            >Friends
          </div>
          <div>
            <span class="font-bold text-black mr-1">{{ user.likes_count }}</span
            >Likes
          </div>
        </div>
      </div>

      <div class="flex items-start self-start">
        <!-- Action Buttons Desktop -->
        <div
          class="justify-center md:justify-start mt-4 md:mt-0 space-x-4 hidden lg:flex relative"
        >
          <button
            v-if="isDashboard"
            @click="showAnalyticsModal"
            class="bg-gray-100 text-[#2D3036] py-2 px-4 md:px-6 rounded-full hover:shadow-lg hover:text-primaryColor transition-all"
          >
            View analytics
          </button>
          <button
            @click="toggleShareMenu"
            class="bg-gray-100 text-[#2D3036] py-2 px-6 rounded-full hover:shadow-lg hover:text-primaryColor transition-all"
          >
            Share profile
          </button>
        </div>
      </div>
      <!-- Share Modal -->
      <div
        v-if="isShareMenuOpen"
        class="fixed inset-0 left-0 p-4 flex items-center justify-center bg-black bg-opacity-50 z-50"
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
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/eventBus.js";
export default {
  name: "ProfileDetails",
  props: {
    myWishlistCount: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isShareMenuOpen: false,
    };
  },
  computed: {
    isDashboard() {
      return this.$route.path === "/dashboard";
    },
    formattedBirthday() {
      const [month, day] = this.user.dob.split("/");
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${monthNames[parseInt(month, 10) - 1]} ${day}`;
    },
  },

  methods: {
    showAnalyticsModal() {
      this.$emit("showAnalyticsModal");
    },

    toggleShareMenu() {
      this.isShareMenuOpen = !this.isShareMenuOpen;
    },
    copyLink() {
      const profileUrl = `${window.location.origin}/${this.user.username}`;
      const message = this.isDashboard
        ? `Hey there! I'd love for you to check out my profile on Moments Hub: ${profileUrl}`
        : `Check out this profile: ${profileUrl}`;
      navigator.clipboard.writeText(message).then(() => {
        eventBus.onSuccess("Profile link copied to clipboard!");
      });
    },
    shareToEmail() {
      const profileUrl = `${window.location.origin}/${this.user.username}`;
      const subject = encodeURIComponent(
        this.isDashboard
          ? `Check out my profile on Moments Hub`
          : `Check out this profile: ${this.user.first_name} ${this.user.last_name}`
      );
      const body = encodeURIComponent(
        this.isDashboard
          ? `Hey there! I'd love for you to check out my profile on Moments Hub: ${profileUrl}`
          : `Check out this profile: ${profileUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      const profileUrl = `${window.location.origin}/${this.user.username}`;
      const text = encodeURIComponent(
        this.isDashboard
          ? `Hey there! I'd love for you to check out my profile on Moments Hub: ${profileUrl}`
          : `Check out this profile: ${profileUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      const profileUrl = `${window.location.origin}/${this.user.username}`;
      const text = encodeURIComponent(
        this.isDashboard
          ? `Hey there! I'd love for you to check out my profile on Moments Hub: ${profileUrl}`
          : `Check out this profile: ${profileUrl}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      const profileUrl = `${window.location.origin}/${this.user.username}`;
      const url = encodeURIComponent(profileUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },
    showAnalyticsModal() {
      this.$emit("showAnalyticsModal");
    },
  },
};
</script>

<style scoped>
/* Additional styles if required */
</style>
