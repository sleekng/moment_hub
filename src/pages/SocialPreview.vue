<template>
  <div v-if="loading" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading wishlist...</p>
    </div>
  </div>
  
  <div v-else-if="error" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Wishlist Not Found</h1>
      <p class="text-gray-600">The wishlist you're looking for doesn't exist or has been removed.</p>
      <router-link to="/" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Go to Moment Hub
      </router-link>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gray-100">
    <!-- Social Media Preview Content -->
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Wishlist Header -->
        <div class="relative h-64 bg-gradient-to-r from-purple-400 to-pink-400">
          <div v-if="wishlist?.photo" class="absolute inset-0">
            <img 
              :src="`${baseURL}/storage/${wishlist.photo}`" 
              :alt="wishlist.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <div class="absolute bottom-6 left-6 text-white">
            <h1 class="text-3xl font-bold mb-2">{{ wishlist?.name }}</h1>
            <p class="text-lg opacity-90">by {{ wishlist?.user?.username }}</p>
          </div>
        </div>
        
        <!-- Wishlist Info -->
        <div class="p-6">
          <div v-if="wishlist?.description" class="mb-6">
            <p class="text-gray-700 text-lg leading-relaxed">{{ wishlist.description }}</p>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ totalWishes }}</div>
              <div class="text-gray-600">Total Wishes</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ reservedWishes }}</div>
              <div class="text-gray-600">Reserved</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ receivedWishes }}</div>
              <div class="text-gray-600">Received</div>
            </div>
          </div>
          
          <!-- Sample Wishes -->
          <div v-if="sampleWishes.length > 0" class="mb-6">
            <h2 class="text-xl font-semibold mb-4">Sample Wishes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="wish in sampleWishes" 
                :key="wish.id"
                class="bg-gray-50 rounded-lg p-4"
              >
                <div v-if="wish.image" class="mb-3">
                  <img 
                    :src="`${baseURL}/storage/${wish.image}`" 
                    :alt="wish.name"
                    class="w-full h-32 object-cover rounded"
                  />
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">{{ wish.name }}</h3>
                <p v-if="wish.description" class="text-sm text-gray-600 line-clamp-2">{{ wish.description }}</p>
                <div v-if="wish.price" class="mt-2 text-green-600 font-semibold">${{ wish.price }}</div>
              </div>
            </div>
          </div>
          
          <!-- Call to Action -->
          <div class="text-center bg-blue-50 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">View Full Wishlist</h3>
            <p class="text-gray-600 mb-4">Discover all the amazing wishes and make gifting meaningful!</p>
            <router-link 
              :to="`/wishlist/${wishlist?.id}/${wishlist?.user?.username}`"
              class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Wishlist
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SocialPreview',
  data() {
    return {
      loading: true,
      error: false,
      wishlist: null,
      wishes: [],
      baseURL: import.meta.env.VITE_API_URL || 'https://be.momentshub.org/api'
    };
  },
  computed: {
    totalWishes() {
      return this.wishes.length;
    },
    reservedWishes() {
      return this.wishes.filter(wish => wish.status === 'reserved' || wish.status === 'fulfiled').length;
    },
    receivedWishes() {
      return this.wishes.filter(wish => wish.received === true).length;
    },
    sampleWishes() {
      // Return up to 6 wishes for preview
      return this.wishes.slice(0, 6);
    }
  },
  async created() {
    await this.loadWishlistData();
  },
  methods: {
    async loadWishlistData() {
      try {
        const wishlistId = this.$route.params.id;
        
        // Fetch wishlist details and wishes
        const [wishlistResponse, wishesResponse] = await Promise.all([
          axios.get(`${this.baseURL}/wishlists/${wishlistId}`),
          axios.get(`${this.baseURL}/wishlists/${wishlistId}/wishes`)
        ]);
        
        this.wishlist = wishlistResponse.data.data;
        this.wishes = wishesResponse.data.data;
        
        // Update meta tags for social media
        this.updateMetaTags();
        
      } catch (error) {
        console.error('Error loading wishlist data:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    
    updateMetaTags() {
      if (!this.wishlist) return;
      
      const baseUrl = window.location.origin;
      const currentUrl = window.location.href;
      
      // Create dynamic title
      const title = `${this.wishlist.name} - ${this.wishlist.user.username}'s Wishlist | Moment Hub`;
      
      // Create dynamic description
      const description = this.wishlist.description || 
        `Check out ${this.wishlist.user.username}'s amazing wishlist with ${this.totalWishes} wishes on Moment Hub. Discover perfect gift ideas and make gifting meaningful!`;
      
      // Get wishlist image or use default
      const imageUrl = this.wishlist.photo ? 
        `${baseUrl}/storage/${this.wishlist.photo}` : 
        `${baseUrl}/assets/Logo.png`;
      
      // Update meta tags
      this.updateMetaTag('title', title);
      this.updateMetaTag('description', description);
      this.updateMetaTag('og:title', title);
      this.updateMetaTag('og:description', description);
      this.updateMetaTag('og:image', imageUrl);
      this.updateMetaTag('og:url', currentUrl);
      this.updateMetaTag('og:type', 'website');
      this.updateMetaTag('twitter:title', title);
      this.updateMetaTag('twitter:description', description);
      this.updateMetaTag('twitter:image', imageUrl);
      this.updateMetaTag('twitter:card', 'summary_large_image');
    },
    
    updateMetaTag(property, content) {
      let meta = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
