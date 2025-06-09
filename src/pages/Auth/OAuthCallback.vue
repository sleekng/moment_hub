<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-xl font-semibold mb-4">Processing authentication...</h2>
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js';

export default {
  name: 'OAuthCallback',
  props: {
    provider: {
      type: String,
      required: true
    }
  },
  async created() {
    try {
      // Get the authorization code from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (!code) {
        throw new Error('No authorization code received');
      }

      // Send the code to your backend
      const response = await this.$axios.get(`${this.$baseURL}/oauth/${this.provider}/callback`, {
        params: {
          code: code
        }
      });

      console.log(response.data);
      

      if (response.data.data.token) {
        // Store the authentication data
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem("tokenExpiration", expirationTime);
        localStorage.setItem('user', JSON.stringify(response.data.data));


        eventBus.onSuccess(response.data.message);
        // Redirect to dashboard
        this.$router.push({ name: 'dashboard' });
      }
    } catch (error) {
        
      console.error('OAuth callback error:', error);
      // Redirect to login page with error
      this.$router.push({ 
        name: 'Login', 
        query: { error: 'Authentication failed. Please try again.' } 
      });
    }
  }
 /*  async created() {
    alert('OAUTH!')
    try {
      // Get the authorization code from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (!code) {
        throw new Error('No authorization code received');
      }

      // Send the code to your backend
      const response = await this.$axios.post(`${this.$baseURL}/oauth/${this.provider}/callback`, {
        code,
        redirect_uri: `${this.$website}/auth/${this.provider}/callback`
      });

      if (response.data.data.token) {
        // Store the authentication data
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('tokenExpiration', response.data.data.expiration);

        // Redirect to dashboard
        this.$router.push({ name: 'dashboard' });
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      // Redirect to login page with error
      this.$router.push({ 
        name: 'Login', 
        query: { error: 'Authentication failed. Please try again.' } 
      });
    }
  } */
};
</script> 