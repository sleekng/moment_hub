<template>
  <transition name="fade">
    <div class="fixed z-50 inset-0 overflow-y-auto py-4 px-4">
      <div class="flex items-center justify-center min-h-[90vh]">
        <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
        <div class="bg-white rounded-lg shadow-xl transform transition-all overflow-hidden max-w-sm md:max-w-3xl w-full">
          <div class="flex justify-between items-center mb-4 p-4 bg-gray-100">
            <div class="flex items-center">
              <img src="/assets/box-gift.svg" alt="Gift Box" class="h-6 w-6 mr-1" />
              <h3 class="text-sm lg:text-2xl  font-bold text-gray-900">{{ modalTitle }}</h3>
            </div>
            <img src="/assets/close.svg" alt="Close" class="h-6 w-6 cursor-pointer" @click="close" />
          </div>
          <div class="grid md:grid-cols-3 gap-4 px-4 lg:p-6">

            <div class="md:col-span-1">
              <div class="bg-gray-100 rounded-lg overflow-hidden w-[200px] h-[200px] flex items-center justify-center">
                <img :src="imagePreview || selectedWishlist.photo || `/assets/` + selectedWishlist.category.slug + `.svg`" alt="Placeholder" class="object-cover w-full h-full" />
              </div>
              <label class="my-4 py-2 bg-gray-200 rounded-full block text-center cursor-pointer w-[200px]">
                Upload photo
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </label>
            </div>
            <div class="md:col-span-2 space-y-4">
              <div>
                <label class="block text-gray-700 mb-2" for="giftName">Gift name</label>
                <input v-model="form.name" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="text" id="giftName" placeholder="Hermes Birkin Bag" />
              </div>

              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-gray-700 mb-2" for="quantity">Quantity</label>
                  <input v-model="form.quantity" class="w-full p-3 bg-white border border-gray-300 rounded-md" type="number" id="quantity" placeholder="1" />
                </div>
                <div class="flex-1">
                  <label class="block text-gray-700 mb-2" for="amount">Amount</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">{{ currencySymbol }}</span>

                    <input
                      :value="displayAmount"
                      @input="updateAmount($event.target.value)"
                      class="w-full pl-8 p-3 bg-white border border-gray-300 rounded-md"
                      type="text"
                      id="amount"
                      placeholder="80,000"
                    />
                    <select v-model="form.currency" class="absolute right-3 top-1/2 transform bg-transparent -translate-y-1/2">
                      <option value="NGN">NGN</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="GHS">GHS</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-gray-700 mb-2" for="priority">Gift priority</label>
                <select v-model="form.priority" class="w-full p-3 bg-white border border-gray-300 rounded-md">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label class="block text-gray-700 font-medium mb-2" for="link">Link to the gift (optional)</label>
                <div class="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
                  <span class="pl-4 pr-2 text-gray-400">http://</span>
                  <input v-model="form.link" class="w-full p-3 bg-white border-l focus:outline-none" type="url" id="link" placeholder="www.example.com" />
                </div>
              </div>

              <div>
                <label class="block text-gray-700 mb-2" for="comment">Comment (Optional)</label>
                <textarea v-model="form.comment" class="w-full p-3 bg-white border border-gray-300 rounded-md" id="comment" placeholder="Additional comments about this item e.g color, size, where to get it, etc." rows="3"></textarea>
              </div>

              
            <!-- Tagged Friends Section -->
<div>
  <label class="text-gray-700 mb-2 flex items-center gap-1" for="tag-friends">
    Nominate someone or multiple people to get you this item
    <img src="/assets/help-circle.svg" class="w-4 h-4" alt="Help" />
  </label>
  
  <!-- Combined Input and Friends Container -->
  <div class="w-full min-h-[48px] p-2 bg-white border border-gray-300 rounded-md">
    <div class="flex flex-wrap gap-2">
      <!-- Selected Friends Pills -->
      <div 
        v-for="friend in selectedFriends" 
        :key="friend.username" 
        class="bg-gray-100 py-1 px-3 rounded-full flex items-center gap-2"
        @click="removeFriend(friend)"
      >
        <img :src="friend.avatar || '/assets/avatar.svg'" class="w-5 h-5" alt="Avatar" />
        <span class="text-sm">@{{ friend.username || 'unknown' }}</span>
        <img src="/assets/close.svg" class="w-3 h-3 cursor-pointer" alt="remove" />
      </div>
      
      <!-- Search Input -->
      <input 
        v-model="friendSearch" 
        @input="fetchFriends" 
        class="flex-1 min-w-[120px] border-none outline-none p-1" 
        type="text" 
        placeholder="Search friends..." 
      />
        <!-- Loader Icon -->
  <div v-if="isLoading" class="flex items-center">
    <i class="fas fa-spinner fa-spin"></i> <!-- FontAwesome loader -->
  </div>
    </div>

     <!-- Filtered Friends Dropdown -->
     <div v-if="filteredFriends.length" class="mt-2 border-t border-gray-200 pt-2">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"> <!-- Updated for responsiveness -->
        <div 
          v-for="friend in filteredFriends" 
          :key="friend.username" 
          class="py-1 px-2 hover:text-primaryColor flex items-center gap-1 cursor-pointer" 
          @click="addFriend(friend)"
        >
          <img :src="friend.avatar || '/assets/avatar.svg'" class="w-3 h-3" alt="Avatar" />
          <span class="text-sm">@{{ friend.username || 'unknown' }}</span>
          <img src="/assets/add-2.svg" class="w-3 h-3 ml-auto" alt="add" />
        </div>
      </div>
    </div>
  </div>
</div>


            </div>
          </div>


          <div class="p-6 flex lg:flex-row flex-col lg:justify-end lg:space-x-4">
            <button class="py-4 px-16 bg-gray-200 rounded-full" @click="close">Cancel</button>
            <button @click="saveWish" class="py-4 mt-4 lg:mt-0 px-16 bg-primaryColor text-white rounded-full">{{ buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { eventBus } from '@/eventBus.js';

export default {
  props: {
    wishlistId: {
      type: Number,
      required: true,
    },
    wish: {
      type: Object,
      default: null,
    },
    selectedWishlist: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      isLoading: false, // Add loading state
      isVisible: true,
      imagePreview: null,
      imageFile: null,
      form: {
        name: '',
        quantity: 1,
        amount: '',
        currency: 'NGN',
        priority: 'medium',
        link: '',
        comment: '',
      },
      displayAmount: '',
      friendSearch: '',
      friends: [],
      selectedFriends: [],
    };
  },
  computed: {
    
    modalTitle() {
      return this.wish ? 'Edit Wish' : 'Make a Wish';
    },
    buttonText() {
      return this.wish ? 'Save Changes' : 'Add Wish';
    },
    filteredFriends() {
      return this.friends.filter(friend => !this.selectedFriends.some(selected => selected.username === friend.username));
    },
    currencySymbol() {
    const symbols = {
      NGN: '₦',
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      GHS: '₵'
    };
    return symbols[this.form.currency] || this.form.currency;
  }
  },
  watch: {
    wish: {
      immediate: true,
      handler(newWish) {
        if (newWish) {
          this.form = { ...newWish };
          this.imagePreview = newWish.photo || null;
            this.displayAmount = newWish.amount ? parseFloat(newWish.amount).toLocaleString('en-US') : '';
          this.selectedFriends = newWish.friends || [];
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
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateAmount(value) {
    // Handle empty or invalid input
    if (!value) {
      this.form.amount = '';
      this.displayAmount = '';
      return;
    }
    const rawValue = value.replace(/,/g, '');
    this.form.amount = rawValue;
    // Only format if it's a valid number
    this.displayAmount = !isNaN(rawValue) ? parseFloat(rawValue).toLocaleString('en-US') : '';
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
      }finally {
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
    async saveWish() {
      const formData = new FormData();
      formData.append('wishlistId', this.wishlistId);
      

      if (this.imageFile) {
        formData.append('photo', this.imageFile);
      } 
      if (this.form.name) {
     formData.append('name', this.form.name);
      }
      if (this.form.quantity) {
        formData.append('quantity', this.form.quantity);
      }
      if (this.form.amount) {
        formData.append('amount', this.form.amount);
      }
      if (this.form.currency) {
        formData.append('currency', this.form.currency);
      }
      if (this.form.priority) {
        formData.append('priority', this.form.priority);
      }
      if (this.form.link) {
        formData.append('link', this.form.link);
      }
      if (this.form.comment) {
        formData.append('comment', this.form.comment);
      }
      formData.append('tagged_friends', JSON.stringify(this.selectedFriends.map(f => f.username)));

      try {
        eventBus.setLoading(true);
        let response;

        if (this.wish) {
          formData.append('_method', 'put');
          response = await this.$axios.post(`${this.$baseURL}/wishes/${this.wish.id}`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'multipart/form-data'
            }
          });

          this.$emit('updateWish', response.data.data);
        } else {
          response = await this.$axios.post(`${this.$baseURL}/wishlists/${this.wishlistId}/wishes`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          this.$emit('createWish', response.data.data);
        }
        this.$emit('addWish', response.data.data);
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
        eventBus.onError(errorMsg);
      } finally {
        eventBus.setLoading(false);
      }
    },
    close() {
      this.isVisible = false;
      this.$emit('close');
    }
  }
};
</script>
