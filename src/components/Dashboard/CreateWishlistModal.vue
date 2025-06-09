<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed z-50 inset-0 overflow-y-auto py-4 px-4">
      <div class="flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
        <div class="bg-white rounded-lg shadow-xl transform transition-all overflow-hidden lg:max-w-[650px]">
          <div class="flex justify-between items-center mb-4 p-4 bg-gray-100">
            <div class="flex items-center">
              <img src="/assets/box-gift.svg" alt="Gift Box" class="h-6 w-6 mr-1" />
              <h3 class="text-sm lg:text-2xl  font-bold text-gray-900">{{ modalTitle }}</h3>
            </div>
            <img src="/assets/close.svg" alt="Close" class="h-6 w-6 cursor-pointer" @click="close" />
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 px-4 lg:p-6">
            <div class="col-span-1">
              <div class="bg-gray-100 rounded-lg overflow-hidden w-[200px] h-[200px] flex items-center justify-center">
                <img :src="imagePreview || categoryImage" alt="Placeholder" class="object-cover w-full h-full" />
              </div>
              <label class="my-4 py-2 bg-gray-200 rounded-full block text-center cursor-pointer w-[200px]">
                Upload photo
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </label>
            </div>

            <div class="col-span-2 space-y-4">
              <div class="w-full space-y-4">
                <div>
                  <label class="block text-gray-700 mb-2" for="title">Title</label>
                  <input v-model="form.title" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="text"
                    id="title" placeholder="Enter Title" />
                </div>

                <div class="relative">
                  <label class="text-gray-700 mb-2 flex items-center gap-1" for="event-date">
                    Event date
                    <img src="/assets/help-circle.svg" class="w-4 h-4" alt="Help" />
                  </label>
                  <input v-model="form.date" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="date"
                    id="event-date" />
                </div>

                <div>
                  <label class="block text-gray-700 mb-2" for="description">Description (Optional)</label>
                  <textarea v-model="form.description" class="w-full p-3 bg-white border border-gray-300 rounded-md"
                    id="description" placeholder="Describe the event" rows="3"></textarea>
                </div>

                <div>
                  <label class="text-gray-700 mb-2 flex items-center gap-1" for="tag-people">
                    Tag friends
                    <img src="/assets/help-circle.svg" class="w-4 h-4" alt="Help" />
                  </label>

                  <!-- Combined Input and Friends Container -->
                  <div class="w-full min-h-[48px] p-2 bg-white border border-gray-300 rounded-md">
                    <div class="flex flex-wrap gap-2">
                      <!-- Selected Friends Pills -->
                      <div v-for="friend in selectedFriends" :key="friend.username"
                        class="bg-gray-100 py-1 px-3 rounded-full flex items-center gap-2"
                        @click="removeFriend(friend)">
                        <img :src="friend.avatar || '/assets/avatar.svg'" class="w-5 h-5" alt="Avatar" />
                        <span class="text-sm">@{{ friend.username || 'unknown' }}</span>
                        <img src="/assets/close.svg" class="w-3 h-3 cursor-pointer" alt="remove" />
                      </div>

                      <!-- Search Input -->
                      <input v-model="friendSearch" @input="fetchFriends"
                        class="flex-1 min-w-[120px] border-none outline-none p-1" type="text"
                        placeholder="Search friends..." />
                      <!-- Loader Icon -->
                      <div v-if="isLoading" class="flex items-center">
                        <i class="fas fa-spinner fa-spin"></i> <!-- FontAwesome loader -->
                      </div>
                    </div>

                    <!-- Filtered Friends Dropdown -->
                    <div v-if="filteredFriends.length" class="mt-2 border-t border-gray-200 pt-2">
                      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <div v-for="friend in filteredFriends" :key="friend.username"
                          class="py-1 px-2 hover:text-primaryColor flex items-center gap-1 cursor-pointer"
                          @click="addFriend(friend)">
                          <img :src="friend.avatar || '/assets/avatar.svg'" class="w-3 h-3" alt="Avatar" />
                          <span class="text-sm">@{{ friend.username || 'unknown' }}</span>
                          <img src="/assets/add-2.svg" class="w-3 h-3 ml-auto" alt="add" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




                <div>
                  <label class="block text-gray-700 mb-2">Who can see your wishlist?</label>
                  <div class="space-y-4">
                    <div class="flex items-center gap-4" @click="selectedOption = 'public'">
                      <div class="bg-gray-100 p-2 rounded-full">
                        <img src="/assets/world.svg" class="w-5 h-5" alt="World" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700">Anyone</div>
                        <div class="text-sm text-[#6B7280]">Anyone on and off Moments Hub can see this list.</div>
                      </div>
                      <img
                        :src="selectedOption === 'public' ? '/assets/web-radio-btn.svg' : '/assets/web-radio-btn-2.svg'"
                        class="ml-auto w-5 h-5 cursor-pointer" alt="Radio button" />
                    </div>

                    <div class="flex items-center gap-4" @click="selectedOption = 'friends'">
                      <div class="bg-gray-100 p-2 rounded-full">
                        <img src="/assets/people-2.svg" class="w-5 h-5" alt="People" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700">Friends</div>
                        <div class="text-sm text-[#6B7280]">Only the people you follow can see this list.</div>
                      </div>
                      <img
                        :src="selectedOption === 'friends' ? '/assets/web-radio-btn.svg' : '/assets/web-radio-btn-2.svg'"
                        class="ml-auto w-5 h-5 cursor-pointer" alt="Radio button" />
                    </div>

                    <div class="flex items-center gap-4" @click="selectedOption = 'tagged'">
                      <div class="bg-gray-100 p-2 rounded-full">
                        <img src="/assets/people-2.svg" class="w-5 h-5" alt="People" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700">People you tagged</div>
                        <div class="text-sm text-[#6B7280]">Only the people you tagged can see this list.</div>
                      </div>
                      <img
                        :src="selectedOption === 'tagged' ? '/assets/web-radio-btn.svg' : '/assets/web-radio-btn-2.svg'"
                        class="ml-auto w-5 h-5 cursor-pointer" alt="Radio button" />
                    </div>

                    <div class="flex items-center gap-4" @click="selectedOption = 'private'">
                      <div class="bg-gray-100 p-2 rounded-full">
                        <img src="/assets/lock.svg" class="w-5 h-5" alt="Lock" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700">Private</div>
                        <div class="text-sm text-[#6B7280]">Only you can see this list.</div>
                      </div>
                      <img
                        :src="selectedOption === 'private' ? '/assets/web-radio-btn.svg' : '/assets/web-radio-btn-2.svg'"
                        class="ml-auto w-5 h-5 cursor-pointer" alt="Radio button" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 flex lg:flex-row flex-col lg:justify-end lg:space-x-4">
            <button class="py-2 px-12 bg-gray-200 rounded-full" @click="close">Cancel</button>
            <button @click="saveWishlist" class="py-2 mt-4 lg:mt-0 px-6 bg-primaryColor text-white rounded-full">{{
              buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import { eventBus } from '@/eventBus.js';

export default {
  props: {
    selectedCategory: {
      type: Object,
      required: true,
    },
    wishlist: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      isLoading: false, // Add loading state
      isVisible: true,
      selectedOption: 'public',
      imagePreview: null,
      imageFile: null,
      form: {
        title: '',
        date: '',
        description: '',
      },
      friendSearch: '',
      friends: [],
      selectedFriends: [],
    };
  },
  computed: {
    categoryImage() {
      const categoryImages = {
        anniversary: '/assets/others-3.svg',
        'baby-shower': '/assets/baby.svg',
        birthday: '/assets/13-1.svg',
        wedding: '/assets/wedding.svg',
        book: '/assets/others-5.svg',
        fashion: '/assets/others.svg',
        gadgets: '/assets/others-4.svg',
        graduation: '/assets/graduation.svg',
        holiday: '/assets/holiday.svg',
        'house-warming': '/assets/others-2.svg',
        others: '/assets/others-9.svg',
        personal: '/assets/personal.svg',
        'pet-supply': '/assets/others-7.svg',
        ramadan: '/assets/others-8.svg',
        travel: '/assets/others-6.svg',
      };
      return categoryImages[this.selectedCategory.slug];
    },
    modalTitle() {
      return this.wishlist ? 'Edit Wishlist' : 'Create a new wishlist';
    },
    buttonText() {
      return this.wishlist ? 'Save Changes' : 'Create Wishlist';
    },
    filteredFriends() {
      return this.friends.filter(friend => !this.selectedFriends.some(selected => selected.username === friend.username));
    }
  },
  watch: {
    wishlist: {
      immediate: true,
      handler(newWishlist) {
        if (newWishlist) {
          this.form.title = newWishlist.title;
          this.form.date = newWishlist.date;
          this.form.description = newWishlist.description;
          this.selectedOption = newWishlist.visibility || 'public';
          this.imagePreview = newWishlist.photo || null;
          this.selectedFriends = newWishlist.friends || [];
        }
      }
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.previewImage(file);
      }
    },
    async fetchFriends() {
      this.isLoading = true; // Set loading state to true
      if (this.friendSearch.length < 2) {
        this.friends = [];
        this.isLoading = false; // Reset loading state
        return;
      }

      try {
        const response = await this.$axios.get(`${this.$baseURL}/explore/search`, {
          params: {
            type: 'friends',
            value: this.friendSearch
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.friends = response.data.data || [];
      } catch (error) {
        console.error('Error fetching friends:', error.message);
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
    addFriend(friend) {
      if (!this.selectedFriends.some(selected => selected.username === friend.username)) {
        this.selectedFriends.push(friend);
      }
    },
    removeFriend(friend) {
      this.selectedFriends = this.selectedFriends.filter(selected => selected.username !== friend.username);
    },
    close() {
      this.isVisible = false;
      this.$emit('close');
    },
    async saveWishlist() {
      const formData = new FormData();
      if (this.imageFile) {
        formData.append('photo', this.imageFile);
      } else {
       
      }
      formData.append('title', this.form.title);
      formData.append('date', this.form.date);
      if (this.form.description || this.form.description == '') {
        formData.append('description', this.form.description);
      }
      formData.append('visibility', this.selectedOption);
      formData.append('category_id', this.selectedCategory.id);
      formData.append('tagged_friends', JSON.stringify(this.selectedFriends.map(f => f.username)));

      try {
        eventBus.setLoading(true);
        let response;
        if (this.wishlist) {
          formData.append('_method', 'put');
          response = await this.$axios.post(`${this.$baseURL}/wishlists/${this.wishlist.id}`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
          });

          this.$emit('updateWishList', response.data.data);
        } else {
          response = await this.$axios.post(`${this.$baseURL}/wishlists`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
          });
          this.$emit('createWishList', response.data.data);
        }
        console.log('Wishlist saved successfully:', response.data.data);
      } catch (error) {
        const errorMsg = error.response ?.data ?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg); // Trigger the alert
        console.error('Error saving wishlist:', error.message);
      } finally {
        eventBus.setLoading(false);
      }
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
