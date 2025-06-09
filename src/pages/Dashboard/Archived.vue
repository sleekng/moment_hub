<template>
    <div class="bg-white lg:bg-gray-100 py-10">
   <!--      <AppHeader @showCategoryModal="$emit('showCategoryModal')" /> -->
        <div v-if="!loading" class="px-4 lg:px-16 pt-10 lg:pt-20">

            <div class="text-2xl lg:px-12 rounded-t-lg py-4 bg-white  font-bold">
                Archived Wishlists
            </div>
            <div v-if="activeTab === 'myWishes'">
                <div v-if="wishlists.length > 0"
                    class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:px-12 py-8 rounded-b-lg bg-white">
                    <WishlistCard :user="user" @shareWishlist="shareWishlist" v-for="wishlist in wishlists"
                        :key="wishlist.id" :wishlist="wishlist" :openDropdownId="openDropdownId"
                        @toggleDropdown="handleToggleDropdown" @closeDropdown="handleCloseDropdown"
                        @deleteWishlist="handleDeleteWishlist" @editWishlist="handleEditWishlist"
                        @viewWishlist="navigateToArchivedWishlist(wishlist.id)" @wishlistArchived="wishlistArchived"/>
                </div>
                <div v-else>

                    <EmptyState title="No archived wishlist" message="Your archived wishlist will appear here."
                        @button-click="$emit('showCategoryModal')" :showButton="false" :userOwnsWishlist="true"
                        buttonText="Create Wishlist" />
                </div>
            </div>



            <DeleteConfirmationModal v-if="showDeleteModal" :title="'WishList'"
                :description="'Are you sure you want to delete this wishlist? This action cannot be undone.'"
                @confirm="confirmDelete" @cancel="cancelDelete" />
            <DeleteConfirmationModal v-if="showDeleteWishModal" :title="'Wish'"
                :description="'Are you sure you want to delete this wish? This action cannot be undone.'"
                @confirm="confirmDelete" @cancel="cancelDelete" />
        </div>
    </div>
    <Loader :show="loading" />
</template>

<script>
import EmptyState from '@/components/Dashboard/EmptyState.vue';
import Loader from '@/components/Loader.vue';
import WelcomeModal from '@/components/Dashboard/WelcomeModal.vue';
import { eventBus } from '@/eventBus.js';
import CreateWishModal from '@/components/Dashboard/CreateWishModal.vue';
import AppHeader from '@/components/Dashboard/AppHeader.vue';
import ProfileDetails from '@/components/Dashboard/ProfileDetails.vue';
import TabNavigationsWishlist from '@/components/Dashboard/TabNavigationsWishlist.vue';
import WishlistCard from '@/components/Dashboard/WishlistCard.vue';
import Congratulations from '@/components/Dashboard/Popup.vue';
import ReservedWishes from '@/components/Dashboard/ReservedWishes.vue';
import SavedWishes from '@/components/Dashboard/SavedWishes.vue';
import WishDetailView from '@/components/Dashboard/WishDetailView.vue';
import AnalyticsModal from '@/components/Dashboard/AnalyticsModal.vue';
import DeleteConfirmationModal from '@/components/Dashboard/DeleteConfirmationModal.vue';

export default {
    components: {
        WelcomeModal,
        Loader,
        EmptyState,
        CreateWishModal,
        AppHeader,
        DeleteConfirmationModal,
        ProfileDetails,
        TabNavigationsWishlist,
        WishlistCard,
        Congratulations,
        ReservedWishes,
        SavedWishes,
        WishDetailView,
        AnalyticsModal,
    },

    data() {
        return {
            showWelcomeModal: false,
            isWishSaved: false,
            isRequestingAddress: false,
            user: {
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                avatar: '',
                gender: '',
                dob: '',
                country: '',
                state: '',
                verified: false,
                friends_count: 0,
                likes_count: 0,
                wishlists_count: 0,
                friendship_id: null,
                friendship_status: null,
                token: ''
            },
            showBirthdayModal: false,
            showCreateWishModal: false,
            analyticsData: null,
            showAnalyticsModal: false,
            showPrevWish: null,
            showSavedPrevWish: null,
            showWishDetailsModal: false,
            wishToDelete: null,
            showInitialModal: false,
            openDropdownId: null,
            activeTab: 'myWishes',
            showDeleteModal: false,
            showDeleteWishModal: false,
            wishlistToDelete: null,
            wishlists: [],
            wishes: [],
            savedwishes: [],
            reservedWishes: [],
            loading: false,  // Add loading state

        };
    },
    computed: {
        filteredWishlist() {
            return this.wishlists.filter(wishlist => wishlist.status === this.activeTab);
        },
        filteredSavedWish() {
            return this.wishes.filter(wish => wish.status === this.activeTab);
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(newUser) {
                if (newUser.dob) {
                    const today = new Date();
                    const dob = new Date(newUser.dob);
                    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
                        this.showBirthdayModal = true;
                    }
                }
            }
        }
    },
    mounted() {
        this.loadUserData();

        if (this.user.username === null) {
            this.$router.push('/basic-info');
        }

        if (this.$route.query.showCongratulations === 'true') {
            this.showInitialModal = true;
        }
        // Show welcome modal once after registration
        if (!localStorage.getItem('welcomeShown')) {
            this.showWelcomeModal = true;
            localStorage.setItem('welcomeShown', 'true');
        }

        this.fetchAnalyticsData();

        this.loadData();

    },



    methods: {
        wishlistArchived(){
            this.loadData();
        },
        newUpdate() {

            this.loadUserData();

            this.loadData();
        },
        shareWishlist(wishlistId, wishlistUser) {
            this.$emit('shareWishlist', wishlistId, wishlistUser);
        },
        closeBirthdayModal() {
            this.showBirthdayModal = false;
        },
        closeWelcomeModal() {
            this.showWelcomeModal = false;
        },
        async unSaveWish(wish) {
            console.log(wish);

            eventBus.setLoading(true);
            try {
                await this.$axios.post(
                    `${this.$baseURL}/saved-wishes`, {
                    'wish_id': wish.id
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
                );

                eventBus.onSuccess('Wish Saved.');
                wish.status = null;
            } catch (error) {
                console.error("Error Saving Wish:", error);
                const errorMsg = error.response?.data?.message || 'Error Saving Wish. Please try again.';
                eventBus.onError(errorMsg);
            } finally {
                eventBus.setLoading(false);
            }
        },



        async requestAddress(wishID) {

            this.isRequestingAddress = true
            try {

                await this.$axios.post(`${this.$baseURL}/wishes/${wishID}/address`, {}, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });

                eventBus.onSuccess('Address request sent successfully.');

            } catch (error) {
                console.error("Error requesting address:", error);
                const errorMsg = error.response?.data?.message || 'Error requesting address. Please try again.';
            } finally {
                this.isRequestingAddress = false
            }
        },


        async loadData() {
            this.loading = true;  // Start loading
            try {
                await Promise.all([
                    this.fetchArchived(),
                ]);
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                this.loading = false;  // Stop loading
            }
        },

        loadUserData() {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                this.user = userData;
            }
        },


        navigateToArchivedWishlist(wishlistId) {
            this.$router.push({ name: 'ArchivedWishlist', params: { id: wishlistId } });
        },


        async handleDeleteWish(wishId) {
            this.wishToDelete = wishId;
            this.showDeleteWishModal = true;
        },



        AddWish(updatedWish) {
            const index = this.reservedWishes.findIndex(wish => wish.id === updatedWish.id);
            if (index !== -1) {
                this.reservedWishes.splice(index, 1, updatedWish);
            } else {
                this.wishes.push(updatedWish);
            }
            this.closeCreateWishModal();
        },


        async confirmDelete() {
            eventBus.setLoading(true);
            try {
                await this.$axios.delete(`${this.$baseURL}/wishes/${this.wishToDelete}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                this.loadData()


                eventBus.onSuccess('Wish deleted successfully.');
            } catch (error) {
                console.error('Error deleting wish:', error.response?.data?.message || error.message);
            } finally {
                eventBus.setLoading(false);
                this.showDeleteWishModal = false;
            }
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.showDeleteWishModal = false
        },



        closeCreateWishModal() {
            this.showCreateWishModal = false;
            this.editingWish = null;
        },

        openEditWishModal(wish) {
            this.editingWish = { ...wish }; // Ensure you pass a copy of the wish to avoid direct mutation
            this.showWishDetailsModal = false
            this.showCreateWishModal = true;
        },

        handleEditWishlist(wishlist) {
            this.$emit('showCreateWishlistModal', wishlist.category, wishlist);
        },

        async fetchArchived() {
            try {
                const response = await this.$axios.get(`${this.$baseURL}/archived-wishlists`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                this.wishlists = response.data.data;
            } catch (error) {
                console.error('Error fetching wishlists:', error.response?.data?.message || error.message);
            }
        },


        navigateToArchivedWishlist(wishlistId) {
            this.$router.push({ name: 'ArchivedWishlist', params: { id: wishlistId } });
        },
        async handleDeleteWishlist(wishlistId) {
            this.wishlistToDelete = wishlistId;
            this.showDeleteModal = true;
        },
        async confirmDelete() {
            eventBus.setLoading(true);
            try {
                await this.$axios.delete(`${this.$baseURL}/wishlists/${this.wishlistToDelete}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                this.loadData();
                eventBus.onSuccess('Wishlist deleted successfully.');
            } catch (error) {
                console.error('Error deleting wishlist:', error.response?.data?.message || error.message);
            } finally {
                eventBus.setLoading(false);
                this.showDeleteModal = false;
            }
        },

        closeAnalyticsModal() {
            this.showAnalyticsModal = false;
        },

        async fetchAnalyticsData() {
            try {
                const response = await this.$axios.get(`${this.$baseURL}/analytics`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                this.analyticsData = response.data.data;
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        },
        ToggleAnalyticsModal() {
            this.fetchAnalyticsData()
            this.showAnalyticsModal = true;
        },
        prevWish(wishId, isWishSaved) {
            this.showWishDetailsModal = true;
            this.isWishSaved = isWishSaved
            this.showPrevWish = this.reservedWishes.find(w => w.id === wishId);
        },
        savedPrevWish(wishId, isWishSaved) {
            this.showWishDetailsModal = true;
            this.isWishSaved = isWishSaved
            this.showSavedPrevWish = this.savedwishes.find(w => w.id === wishId);
        },
        closeWishDetailsModal() {
            this.showWishDetailsModal = false;
            this.showPrevWish = null;
        },
        closeInitialModal() {
            this.showInitialModal = false;
        },
        handleToggleDropdown(wishlistId) {
            this.openDropdownId = this.openDropdownId === wishlistId ? null : wishlistId;
        },
        handleCloseDropdown() {
            this.openDropdownId = null;
        },
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        handleSort({ sortBy, sortOrder }) {
            let arrayToSort = [];

            switch (this.activeTab) {
                case 'myWishes':
                    arrayToSort = this.wishlists;
                    break;
                case 'reserved':
                    arrayToSort = this.reservedWishes;
                    break;
                case 'saved':
                    arrayToSort = this.savedwishes;
                    break;
            }

            arrayToSort.sort((a, b) => {
                let comparison = 0;

                switch (sortBy) {
                    case 'title':
                        comparison = a.title.localeCompare(b.title);
                        break;
                    case 'name':
                        comparison = a.name.localeCompare(b.name);
                        break;
                    case 'amount':
                        comparison = (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0);
                        break;
                    case 'reserved_date':
                        comparison = new Date(a.reserved_at) - new Date(b.reserved_at);
                        break;
                    case 'saved_date':
                        comparison = new Date(a.created_at) - new Date(b.created_at);
                        break;
                    case 'event_date':
                        comparison = new Date(a.date) - new Date(b.date);
                        break;
                    case 'likes':
                        comparison = a.likes_count - b.likes_count;
                        break;
                    case 'views':
                        comparison = a.views_count - b.views_count;
                        break;
                    default:
                        comparison = 0;
                }

                return sortOrder === 'asc' ? comparison : -comparison;
            });
        },
    },
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