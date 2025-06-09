<template>
    <div class="border rounded-md p-4 mb-4" :class="{ 'bg-purple-50 border-purple-500': isSelected }">
      <div class="flex items-center gap-2 mb-2">
        <input type="radio" :checked="isSelected" @change="selectAddress" />
        <span class="font-medium">{{ addressType }} address</span>
      </div>
      <div class="flex items-start gap-2">
        <img src="/assets/location-2.svg" alt="location icon" class="w-4 h-4" />
        <div>
          <p>{{ fullAddress }}</p>
          <p>Phone number: {{ address.phone }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddressCard',
    props: {
      address: Object,
      isSelected: Boolean
    },
    computed: {
      addressType() {
        return this.address.private ? 'Private' : 'Public';
      },
      fullAddress() {
        return `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country}, ${this.address.zip_code || ''}`;
      }
    },
    methods: {
      selectAddress() {
        this.$emit('select', this.address.id);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  