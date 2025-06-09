import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import { eventBus } from "@/eventBus.js";

import UserDashboard from "@/pages/Dashboard/UserDashboard.vue";
import OAuthCallback from "@/pages/Auth/OAuthCallback.vue"; // You'll need to create this component

import UserExplore from "@/pages/Dashboard/UserExplore.vue";
import UsersProfile from "@/pages/Dashboard/UsersProfile.vue";
import Account from "@/pages/Dashboard/Account.vue";
import Archived from "@/pages/Dashboard/Archived.vue";
import ArchivedWishlist from "@/pages/Dashboard/ArchivedWishlist.vue";
import Wishlist from "@/pages/Dashboard/Wishlist.vue";
/* import Friends from '@/pages/Friends.vue'; */
/* import Profile from '@/pages/Profile.vue'; */
import Login from "@/pages/Auth/Login.vue";
import Register from "@/pages/Auth/Register.vue";
import CreateOption from "@/pages/Auth/CreateOption.vue";
import ForgotPassword from "@/pages/Auth/ForgotPassword.vue";
import ResetPassword from "@/pages/Auth/ResetPassword.vue";
import VerificationSent from "@/pages/Auth/VerificationSent.vue";
import SignUp from "@/pages/Auth/SignUp.vue";
import SignUp2 from "@/pages/Auth/SignUp2.vue";
import NotFound from "@/pages/NotFound.vue";
import Privacy from "@/pages/Home/privacy.vue";
import TermsandCondition from "@/pages/Home/Termsandcondition.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/explore", name: "explore", component: UserExplore },

  {
    path: "/account",
    component: Account,
    children: [
      {
        path: "delivery",
        component: () => import("@/components/Dashboard/AddressSettings.vue"),
        name: "AddressSettings",
      },
      // other child routes for Account.vue
    ],
  },

  { path: "/archived", name: "Archived", component: Archived },
  { path: "/dashboard", name: "dashboard", component: UserDashboard },
  {
    path: "/wishlist/:id/:username",
    name: "Wishlist",
    component: Wishlist,
    props: true,
  },
  {
    path: "/archived/:id",
    name: "ArchivedWishlist",
    component: ArchivedWishlist,
    props: true,
  },

  {
    path: "/:username",
    name: "UsersProfile",
    component: UsersProfile,
    props: true,
  },
  /*   { path: '/wishlist', name: 'Wishlist', component: Wishlist }, */
  /*   { path: '/friends', name: 'Friends', component: Friends }, */
  /*   { path: '/profile', name: 'Profile', component: Profile }, */
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/create-option", name: "Create Option", component: CreateOption },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/password-reset/:token",
    name: "Reset Password",
    component: ResetPassword,
    props: (route) => ({ token: route.params.token, email: route.query.email }),
  },
  {
    path: "/verification-sent",
    name: "Verification Sent",
    component: VerificationSent,
  },
  { path: "/basic-info", name: "Sign Up", component: SignUp },
  { path: "/additional-info", name: "Sign Up 2", component: SignUp2 },
  { path: "/privacy", name: "Privacy", component: Privacy },
  {
    path: "/terms-condition",
    name: "TermsandCondition",
    component: TermsandCondition,
  },
  {
    path: "/auth/:provider/callback",
    name: "OAuthCallback",
    component: OAuthCallback,
    props: true,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export function isTokenExpired() {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  if (!token || !tokenExpiration || !user) {
    return true;
  }

  return Date.now() >= parseInt(tokenExpiration);
}

function clearAuthData() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("user");
}

router.beforeEach((to, from, next) => {
  const publicPages = [
    "Home",
    "Privacy",
    "TermsandCondition",
    "UsersProfile",
    "Wishlist",
    "OAuthCallback",
    "Login",
    "Register",
    "Create Option",
    "Verification Sent",
    "Forgot Password",
    "Reset Password",
    "Sign Up",
    "Sign Up 2",
  ];

  const authRequired = !publicPages.includes(to.name);
  const loggedIn = !isTokenExpired();

  eventBus.setLoading(true);

  if (
    loggedIn &&
    publicPages.includes(to.name) &&
    ![
      "Verification Sent",
      "Home",
      "Privacy",
      "Reset Password",
      "TermsandCondition",
      "Sign Up",
      "Sign Up 2",
      "Sign Up 2",
      "Wishlist",
      "UsersProfile",
    ].includes(to.name)
  ) {
    // Redirect logged-in users to the dashboard if they try to access public pages, except specified ones
    return next({ name: "dashboard" });
  }

  // Check if route requires authentication
  if (authRequired) {
    // Check if token is expired
    if (isTokenExpired()) {
      // Clear auth data if token is expired
      clearAuthData();
      return next({
        name: "Login",
        query: { redirect: to.fullPath }, // Optional: Save the path user was trying to access
      });
    }
  }

  // Ensure auth state is properly set before navigation
  if (loggedIn) {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        eventBus.authState = { isLoggedIn: true, user };
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }

  next();
});

router.afterEach(() => {
  eventBus.setLoading(false);
});

export default router;
