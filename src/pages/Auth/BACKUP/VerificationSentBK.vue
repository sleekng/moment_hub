<template>
<div class="flex justify-center items-center min-h-screen bg-gray-100 p-8">
    <div class="w-full max-w-6xl min-h-[80vh] flex bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Left Side: Form -->
        <div class="w-1/2 p-8 flex flex-col justify-center items-center">
            <!-- Logo -->
            <div class="mb-8">
                <img src="/assets/Logo.svg" alt="Logo" class="w-full" />
            </div>

            <div class="flex justify-center w-full">
                <h2 class="text-2xl font-bold mb-4 text-gray-800 text-left">
                    Verify your Email Address
                </h2>
            </div>
            <p class="text-gray-600 mb-8 text-center">
                Hooray! We’ve sent a verification link to your email!🚀 Check your inbox (and maybe your spam folder) to find the magic link. Click it to unlock your account and join the wishlist fun! Happy gifting! ✨
            </p>

            <div class="text-center text-sm text-gray-600 mt-4">
                Didn’t get a code?
                <span v-if=" countdown > 0" class="text-red-600 resend-count-down">Resend in {{ countdown }}s</span>
            </div>

            <button class="max-w-fit px-24 py-3 mt-8 bg-primaryColor text-white font-semibold text-lg rounded-full shadow-lg" :class="opacity" :disabled="countdown > 0" @click="resendCode">
                Resend Code
            </button>
        </div>

        <!-- Right Side: Image -->
        <div class="w-4/6 relative flex justify-center p-4 items-end bg-gradient-to-r from-pink-300 to-blue-300 rounded-2xl" style="background-image: url('/assets/verification-image.svg'); background-position: center center; background-size: cover;"></div>
    </div>
</div>
</template>

  
<script>
export default {
    data() {
        return {
            countdown: 30, // Initial countdown in seconds
            opacity: 'opacity-40'
        };
    },
    mounted() {
        this.startCountdown();
    },
    methods: {
        startCountdown() {
            const interval = setInterval(() => {
                if (this.countdown == 0) {
                    this.opacity = 'opacity-100'
                }
                if (this.countdown > 0) {
                    this.opacity = 'opacity-40'
                    this.countdown -= 1;
                } else {
                    clearInterval(interval); // Stop countdown when it reaches zero
                }
            }, 1000); // Decrease every 1 second
        },
        resendCode() {
            // Logic for resending the verification code goes here.
            alert("Verification code resent!");
            this.countdown = 30; // Reset countdown
            this.startCountdown(); // Restart the countdown
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
    background: radial-gradient(circle,
            rgba(239, 151, 252, 1) 36.9%,
            rgba(78, 249, 255, 1) 16.7%,
            rgba(161, 197, 255, 1) 8.24%,
            rgba(241, 146, 255, 1) 105.84%);
    position: relative;
}

.fade {
    background: radial-gradient(circle,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.28) 59%,
            rgba(255, 255, 255, 0));
}

.login-side-advert {
    box-shadow: -5px -5px 250px 0px #ffffff05 inset;
    background: radial-gradient(199.2% 299.24% at -16.97% -72.08%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.28) 59.24%,
            rgba(255, 255, 255, 0) 83.7%);
    padding: 24px 24px 23px 24px;
    gap: 0px;
    border-radius: 20px;
    border: 2px solid;
    border-image-source: linear-gradient(169.15deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(254, 254, 254, 0.2) 96.79%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
</style>
