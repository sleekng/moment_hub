import './assets/styles/styles.css';
import './assets/styles/tailwind.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure correct router import
import axios from 'axios';
import './assets/css/all.css';  // FontAwesome CSS

import UserAccess from './directives/v-user-access'; // Import your directive

const app = createApp(App);

// Register the directive
app.directive('user-access', UserAccess);

// Set the global base URL
/* app.config.globalProperties.$baseURL = 'https://be.momentshub.org/api';
app.config.globalProperties.$website = 'http://localhost:5173'; */

app.config.globalProperties.$website = 'http://momentshub.org';
app.config.globalProperties.$baseURL = 'https://account.momentshub.org/api';
 
// Create a new Axios instance for the app
const axiosInstance = axios.create({
  baseURL: app.config.globalProperties.$baseURL,
});

// Function to clear auth data
function clearAuthData() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiration');
  localStorage.removeItem('user');
}

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Error response:', error.response);
      if (error.response.status === 401) {
        clearAuthData();
        router.push({ name: 'Login', query: { redirect: router.currentRoute.value.fullPath } });
      }
    }
    return Promise.reject(error);
  }
);


// Inject the Axios instance globally
app.config.globalProperties.$axios = axiosInstance;

// Use the router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
