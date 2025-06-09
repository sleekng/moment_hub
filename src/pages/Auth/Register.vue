<template>
  <div class="flex flex-col lg:justify-center lg:flex-row lg:items-center items-center h-screen bg-white lg:p-8">
    <!-- Header -->
    <Header />

    <div class="w-full h-[95vh] flex space-x-10 bg-white rounded-2xl overflow-hidden">
      <!-- Left Side: Registration Form -->
      <RegistrationForm @submit="handleRegister" ref="registrationForm" />

      <!-- Right Side: Image -->
      <RightSideImage2 />
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Header from '@/components/LandingPage/Header.vue';
import RegistrationForm from '@/components/LandingPage/RegistrationForm.vue';
import RightSideImage2 from '@/components/LandingPage/RightSideImage2.vue';
import { eventBus } from '@/eventBus.js';

export default {
  components: {
    Header,
    RegistrationForm,
    RightSideImage2,
  },
  methods: {
    async handleRegister(credentials) {
      try {
        eventBus.setLoading(true);
        const response = await this.$axios.post(`${this.$baseURL}/register`, credentials);
        console.log('Registration successful:', response.data);

        const token = response.data.data.token; // Assuming the token is in response.data.token
        const user = response.data.data; 


          const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
          localStorage.setItem("authToken", token);
          localStorage.setItem("tokenExpiration", expirationTime);
          localStorage.setItem("user", JSON.stringify(user));

        // Redirect to /verification-sent
        this.$router.push('/verification-sent');
      } catch (error) {

        if (error.response) {
          // Use eventBus to output error messages directly from the response
          if (error.response.data.message) {
            eventBus.onError(error.response.data.message);
          } else if (error.response.data.errors) {
            const errorMsg = Object.values(error.response.data.errors).flat().join(" ");
            eventBus.onError(errorMsg);
          } else {
            eventBus.onError("An unexpected error occurred. Please try again.");
          }
        }

        // Reset form submission state
        this.$refs.registrationForm.isSubmitting = false;

        
      } finally {
        eventBus.setLoading(false);
      }
    },
  },
};
</script>


<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    font-family: 'Mukta', sans-serif;
}

.bg-image {
    background: radial-gradient(circle, rgba(239, 151, 252, 1) 36.9%, rgba(78, 249, 255, 1) 16.7%, rgba(161, 197, 255, 1) 8.24%, rgba(241, 146, 255, 1) 105.84%);
    position: relative;
}

.fade {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.28) 59%, rgba(255, 255, 255, 0));
}
</style>
