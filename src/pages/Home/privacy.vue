<template>
    <div class="bg-primaryBackground">
      <!-- Header section -->
      <header class="flex lg:sticky top-0 bg-primaryBackground z-[90] justify-between items-center p-4 lg:px-8">
        <a href="/"><img src="/assets/Logo-1.svg" alt="Logo" class="w-24 h-10"></a>
        <div v-if="loggedIn" class="flex space-x-4">
          <RouterLink to="/Login" class="bg-secondaryColor hover:shadow-lg text-white py-2 px-4 sm:px-4 rounded-full text-sm sm:text-base">Log in</RouterLink>
          <RouterLink to="/create-option" class="bg-primaryColor hover:shadow-lg text-white py-2 px-4 sm:px-4 rounded-full text-sm sm:text-base">Sign up</RouterLink>
        </div>
        <div v-else class="flex space-x-4">
          <RouterLink to="/dashboard" class="text-gray-900 py-2 px-2 sm:px-2 rounded-full font-bold text-sm sm:text-base">Dashboard</RouterLink>
        </div>
      </header>
  
      <!-- Main content -->
      <div class="flex flex-col w-full min-h-screen pt-10 px-4 lg:px-36 box-border">
        <header class="flex flex-col items-center gap-3 w-full min-w-[320px] text-center">
          <h1 class="font-mukta font-semibold text-xl sm:text-xl lg:text-6xl leading-tight text-[#271e11] m-0">
            Moments Hub Privacy Policy
          </h1>
          <p class="font-mukta font-semibold text-xl md:text-2xl lg:text-3xl leading-tight text-[#1e180f] m-0">
            Last Updated: 29th December, 2024
          </p>
        </header>
        <div class="flex flex-col flex-grow gap-6 mt-10">
          <!-- Privacy Policy Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">1.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Information We Collect
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                We collect both personal and non-personal information to provide and improve our services. This includes:
              </p>
              <ul class="list-disc pl-5">
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                    Personal Information: When you sign up, we may collect your name, email address, and other details you provide.</li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                    Usage Data: Information about how you use the platform, such as the wish lists you create, share, and explore.</li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                    Device Information: Data about the device you use to access Moment Hub, including browser type, IP address, and device identifiers.</li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                    Cookies: We use cookies to improve your experience on the platform and to collect anonymous data on usage patterns.</li>
              </ul>
            </div>
          </div>
  
          <!-- Usage Information Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">2.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                How We Use Your Information
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                We use the collected information for the following purposes:
              </p>
              <ul class="list-disc pl-5">
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  To provide, maintain, and improve the platform.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  To personalize your experience and suggest relevant wish list items.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  To communicate with you about updates, features, and services related to Moment Hub.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  To protect the security and integrity of our platform.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  To respond to your inquiries and support requests.
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Data Sharing Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">3.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Data Sharing and Disclosure
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                Moment Hub does not sell or share your personal information with third parties for marketing purposes. However, we may share your data in the following situations:
              </p>
              <ul class="list-disc pl-5">
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  <strong>Service Providers:</strong> We may engage trusted third-party companies to perform services on our behalf, such as hosting and analytics, and they will have access to your information only to the extent necessary to provide their services.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  <strong>Legal Compliance:</strong> We may disclose your information if required by law or in response to legal processes, such as subpoenas or court orders.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  <strong>Business Transfers:</strong> If Moment Hub undergoes a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Data Security Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">4.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Data Security
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                We take reasonable precautions to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </div>
          </div>
  
          <!-- Rights and Choices Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">5.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Your Rights and Choices
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                As a user, you have the following rights:
              </p>
              <ul class="list-disc pl-5">
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  Access and Correction: You can request access to your personal information and request corrections or updates.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  Data Deletion: You may request the deletion of your account and personal information by contacting us at <a href="mailto:momentshub.wishes@gmail.com">momentshub.wishes@gmail.com</a>.
                </li>
                <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                  Opt-Out of Communications: You can opt-out of promotional emails by following the unsubscribe link provided in the emails.
                </li>
              </ul>
            </div>
          </div>
  
          <!-- International Data Transfers Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">6.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                International Data Transfers
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                Moment Hub is a global platform, and your data may be transferred to, stored, and processed in countries outside of your own. By using the platform, you consent to these transfers, which may be subject to different privacy laws.
              </p>
            </div>
          </div>
  
          <!-- Children's Privacy Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">7.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Children's Privacy
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                Moment Hub is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child under 13, please contact us immediately at [momentshub.wishes@gmail.com], and we will take steps to delete such information.
              </p>
            </div>
          </div>
  
          <!-- Policy Changes Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">8.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Changes to This Privacy Policy
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant updates through email or platform notifications. Please review this policy periodically for any changes.
              </p>
            </div>
          </div>
  
          <!-- Contact Us Section -->
          <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
            <div class="flex flex-row gap-3.5 w-full items-center">
              <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">9.</span>
              <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                Contact Us
              </h2>
            </div>
            <div class="flex flex-col gap-2 pt-3">
              <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                If you have any questions or concerns about this Privacy Policy or the way we handle your data, please contact us at:<br>
                Email: momentshub.wishes@gmail.com<br>
                By using Moment Hub, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <footer class="w-full h-auto relative mt-10 py-10  overflow-hidden bg-[url('/assets/footer-mobile.svg')] bg-no-repeat bg-cover lg:bg-[url('/assets/footer-bg.svg')]">
    <div class="max-w-[1440px] mx-auto py-8 px-4 lg:py-[73px] lg:px-[205px] flex flex-col lg:flex-row gap-4 lg:gap-[32px] relative">
      <!-- Left Section -->
      <div class="bg-white w-full lg:w-[374px] h-auto lg:h-[327px] rounded-[32px] p-6 lg:p-[32px] flex flex-col justify-between">
        <div>
          <img src="/assets/logo.svg" alt="Logo" class="w-[127px] h-[45.96px] lg:w-[173px] lg:h-[62.6px]" />
          <div class="flex flex-col  gap-2 lg:gap-[8px] p-1 lg:p-[4px] mt-8 lg:mt-[32px] cursor-pointer">
            <a href="/privacy" class="text-lg lg:text-xl border-b border-black pb-1 lg:pb-2 font-bold text-[#240328]">Privacy policy →</a>
            <a href="/terms-condition" class="text-lg lg:text-xl border-b border-black pb-1 lg:pb-2 font-bold text-[#240328]">Terms and Conditions →</a>
          </div>
          
        </div>
        <div class="font-mukta text-[14px] lg:text-[16px] text-[#404040]">
          © 2024 All Rights Reserved. Moments hub
        </div>
      </div>

      <!-- Middle Section -->
      <div class="bg-white w-full lg:w-[451px] h-auto lg:h-[327px] rounded-[32px] p-6 lg:p-[41px_32px] flex items-center">
        <h1 class="font-mukta text-[44px] lg:text-[65px] font-extrabold leading-[50px] lg:leading-[70px] text-[#271e11]">
          Where<br />
          wishlists<br />
          come alive!
        </h1>
      </div>

      <!-- Right Section -->
      <div class="bg-white w-full lg:w-[140.69px] h-auto lg:h-[327px] rounded-[32px] p-6 lg:p-[44px_46px] flex flex-row lg:flex-col justify-between">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook text-gray-800 text-5xl hover:text-gray-600"></i>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-x-twitter text-gray-800 text-5xl hover:text-gray-600"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram text-gray-800 text-5xl hover:text-gray-600"></i>
        </a>
      </div>

      <!-- Back to Top Button -->
      <button @click="scrollToTop" class="lg:absolute bottom-[67px] right-[108px] rounded-full bg-transparent flex items-center justify-center cursor-pointer">
        <img src="/assets/back-to-top.svg" alt="Back to top" class="w-[60px] h-[60px]" />
      </button>
    </div>
  </footer>

    </div>
  </template>
  
  <script>
  import { isTokenExpired } from '@/router/index.js';
  
  export default {
    name: 'Privacy',
    computed: {
      loggedIn() {
        return isTokenExpired();
      }
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  </script>
  
  <style scoped>
  @import "https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600&display=swap";
  
  h1 {
    font-family: 'Mukta', sans-serif;
    font-size: 46px;
    letter-spacing: -0.02em;
  }
  
  p {
    font-family: 'Mukta', sans-serif;
    font-size: 16px;
  }
  
  button span {
    font-family: 'Mukta', sans-serif;
    font-size: 16px;
  }
  
  .smooth-rotate {
    animation: rotate-clockwise 40s linear infinite;
    animation-timing-function: linear;
  }
  
  @keyframes rotate-clockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @media (orientation: portrait) {
    h1 {
      font-family: 'Mukta', sans-serif;
      letter-spacing: -0.02em;
    }
  }
  
  @keyframes carousel {
    0% {
      transform: translateY(500%);
      opacity: 0;
    }
    25% {
      transform: translateY(500%);
      opacity: 0.2;
    }
    50% {
      transform: translateY(25%);
      opacity: 1;
    }
    100% {
      transform: translateY(-300%);
      opacity: 0;
    }
  }
  
  .animate-carousel div {
    animation: carousel 6s linear infinite;
    animation-delay: 2s;
    opacity: 0;
  }
  
  .animate-carousel div:nth-child(1) {
    animation-delay: 0s;
  }
  
  .animate-carousel div:nth-child(2) {
    animation-delay: 1s;
  }
  
  .animate-carousel div:nth-child(3) {
    animation-delay: 2s;
  }
  
  .animate-carousel div:nth-child(4) {
    animation-delay: 3s;
  }
  
  .animate-carousel div:nth-child(5) {
    animation-delay: 4s;
  }
  
  .animate-carousel div:nth-child(6) {
    animation-delay: 5s;
  }
  </style>
  