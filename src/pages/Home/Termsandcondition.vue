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
  
      <div class="flex flex-col w-full min-h-screen pt-10 px-4 lg:px-36 box-border">
         <header class="flex flex-col items-center gap-3 w-full min-w-[320px] text-center">
           <h1 class="font-mukta font-semibold text-xl sm:text-xl lg:text-6xl leading-tight text-[#271e11] m-0">
             Moments Hub Terms and Conditions.
           </h1>
           <p class="font-mukta font-semibold text-xl md:text-2xl lg:text-3xl leading-tight text-[#1e180f] m-0">
             Last Updated: 29th December, 2024
           </p>
         </header>
         <div class="flex flex-col flex-grow gap-6 mt-10">
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">1.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Acceptance of Terms
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 1.1. These Terms and Conditions ("Terms") govern your access to and use of Moments Hub’s website, mobile application, and services (collectively, the "Platform").
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 1.2. By registering, creating an account, or using the Platform, you confirm that you are at least 18 years old (or the age of majority in your jurisdiction) and have the legal capacity to enter into this agreement.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">2.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 User Accounts
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 2.1. You must provide accurate and complete information when creating an account.
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 2.2. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">3.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Permitted Use
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 3.1. You agree to use the Platform only for lawful purposes and in accordance with these Terms.
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 3.2. You agree not to use the Platform:
               </p>
               <ul class="list-disc pl-5">
                 <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                   In any way that violates any applicable federal, state, local, or international law or regulation.
                 </li>
                 <li class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                   For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.
                 </li>
               </ul>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">4.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Content and Intellectual Property
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 4.1. All content on the Platform, including text, graphics, logos, images, and software, is the property of Moments Hub or its content suppliers and is protected by international copyright laws.
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 4.2. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Platform.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">5.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Privacy and Data Protection
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 5.1. We care about your privacy and data security. Please review our Privacy Policy, which also governs your use of the Platform, to understand our practices.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">6.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Payments and Transactions
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 6.1. If you make a payment through the Platform, you agree to provide current, complete, and accurate purchase and account information.
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 6.2. You agree to pay all charges at the prices then in effect for your purchases and any applicable taxes, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">7.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Limitation of Liability
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 7.1. In no event will Moments Hub, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Platform.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">8.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Indemnification
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 8.1. You agree to defend, indemnify, and hold harmless Moments Hub, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys’ fees) arising out of or relating to your violation of these Terms or your use of the Platform.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">9.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Termination
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 9.1. We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">10.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Governing Law and Dispute Resolution
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 10.1. These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Moments Hub operates, without regard to its conflict of law provisions.
               </p>
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 10.2. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">11.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Modifications to Terms
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 11.1. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
               </p>
             </div>
           </div>
           <div class="flex flex-col w-full min-w-[320px] gap-3 bg-inherit">
             <div class="flex flex-row gap-3.5 w-full items-center">
               <span class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11]">12.</span>
               <h2 class="font-mukta font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#271e11] m-0">
                 Contact Information
               </h2>
             </div>
             <div class="flex flex-col gap-2 pt-3">
               <p class="font-mukta font-normal text-lg leading-[150%] text-[#1e180f] m-0 whitespace-pre-line">
                 12.1. If you have any questions about these Terms, please contact us at support@momentshub.com.
               </p>
             </div>
           </div>
         </div>
       </div>

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
      scrollToSection() {
        const section = document.getElementById('explore-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      },
      scrollToGiftGiving() {
        const section = document.getElementById('gift-giving-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      },
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
  
  .particle-1 {
    width: 32px;
    height: 49.6px;
    top: 130px;
    left: 1170px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-2 {
    width: 60px;
    height: 60px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-3 {
    width: 60px;
    height: 60px;
    top: 129px;
    left: 90px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-4 {
    width: 10px;
    height: 10px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-5 {
    width: 10px;
    height: 10px;
    top: 200px;
    left: 246px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-6 {
    width: 100px;
    height: 321px;
    left: 0px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .particle-7 {
    width: 56px;
    height: 56px;
    top: -40px;
    right: 24px;
    gap: 0px;
    opacity: 0px;
    position: absolute;
  }
  
  .social-1 {
    position: absolute;
    top: -173.2px;
    left: 716px;
  }
  
  .social-2 {
    position: absolute;
  }
  
  .social-3 {
    top: 10.8px;
    left: 875px;
    padding: 10px 32px 10px 32px;
    position: absolute;
  }
  
  .social-4 {
    top: -31.2px;
    left: 468px;
    position: absolute;
  }
  
  @media (orientation: portrait) {
    h1 {
      font-family: 'Mukta', sans-serif;
      letter-spacing: -0.02em;
    }
  
    .particle-3 {
      width: 40px;
      height: 90px;
      top: 73px;
      left: 29px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .particle-5 {
      width: 6px;
      height: 16px;
      top: 180px;
      left: 54px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .particle-1 {
      width: 80px;
      height: 16px;
      top: 300px;
      left: 350px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .particle-6 {
      width: 40px;
      height: 321px;
      top: 420px;
      left: 0px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .particle-2 {
      width: 40px;
      height: 96px;
      top: 590px;
      left: 350px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .particle-4 {
      width: 6px;
      height: 96px;
      top: 540px;
      left: 320px;
      gap: 0px;
      opacity: 0px;
      position: absolute;
    }
  
    .smooth-rotate {
      max-width: 76%;
    }
  
    .social-1 {
      position: absolute;
      top: 30.2px;
      left: 120px;
    }
  
    .social-2 {
      top: 80.7px;
      left: 250px;
      position: absolute;
    }
  
    .social-3 {
      top: 120.8px;
      left: 100px;
      width: 45% !important;
      position: absolute;
    }
  
    .social-4 {
      top: 80.2px;
      left: 8px;
      position: absolute;
    }
  
    .social {
      width: 30%;
      margin-top: -40px;
      margin-left: -20px;
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
  
  