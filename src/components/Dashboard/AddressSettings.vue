<template>
  <h1 class="font-bold text-2xl mb-4 lg:hidden block">Delivery location</h1>
  <div v-if="!loading" class="lg:w-3/4 space-y-8">
    <!-- Tip Section -->
    <div class="flex bg-gray-200 p-4 rounded-lg">
      <img src="/assets/information.svg" alt="Information Icon" class="w-5 h-5 mr-3" />
      <p class="text-gray-800">
        Tip: For your safety, we recommend setting a public address for general use and a private address for trusted friends. Your privacy is important to us!
      </p>
    </div>

    <!-- Address Sections -->
    <div v-if="privateAddress">
      <div class="mb-10">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-medium text-gray-900">{{ privateAddress.typeOption }} address</h3>
          <div class="flex space-x-2">
            <button class="text-blue-600" @click="editAddress(privateAddress)">Edit address</button>
            <span>|</span>
            <button class="text-blue-600" @click="removeAddress(privateAddress.id)">Remove address</button>
          </div>
        </div>
        <hr>
        <div class="flex items-start mt-4">
          <img src="/assets/location.svg" alt="Location Icon" class="w-5 h-5 mr-2" />
          <div class="text-gray-700">
            <p>{{ privateAddress.street }}</p>
            <p>{{ privateAddress.city }}, {{ privateAddress.country }}</p>
            <p>{{ privateAddress.zip_code || 'N/A' }}</p>
            <p class="mt-2 text-sm text-gray-600">
              Phone number: <span class="text-gray-800">{{ privateAddress.phone || 'N/A' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mb-10">
      <div class="flex items-center justify-between py-1">
        <h3 class="text-xl font-medium text-gray-900">Private address</h3>
        <button class="text-blue-600 mt-2" @click="openModal('Private')">Add address</button>
      </div>
      <hr>
      <button class="flex items-center bg-gray-100 py-2 px-4 mt-4 rounded-full">
        <img src="/assets/add.svg" alt="Add" class="w-4 h-4 mr-2" />
        <span class="text-gray-700 font-medium" @click="openModal('Private')">Add private address</span>
      </button>
    </div>

    <div v-if="publicAddress">
      <div class="mb-10">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-medium text-gray-900">{{ publicAddress.typeOption }} address</h3>
          <div class="flex space-x-2">
            <button class="text-blue-600" @click="editAddress(publicAddress)">Edit address</button>
            <span>|</span>
            <button class="text-blue-600" @click="removeAddress(publicAddress.id)">Remove address</button>
          </div>
        </div>
        <hr>
        
        <div class="flex items-start mt-4">
          <img src="/assets/location.svg" alt="Location Icon" class="w-5 h-5 mr-2" />
          <div class="text-gray-700">
            <p>{{ publicAddress.street }}</p>
            <p>{{ publicAddress.city}}, {{ publicAddress.state }}, {{ publicAddress.country }}</p>
            <p>{{ publicAddress.zip_code || 'N/A' }}</p>
            <p class="mt-2 text-sm text-gray-600">
              Phone number: <span class="text-gray-800">{{ publicAddress.phone || 'N/A' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mb-10">
      <div class="flex items-center justify-between py-1">
        <h3 class="text-xl font-medium text-gray-900">Public address</h3>
        <button class="text-blue-600 mt-2" @click="openModal('Public')">Add address</button>
      </div>
      <hr>
      <button class="flex items-center bg-gray-100 py-2 px-4 mt-4 rounded-full">
        <img src="/assets/add-2.svg" alt="Add" class="w-4 h-4 mr-2" />
        <span class="text-gray-700 font-medium" @click="openModal('Public')">Add public address</span>
      </button>
    </div>
  </div>

  <!-- Address Modal -->
  <div v-if="showModal" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 p-8 flex items-start justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-4 lg:p-8 w-full max-w-lg">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2">
          <img src="/assets/location.svg" alt="Location" class="w-7 h-7 border-gray-400 border rounded" />
          <h3 class="text-xl font-bold text-gray-900">{{ isEditing ? `Edit ${modalType.toLowerCase()} address` : `Add ${modalType.toLowerCase()} address` }}</h3>
        </div>
        <img src="/assets/close.svg" alt="Close" class="w-5 h-5 cursor-pointer" @click="closeModal" />
      </div>

      <div class="space-y-4">
        <div class="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
          <p>Tip: For your safety, we recommend setting a public address for general use and a private address for trusted friends. Your privacy is important to us!</p>
        </div>

        <div>
          <label for="street-address" class="block text-sm text-gray-700 mb-1">Street Address</label>
          <input id="street-address" v-model="addressForm.street" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter street address" />
        </div>

        <div>
          <label for="apartment-details" class="block text-sm text-gray-700 mb-1">Apartment, suite, unit, building, floor, etc. (Optional)</label>
          <input id="apartment-details" v-model="addressForm.type" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Apartment, suite, unit, building, floor, etc." />
        </div>

        <div class="flex gap-4">
  <div class="w-full">
    <label for="country" class="block text-sm text-gray-700 mb-1">Country/Region</label>
    <div class="relative">
      <select 
        id="country" 
        v-model="addressForm.country" 
        @change="updateStates"
        class="w-full p-3 border border-gray-300 bg-transparent rounded-md appearance-none pr-10"
      >
        <option v-for="country in countries" :key="country.name" :value="country.name">
        {{ country.name }}
        </option>
      </select>
      <img src="/assets/dropdown-3.svg" class="absolute top-4 right-4 w-4 h-4" alt="Dropdown" />
    </div>
  </div>
  <div class="w-full">
    
    <label for="state" class="block text-sm text-gray-700 mb-1">State</label>
    <div class="relative">
      <select 
        id="state" 
        v-model="addressForm.state"
        class="w-full p-3 border bg-transparent border-gray-300 rounded-md appearance-none pr-10"
      >
        <option v-for="state in states" :key="state.id" :value="state.name">
          {{ state.name }}
        </option>
      </select>
      <img src="/assets/dropdown-2.svg" class="absolute top-4 right-4 w-4 h-4" alt="Dropdown" />
    </div>
  </div>
</div>

        <div class="flex gap-4">
          <div class="w-full">
            <label for="city" class="block text-sm text-gray-700 mb-1">City</label>
            <input id="city" v-model="addressForm.city" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter city" />
          </div>
          <div class="w-full">
            <label for="zip-code" class="block text-sm text-gray-700 mb-1">ZIP Code</label>
            <input id="zip-code" v-model="addressForm.zip_code" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter ZIP code" />
          </div>
        </div>

        <div>
          <label for="phone-number" class="block text-sm text-gray-700 mb-1">Phone Number</label>
          <input id="phone-number" v-model="addressForm.phone" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter phone number" />
          <p class="text-sm text-gray-600">May be used to assist delivery</p>
        </div>

        <button class="bg-primaryColor transition-all hover:shadow text-white px-12 py-2 rounded-full mt-4" @click="saveAddress">
          {{ isEditing ? 'Save changes' : 'Add address' }}
        </button>
      </div>
    </div>
  </div>
  <Loader :show="loading" />
</template>

<script>
import { eventBus } from '@/eventBus.js';
import Loader from '@/components/Loader.vue';
import countriesStatesData from '@/assets/countriesStates.json';
export default {
  name: "AddressSettings",
components:{
  Loader
},
  data() {
    return {
      addresses: [],
      loading:false,
      showModal: false,
      modalType: "",
      addressForm: {
        street: '',
        type: '',
        typeOption:'',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        private:'',
        phone: ''
      },
      isEditing: false,
      editingId: null,
      states: [],
      countries: [],
      countryStateMap: [],
    };
  },
  async created() {
    this.loadData();
    try {
      this.countryStateMap = countriesStatesData;
      this.countries = this.countryStateMap;
    } catch (error) {
      console.error('Error loading countries and states:', error);
      this.countries = [];
    }
  },
  computed: {
    privateAddress() {
      return this.addresses.find(addr => addr.private);
    },
    publicAddress() {
      return this.addresses.find(addr => !addr.private);
    }
  },
  methods: {
    updateStates() {
      const selectedCountryObj = this.countries.find(country => country.name === this.addressForm.country);
      if (selectedCountryObj) {
        this.states = selectedCountryObj.states;
      } else {
        this.states = [];
        this.addressForm.state = '';
      }
    },

    async loadData() {
      this.loading = true;  // Start loading
      try {
        await Promise.all([
        this.fetchAddresses()
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        this.loading = false;  // Stop loading
      }
    },


    async fetchAddresses() {
      try {
        const response = await fetch(`${this.$baseURL}/addresses`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        });

        const { data } = await response.json();
        this.addresses = data.map(addr => ({
          ...addr,
          typeOption: addr.private ? 'Private' : 'Public'
        }));
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    },
    openModal(type) {


      this.modalType = type;
      this.resetForm();
      this.isEditing = false;
      if(type == 'Private'){
        this.addressForm.private = true
        console.log(type);
        
      }
      if(type == 'Public'){
        this.addressForm.private = false
        console.log(type);
      }

      this.showModal = true;
    },
    editAddress(address) {
  this.modalType = address.private ? 'Private' : 'Public';
  this.addressForm = { ...address };
  this.isEditing = true;
  this.editingId = address.id;
  this.showModal = true;
},
    closeModal() {
      this.showModal = false;
    },
    async saveAddress() {
  eventBus.setLoading(true);

  const method = this.isEditing ? 'PUT' : 'POST';
  const url = this.isEditing ? `${this.$baseURL}/addresses/${this.editingId}` : `${this.$baseURL}/addresses`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify(this.addressForm)
    });

    await this.fetchAddresses();
  } catch (error) {
    console.error(`Error ${this.isEditing ? 'updating' : 'adding'} address:`, error);
  } finally {
    eventBus.setLoading(false);
  }
  this.closeModal();
}
,
    resetForm() {
      this.addressForm = {
        street: '',
        apartment: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        private:'',
        phone: ''
      };
    },
    privateOption(option){
      this.private=option
    },
    async removeAddress(id) {
      eventBus.setLoading(true);
      try {
       const response =  await fetch(`${this.$baseURL}/addresses/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        });
           eventBus.onSuccess(response.data.message);
        await this.fetchAddresses();
      } catch (error) {
        console.error('Error removing address:', error);
      } finally {
    eventBus.setLoading(false);
  }
    },
    randomCity() {
      const cities = ['Los Angeles', 'New York City', 'Houston', 'Chicago', 'Miami'];
      return cities[Math.floor(Math.random() * cities.length)];
    },
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    },
  }
};
</script>
