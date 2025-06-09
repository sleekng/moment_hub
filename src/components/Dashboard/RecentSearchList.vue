<template>
  <div class="max-h-[60vh] overflow-y-auto">
    <div v-if="people.length || wishlists.length" class="space-y-2">
      <div v-if="people.length" class="space-y-2">
        <p class="font-medium text-sm text-gray-500">People</p>
        <div v-for="person in people" :key="person.username" class="flex items-center justify-between cursor-pointer">
          <div class="flex items-center space-x-2" @click="viewPerson(person)">
            <img :src="person.avatar ? person.avatar : '/assets/profile.svg'" class="w-8 h-8 rounded-full" alt="Avatar">
            <div>
              <span class="text-sm text-gray-700">{{ person.name }}</span>
              <p class="text-xs text-gray-500">@{{ person.username }} • {{ person.wishlists }} Wishlists</p>
            </div>
          </div>
          <img src="/assets/close-3.svg" class="w-4 h-4 cursor-pointer" alt="Close Icon" @click.stop="removePerson(person)" />
        </div>
      </div>

      <hr v-if="people.length && wishlists.length" class="my-2">

      <div v-if="wishlists.length" class="space-y-2">
        <p class="font-medium text-sm text-gray-500">Wishlist</p>
        <div v-for="wishlist in wishlists" :key="wishlist.name" class="flex items-center justify-between cursor-pointer">
 
          <div class="flex items-center space-x-2" @click="viewWishlist(wishlist,wishlist.username )">
            <img :src="wishlist.photo || '/assets/wishlist-category-placeholder.svg'" class="w-8 h-8 object-cover" alt="Wishlist Icon">
            <div>
              <span class="text-sm text-gray-700">{{ wishlist.name }}</span>
              <p class="text-xs text-gray-500">{{ wishlist.username }} • {{ wishlist.wishes }} Wishes</p>
            </div>
          </div>
          <img src="/assets/close-5.svg" class="w-4 h-4 cursor-pointer" alt="Close Icon" @click.stop="removeWishlist(wishlist)" />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-8">
      <p class="text-gray-500">Oops... No search results found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentSearchList",
  props: {
    people: Array,
    wishlists: Array
  },
  methods: {
    viewWishlist(wishlist,wishlistUser) {

      window.location.href = this.$router.resolve({
        name: "Wishlist",
        params: { id: wishlist.id , username: wishlistUser},
      }).href;




    },
    viewPerson(person) {
      this.$emit('selectResult', person, 'people');
      window.location.href = this.$router.resolve({ name: 'UsersProfile', params: { username: person.username } }).href;
    },
    removePerson(person) {
      this.$emit('removePerson', person);
    },
    removeWishlist(wishlist) {
      this.$emit('removeWishlist', wishlist);
    }
  }
};
</script>
