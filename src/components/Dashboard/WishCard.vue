<template>
  <div class="relative">
    <!-- Overlay to disable interactions if wish is archived -->
    <div
      v-if="wish.archived"
      class="absolute inset-0 bg-gray-500 bg-opacity-0 z-50 cursor-not-allowed lg:min-w-[286px]"
    ></div>


    <div
      @click="preview"
         
      class="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden relative card group flex-shrink-0 md:w-auto h-[208px] lg:min-h-[360px] lg:min-w-[286px]"
    >
      <div class="lg:relative">

        <img
          :src="wish.photo || `/assets/` + wish.wishlist.category.slug + `.svg`"
          alt="Wish Item"
          class="w-full h-[360px] object-cover"
        />



        <!-- Reserve wish -->

        <div v-if="status != 'saved' && wish.received == false" >

          <button
            @click.stop="toggleMenu"
            v-if="
              (isWishOwner && (wish.status === null || wish.status === 'reserved') && !wish.delivery_address) ||  (wish.status === 'reserved' && isDashboard) || (wish.status === 'fulfiled')
            "
            class="absolute z-30 top-3 right-2 p-1 bg-gray-200 rounded-full toggle-menu-button transition-opacity opacity-0 group-hover:opacity-100  lg:inline-flex"
          >
            <img src="/assets/frame-1618868216.svg" alt="Menu" class="h-6 w-6" />
          </button>
        </div>
        

        <div
          v-if="!isWishOwner && wish.status === null && !wish.delivery_address && !isDashboard"
          class="absolute z-30 top-3 right-2 w-full inline-flex justify-end toggle-menu-button transition-opacity opacity-0 group-hover:opacity-100"
        >
          <button
       
              @click.stop="reserveWish"
            :disabled="isReserving"
            :class="[
              'px-4 py-1 lg:px-8 lg:py-3 rounded-full text-sm lg:text-base',
              isReserving
                ? 'bg-primaryColor text-white hover:shadow-lg cursor-not-allowed'
                : 'bg-primaryColor text-white hover:shadow-lg',
            ]"
          >
            <span class="w-full flex justify-center">
              <span v-if="isReserving" class="absolute">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              Reserve Wish
            </span>
          </button>
        </div>




        <template
          v-if="
            isWishOwner &&
            (wish.status === null)
          "
        >
          <div
            v-if="isDropdownOpen && !isMobile"
           class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div
              @click.stop="$emit('editWish', wish)"
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer"
            >
              <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Edit wish</span
              >
            </div>
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200"
            >
              <img
                src="/assets/close-circle.svg"
                class="w-4 h-4"
                alt="Delete"
              />
              <span
                @click.stop="$emit('deleteWish', wish.id)"
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Delete</span
              >
            </div>
          </div>
        </template>


<!--         
        <template
          v-if="
            isWishOwner &&
            ( wish.status === 'reserved' || wish.status === 'fulfiled' )
          "
        >
          <div
            v-if="isDropdownOpen && !isMobile"
           class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div
              @click.stop="$emit('editWish', wish)"
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer"
            >
              <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Edit wishdd</span
              >
            </div>
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200"
            >
              <img
                src="/assets/close-circle.svg"
                class="w-4 h-4"
                alt="Delete"
              />
              <span
                @click.stop="$emit('deleteWish', wish.id)"
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Delete</span
              >
            </div>
          </div>
        </template>

 -->





        <template v-if="
            isWishOwner &&
            ( wish.status === 'reserved' || wish.status === 'fulfiled' ) && wish.received == false
          ">
          <div
            v-if="isDropdownOpen"
            @mouseleave="closeMenu"
            class="w-60 bg-white rounded-lg hidden lg:block shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div v-if="wish.status == 'reserved'"
              @click.stop="$emit('markAsFulfilled', wish)"
              class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer"
            >
              <i
                class="fa-light fa-solid fa-circle-check moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium"
                >Mark as fulfilled</span
              >
            </div>
            <div
              @click.stop="$emit('cancelReservation', wish)"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200"
            >
              <i
                class="fa-light fa-light fa-circle-xmark moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium"
                >Cancel reservation</span
              >
            </div>
          </div>
        </template>










        <!-- Status is null -->

        <!-- DropdownMenu Received  for Desktop  ,-->
       <!--  <template v-if="wish.status == 'received' && !isMobile">
          <div
            v-if="isDropdownOpen"
            @mouseleave="closeMenu"
            class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-gray-200"
            >
              <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Edit wishdd</span
              >
            </div>
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200"
            >
              <img
                src="/assets/close-circle.svg"
                class="w-4 h-4"
                alt="Delete"
              />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Delete</span
              >
            </div>
          </div>
        </template>
         -->
 

        <!-- DropdownMenu Reserved for Desktop -->
        <template v-if="wish.status == 'reserved' && isDashboard && !isMobile && status != 'saved'">
          <div
            v-if="isDropdownOpen"
            @mouseleave="closeMenu"
            class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div
              @click.stop="$emit('markAsFulfilled', wish)"
              class="flex relative items-center p-2 group moment-text-effect-parent cursor-pointer"
            >
              <i
                class="fa-light fa-solid fa-circle-check moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 moment-text-effect-child w-full font-medium"
                >Mark as fulfilled</span
              >
            </div>
            <div     @click.stop="showAddToWishlistModal"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-gray-200"
            >
              <i class="fa-regular fa-gift moment-text-effect-child"></i>
              <span
                class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium"
                >Add to my wishlist</span
              >
            </div>
            <div
              @click.stop="$emit('cancelReservation', wish)"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200"
            >
              <i
                class="fa-light fa-light fa-circle-xmark moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium"
                >Cancel reservation</span
              >
            </div>
          </div>
        </template>

        <!-- DropdownMenu FulFilled for Desktop not isGifter -->
        <template v-if=" !isWishOwner && (wish.status == 'fulfiled' &&   loggedInUser != wish.gifter?.username ) && !isMobile && status != 'saved'">
          <div
            v-if="isDropdownOpen"
            @mouseleave="closeMenu"
            class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
          <div
              @click.stop="toggleShareMenu"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200"
            >
              <i
                class="fa-light fa-light fa-circle-xmark moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium"
                >Share wish with friends</span
              >
            </div>
            <div
              @click.stop="showAddToWishlistModal"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-gray-200"
            >
              <i class="fa-solid fa-gift moment-text-effect-child"></i>
              <span class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium">
                Add to my wishlist
              </span>
            </div>
         
          </div>
        </template>

        
        
        <!-- DropdownMenu FulFilled for Desktop isGifter -->
        <template v-if="(wish.status == 'fulfiled' &&   loggedInUser == wish.gifter?.username ) && !isMobile && status != 'saved'">
          <div
            v-if="isDropdownOpen"
            @mouseleave="closeMenu"
            class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
          <div
              @click.stop="showAddToWishlistModal"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-gray-200"
            >
              <i class="fa-solid fa-gift moment-text-effect-child"></i>
              <span class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium">
                Add to my wishlist
              </span>
            </div>
            <div
              @click.stop="$emit('removeFromFulfiled', wish.id)"
              class="flex items-center p-2 group moment-text-effect-parent cursor-pointer border-t border-gray-200"
            >
              <i
                class="fa-light fa-light fa-circle-xmark moment-text-effect-child"
              ></i>
              <span
                class="ml-2 text-gray-800 w-full moment-text-effect-child font-medium"
                >Remove from fulfilled</span
              >
            </div>
          </div>
        </template>
        
        <!-- DropdownMenu myWishes -->
        <!-- <template v-if="wish.status == null">
                <div v-if="isDropdownOpen" @mouseleave="closeMenu" class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4">
                    <div class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer">
                        <img src="/assets/share.svg" class="w-4 h-4" alt="Share" />
                        <span class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium">Share wishlist with friends</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200">
                        <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
                        <span class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium">Edit wishlist</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200">
                        <img src="/assets/close-circle.svg" class="w-4 h-4" alt="Delete" />
                        <span class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium">Delete</span>
                    </div>
                </div>
            </template> -->
      </div>

      <!-- Received Indicator -->
      <div
        v-if="wish.status == 'received'"
        class="absolute top-4 left-2 lg:left-4 bg-green-100 text-green-800 py-1 px-2 lg:px-4 rounded-full flex items-center"
      >
        <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
        <span class="font-medium text-sm">Received</span>
      </div>

      <!-- Reserved Indicator -->
      <div
        v-if="wish.status == 'reserved' && status != 'saved'"
        class="absolute top-4 left-2 lg:left-4 bg-[#FEF8EF] text-[#DE900B] py-1 px-2 lg:px-4 rounded-full flex items-center"
      >
        <i class="fa-light mr-2 fa-solid fa-circle-check"></i>

        <span v-if="isDashboard" class="font-medium text-xs lg:text-sm"
          >Reserved by you</span
        >
        <span v-else class="font-medium text-sm">Reserved</span>
      </div>

      <!-- FulFilled wish indicator with owner view and received Indicator -->
      <div
        v-if="isWishOwner && wish.status == 'fulfiled' && wish.received"
        class="absolute top-4 left-2 lg:left-4 bg-[#EFF9F3] text-[#1FB356] py-1 px-2 lg:px-4 rounded-full flex items-center"
      >
        <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
        <span class="font-medium text-xs lg:text-sm">Received</span>
      </div>

      <!-- FulFilled wish indicator with owner view and received Indicator -->
      <div
        v-if="isWishOwner && wish.status == 'fulfiled' && !wish.received"
        class="absolute top-4 left-2 lg:left-4 bg-[#EFF9F3] text-[#1FB356] py-1 px-2 lg:px-4 rounded-full flex items-center"
      >
        <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
        <span class="font-medium text-xs lg:text-sm">Fulfilled</span>
      </div>

      <!-- FulFilled wish indicator with none owner viewing -->
      <div v-if="!isDashboard">
        <div
          v-if="
       
            wish.status == 'fulfiled'
            && wish.received == true
          "
          class="absolute top-4 left-2 lg:left-4 bg-[#EFF9F3] text-[#1FB356] py-1 px-2 lg:px-4 rounded-full flex items-center"
        >
          <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
          <span class="font-medium text-xs lg:text-sm">Received</span>
        </div>
      </div>

      <!-- FulFilled wish indicator with none owner viewing and nonGifter -->
      <div v-if="!isDashboard">
        <div
          v-if="
       
            wish.status == 'fulfiled'
            && wish.received == false
          "
          class="absolute top-4 left-2 lg:left-4 bg-[#EFF9F3] text-[#1FB356] py-1 px-2 lg:px-4 rounded-full flex items-center"
        >
          <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
          <span class="font-medium text-xs lg:text-sm">FulFilled</span>
        </div>
      </div>

      <!-- FulFilled wish indicator with none owner viewing on Dashboard -->
      <div v-if="isDashboard">
        <div
          v-if="!isWishOwner && wish.status == 'fulfiled' && status != 'saved'"
          class="absolute top-4 left-2 lg:left-4 bg-[#EFF9F3] text-[#1FB356] py-1 px-2 lg:px-4 rounded-full flex items-center"
        >
          <i class="fa-light mr-2 fa-solid fa-circle-check"></i>
          <span class="font-medium text-xs lg:text-sm">Fulfilled by you</span>
        </div>
      </div>
  

      <!-- Saved Indicator -->
      <div
        v-if="status == 'saved'"
        class="absolute top-4 left-2 lg:left-4 bg-primaryMainBright text-primaryColor py-1 px-2 lg:px-4 rounded-full flex items-center"
      >
      
        <span class="font-medium text-xs lg:text-sm">{{ wish.wishlist.category.name }} wishlist</span>
      </div>

      <div
        class="absolute bottom-0 left-0 p-2 lg:p-4 bg-gradient-to-t from-black to-transparent w-full text-white"
      >
        <div v-if="!isDashboard" class="w-auto">
          <!-- priority check Low -->

          <div
            v-if="wish.priority == 'low'"
            class="inline-flex items-center bg-[#FAFFFF] border border-[#37B1B5] text-[#37B1B5] text-[12px] lg:text-sm whitespace-nowrap font-medium py-1 px-2 rounded-full"
          >
            {{ wish.priority }} priority
            <img src="/assets/gift.svg" alt="Fire" class="ml-2 w-4 h-4" />
          </div>

          <!-- priority check Medium -->

          <div
            v-if="wish.priority == 'medium'"
            class="inline-flex items-center bg-[#FCF8EE] border border-[#DAA520] text-[#DAA520] text-[12px] lg:text-sm whitespace-nowrap font-medium py-1 px-2 rounded-full"
          >
            {{ wish.priority }} priority
            <img src="/assets/star.svg" alt="Fire" class="ml-2 w-4 h-4" />
          </div>

          <!-- priority check High -->

          <div
            v-if="wish.priority == 'high'"
            class="inline-flex items-center bg-red-100 border border-red-600 text-red-600 text-[12px] lg:text-sm whitespace-nowrap font-medium py-1 px-2 rounded-full"
          >
            {{ wish.priority }} priority
            <img
              src="/assets/frame-1618868307.svg"
              alt="Fire"
              class="ml-2 w-4 h-4"
            />
          </div>

        </div>

        
        <h2 class="text-sm lg:text-lg font-semibold">{{ wish.name.split(' ').slice(0, isMobile ? 2 : 4).join(' ') }}{{ wish.name.split(' ').length > (isMobile ? 2 : 4) ? '...' : '' }}</h2>
        <p v-if="wish.amount" class="text-sm md:text-lg">
          {{ getCurrencySymbol(wish.currency) }} {{ formattedAmount }}
        </p>
        <div class="flex justify-between items-center mt-2">
          <div class="flex items-center" @click.stop="toggleLike">
            <i
              :class="
                wish.liked_by_me
                  ? 'fa-solid fa-heart text-red-500'
                  : 'fa-light fa-heart'
              "
              class="mr-1 text-[14px]"
            ></i>
            <span>{{ wish.likes_count }}</span>
          </div>
          <div class="flex space-x-2 md:space-x-4">
            <button 
              @click.stop="toggleSaveWish"
              class="border-white border w-8 h-8 lg:w-10 lg:h-10 rounded-full focus:outline-none shadow-sm"
            >
              <i
                :class="isWishSaved ? 'fas fa-bookmark' : 'far fa-bookmark'"
                class="w-3 h-3 md:w-5 md:h-5"
              ></i>
            </button>
            <button
              @click.stop="toggleShareMenu"
              class="border-white w-8 h-8 lg:w-10 lg:h-10 border p-1 md:p-2 rounded-full focus:outline-none shadow-sm"
            >
              <i class="fa-light fa-share-nodes w-3 h-3 md:w-5 md:h-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div
      v-if="isShareMenuOpen"
      @click.stop
      class="fixed inset-0 flex p-4 items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          @click.stop="toggleShareMenu"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="flex space-x-4 items-center pb-2">
          <span class="font-bold text-lg">Share with friends</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-4">
          <button
            @click.stop="copyLink"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
          <button
            @click.stop="shareToEmail"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fas fa-envelope"></i>
            <span>Share to Email</span>
          </button>
          <button
            @click.stop="shareToWhatsApp"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-whatsapp"></i>
            <span>Share to Whatsapp</span>
          </button>
          <button
            @click.stop="shareToTwitter"
            class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg"
          >
            <i class="fab fa-twitter"></i>
            <span>Share to Twitter</span>
          </button>
          <div class="lg:col-span-2 lg:inline-flex lg:justify-center w-full">
            <button
              @click.stop="shareToFacebook"
              class="flex items-center space-x-2 p-2 border hover:bg-gray-100 rounded-lg lg:w-auto w-full"
            >
              <i class="fab fa-facebook"></i>
              <span>Share to Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    

            <!-- DropdownMenu Reserved as Modal on Mobile -->
        <div v-if="isDropdownOpen && isMobile && !isDashboard && isWishOwner && wish.status == null" class="fixed px-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click.stop="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4">
              <div
              @click.stop="$emit('editWish', wish)"
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer"
            >
              <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Edit wish</span
              >
            </div>
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200"
            >
              <img
                src="/assets/close-circle.svg"
                class="w-4 h-4"
                alt="Delete"
              />
              <span
                @click.stop="$emit('deleteWish', wish.id)"
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Delete</span
              >
            </div>
            </div>
          </div>
        </div>


        
            <!-- DropdownMenu Reserved as Modal on Mobile -->
        <div v-if="isDropdownOpen && isMobile && !isDashboard && (wish.status == 'reserved' || wish.status == 'fulfiled') && isWishOwner" class="fixed px-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click.stop="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4" >
              <div v-if="wish.status == 'reserved'" @click.stop="$emit('markAsFulfilled', wish)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-solid fa-circle-check"></i>
                <span class="ml-2 text-gray-800 font-medium">Mark as fulfilled</span>
              </div>
              <div @click.stop="$emit('cancelReservation', wish)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-light fa-circle-xmark"></i>
                <span class="ml-2 text-gray-800 font-medium">Cancel reservation</span>
              </div>
            </div>
          </div>
        </div>


            <!-- DropdownMenu Reserved as Modal on Mobile -->
        <div v-if="isDropdownOpen && isMobile && isDashboard && wish.status == 'reserved'" class="fixed px-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click.stop="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4">
              <div @click.stop="$emit('markAsFulfilled', wish)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-solid fa-circle-check"></i>
                <span class="ml-2 text-gray-800 font-medium">Mark as fulfilled</span>
              </div>
              <div     @click.stop="showAddToWishlistModal" class="flex items-center p-2 cursor-pointer">
                <i class="fa-regular fa-gift"></i>
                <span class="ml-2 text-gray-800 font-medium">Add to my wishlist</span>
              </div>
              <div @click.stop="$emit('cancelReservation', wish)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-light fa-circle-xmark"></i>
                <span class="ml-2 text-gray-800 font-medium">Cancel reservation</span>
              </div>
            </div>
          </div>
        </div>

                <!-- DropdownMenu Fulfilled as Modal on Mobile -->
         <div v-if="isDropdownOpen && isMobile && (wish.status == 'fulfiled' &&   loggedInUser == wish.gifter?.username ) && status != 'saved' " class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4">
              <div     @click.stop="showAddToWishlistModal" class="flex items-center p-2 cursor-pointer">
                <i class="fa-regular fa-gift"></i>
                <span class="ml-2 text-gray-800 font-medium">Add to my wishlist</span>
              </div>
              <div @click.stop="$emit('removeFromFulfiled', wish.id)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-light fa-circle-xmark"></i>
                <span class="ml-2 text-gray-800 font-medium">Remove from fulfilled</span>
              </div>
            </div>
          </div>
        </div>
                <!-- DropdownMenu Fulfilled as Modal on Mobile -->
         <div v-if="isDropdownOpen && isMobile && (wish.status == 'fulfiled' &&   loggedInUser == wish.gifter?.username ) && status != 'saved' " class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4">
              <div     @click.stop="showAddToWishlistModal" class="flex items-center p-2 cursor-pointer">
                <i class="fa-regular fa-gift"></i>
                <span class="ml-2 text-gray-800 font-medium">Add to my wishlist</span>
              </div>
              <div @click.stop="$emit('removeFromFulfiled', wish.id)" class="flex items-center p-2 cursor-pointer">
                <i class="fa-light fa-light fa-circle-xmark"></i>
                <span class="ml-2 text-gray-800 font-medium">Remove from fulfilled</span>
              </div>
            </div>
          </div>
        </div>

                <!-- DropdownMenu Received as Modal on Mobile -->
        <div v-if="isDropdownOpen && isMobile && wish.status == 'received'" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg p-6 relative max-w-sm w-full">
            <button @click="closeMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
            <div class="flex flex-col space-y-4">
              <div @click.stop="$emit('editWish', wish)" class="flex items-center p-2 cursor-pointer">
                <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
                <span class="ml-2 text-gray-800 font-medium">Edit wish</span>
              </div>
              <div @click.stop="$emit('deleteWish', wish.id)" class="flex items-center p-2 cursor-pointer">
                <img src="/assets/close-circle.svg" class="w-4 h-4" alt="Delete" />
                <span class="ml-2 text-gray-800 font-medium">Delete</span>
              </div>
            </div>
          </div>
        </div>

        
  <!--       <template
          v-if="
            isWishOwner &&
            (wish.status === null || wish.status === 'reserved') &&
            !wish.delivery_address
          "
        >
          <div
            v-if="isDropdownOpen && isMobile"
           class="w-60 bg-white rounded-lg shadow-lg p-2 border border-gray-200 absolute top-8 z-40 right-4"
          >
            <div
              @click.stop="$emit('editWish', wish)"
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer"
            >
              <img src="/assets/edit.svg" class="w-4 h-4" alt="Edit" />
              <span
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Edit wish</span
              >
            </div>
            <div
              class="flex items-center p-2 hover:bg-primaryMainBright cursor-pointer border-t border-gray-200"
            >
              <img
                src="/assets/close-circle.svg"
                class="w-4 h-4"
                alt="Delete"
              />
              <span
                @click.stop="$emit('deleteWish', wish.id)"
                class="ml-2 text-gray-800 w-full hover:text-primaryColor font-medium"
                >Delete</span
              >
            </div>
          </div>
        </template> -->

    <!-- Show this if url is dashboard -->
    <div v-if="isDashboard" class="flex  lg:flex-row flex-col lg:items-center lg:space-x-2 mt-2 pb-2">
        <div class="flex  items-center space-x-1">
            <span class="text-gray-600 font-normal  text-[14px]">For</span>
            <img :src="wish.wishlist.user.avatar" alt="Avatar" class="w-4 h-4 rounded-full">
            <span 
  class="text-primaryColor font-medium text-[14px] cursor-pointer"
  @click="goToUserProfile"
>
  @{{ wish.wishlist.user.username }}
</span>
        </div>
        <div class="flex items-center lg:space-x-1">
            <img src="/assets/ellipse-20.svg" alt="Ellipse" class="w-1 h-1 hidden lg:inline-block">
            <span class="text-gray-600 font-normal  text-[14px]"></span>
            
            <span class="font-medium text-gray-800 text-[14px]">
              <DateFormat :date="wish.created_at" :classList="'text-[14px]'" />
            </span>
        </div>
    </div> 
  </div>
</template>

<script>
import DateFormat from "./DateFormat.vue";
import { eventBus } from "@/eventBus.js";
import { isTokenExpired } from "@/router/index.js"; // Import the function

export default {
  name: "WishCard",
  components: {
    DateFormat,
  },

  props: {
    isReserving:{
            type: Boolean,
            default: false,
        },
    loggedInUser: {
      type: [String, Number], // Accept both string and number since ID might be either
      required: true,
    },
    wish: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
    },
    openDropdownId: {
      required: true,
    },
  },
  emits: [
    "preview",
    "deleteWish",
    "toggleDropdown",
    "closeDropdown",
    "editWish",
    "cancelReservation",
    "markAsFulfilled",
  ], // Declare emits
  data() {
    return {
      currencySymbols: {
        NGN: '₦',
        USD: '$',
        EUR: '€',
        GBP: '£',
        CAD: 'C$',
        GHS: '₵'
      },
      savedwishes: [],

      isShareMenuOpen: false,
      isMobile: window.innerWidth <= 768, // Detect mobile screen
    };
  },
  computed: {
    isLoggedIn() {
      // Check if the user is logged in by verifying the token
      return localStorage.getItem('authToken') && !isTokenExpired();
    },
    formattedAmount() {
      return parseFloat(this.wish.amount).toLocaleString("en-US");
    },
    isWishOwner() {
      if (this.wish.wishlist.user?.username) {
        return this.wish.wishlist.user?.username === this.loggedInUser;
      }
    },
    isDashboard() {
      return this.$route.path === "/dashboard";
    },
    isDropdownOpen() {
      return this.openDropdownId === this.wish.id;
    },
    isWishSaved() {
      return this.savedwishes.some(
        (savedWish) => savedWish.id === this.wish.id
      );
    },
  },
  mounted() {
 
    if (this.isLoggedIn) {
      this.fetchSavedWishes();
    }
    window.addEventListener("resize", this.handleResize);
    console.log(this.wish);
    
    
    
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    showAddToWishlistModal() {
      this.$emit('showAddToWishlistModal', this.wish);
    },

    goToUserProfile() {
    this.$router.push({ 
      path: `/${this.wish.wishlist.user.username}`, 
      name: 'UsersProfile', 
      params: { username: this.wish.wishlist.user.username } 
    });
  },
    redirectToLogin() {
      this.$router.push('/login');
    },
    getCurrencySymbol(currency) {
      return this.currencySymbols[currency] || currency;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    },
    async fetchSavedWishes() {
      try {
        const response = await this.$axios.get(
          `${this.$baseURL}/saved-wishes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.savedwishes = response.data.data || [];
      } catch (error) {
        console.error("Error fetching saved wishes:", error);
        this.savedwishes = []; // Ensure it remains an array if the API call fails
      }
    },

    toggleShareMenu() {
      this.isShareMenuOpen = !this.isShareMenuOpen;
    },
    copyLink() {
      const wishUrl = `${window.location.origin}/wish/${this.wish.id}`;
      const message = this.isWishOwner 
        ? `Hey there! I'd love for you to check out my wish on Moments Hub: ${wishUrl}`
        : `Check out this wish: ${wishUrl}`;
      navigator.clipboard.writeText(message).then(() => {
        eventBus.onSuccess("Wish link copied to clipboard!");
      });
    },
    shareToEmail() {
      const wishUrl = `${window.location.origin}/wish/${this.wish.id}`;
      const subject = encodeURIComponent(
        this.isWishOwner
          ? `Check out my wish on Moments Hub`
          : `Check out this wish: ${this.wish.name}`
      );
      const body = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wish on Moments Hub: ${wishUrl}`
          : `Check out this wish: ${wishUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
    shareToWhatsApp() {
      const wishUrl = `${window.location.origin}/wish/${this.wish.id}`;
      const text = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wish on Moments Hub: ${wishUrl}`
          : `Check out this wish: ${wishUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    },
    shareToTwitter() {
      const wishUrl = `${window.location.origin}/wish/${this.wish.id}`;
      const text = encodeURIComponent(
        this.isWishOwner
          ? `Hey there! I'd love for you to check out my wish on Moments Hub: ${wishUrl}`
          : `Check out this wish: ${wishUrl}`
      );
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    },
    shareToFacebook() {
      const wishUrl = `${window.location.origin}/wish/${this.wish.id}`;
      const url = encodeURIComponent(wishUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },
    toggleMenu() {
      this.$emit("toggleDropdown", this.wish.id);
    },

    async toggleSaveWish() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      eventBus.setLoading(true);
      try {
        const response = await this.$axios.post(
          `${this.$baseURL}/saved-wishes`,
          {
            wish_id: this.wish.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        // Update the savedwishes array immediately
        if (!this.isWishSaved) {
          this.savedwishes.push({ id: this.wish.id });
        } else {
          this.savedwishes = this.savedwishes.filter(
            (savedWish) => savedWish.id !== this.wish.id
          );
        }

/*         if (this.isDashboard) {
          await this.$axios.put(
            `${this.$baseURL}/wishes/${this.wish.id}`,
            { status: null },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
        } */

        this.fetchSavedWishes();
        eventBus.onSuccess(response.data.message);
        this.$emit("updateSavedStatus", this.wish.id, this.isWishSaved);

        this.wish.status = null;
        if (this.isDashboard) {
          this.$emit("newUpdate");
        }
      } catch (error) {
        console.error("Error Saving Wish:", error);
        const errorMsg =
          error.response?.data?.message ||
          "Error Saving Wish. Please try again.";
        eventBus.onError(errorMsg);
      } finally {
        eventBus.setLoading(false);
      }
    },

    
    reserveWish() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.$emit('reserveWish', this.wish)
    },


/*     async reserveWish() {
      return console.log("Reserve wish");
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.isReserving = true; // Start loading state
      try {
        await this.$axios.put(
          `${this.$baseURL}/wishes/${this.wish.id}`,
          { status: "reserved" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (this.isDashboard) {
          await this.$axios.post(
            `${this.$baseURL}/saved-wishes`,
            {
              wish_id: this.wish.id,
            },
            {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.getAuthToken()}`
            },
            }
          );
        }

        this.wish.status = "reserved";
        this.$emit("reserved", this.wish);

        if (this.isDashboard) {
          this.$emit("newUpdate");
        }
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
        

      } finally {
        this.isReserving = false; // End loading state
      }
    }, */
    getAuthToken() {
        return localStorage.getItem('authToken') || '';
      },
    preview() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      this.$emit("preview", this.wish.id, this.isWishSaved);
    },
    closeMenu() {
      this.$emit("closeDropdown", this.wish.id);
    },

    async toggleLike() {
      if (!this.isLoggedIn) {
        this.redirectToLogin();
        return;
      }
      try {
        const likeStatus = !this.wish.liked_by_me;
        const response = await this.$axios.put(
          `${this.$baseURL}/wishes/${this.wish.id}`,
          {
            like: likeStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (response.data.success) {
          this.wish.liked_by_me = response.data.data.liked_by_me;
          this.wish.likes_count = response.data.data.likes_count;
        }
      } catch (error) {
        console.error("Error toggling like status:", error);
        eventBus.onError("Failed to update like status.");
      }
    },
  },
};
</script>

<style scoped>
.group:hover .toggle-menu-button {
  opacity: 1;
}

.loader {
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
