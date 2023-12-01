<template>
  <nav
    class="navbar flex items-center justify-between px-10 py-4 text-gray-900 sm:px-20"
    style="background-color: aliceblue;"
  >
    <div class="flex items-center">
      <router-link :to="{ name: 'HomeView' }">
        <img src="@/assets/images/logo.png" width="50" alt="Logo" class="youtil-logo" />
      </router-link>
    </div>
    <div>
      <h1 class="text-5xl">LISTEN.AI</h1>
    </div>
    <div class="flex gap-x-10 items-center">
      <div class="md:flex hidden gap-x-10 navLinks">
        <router-link :to="{ name: 'AboutView' }">About</router-link>
      </div>
      <div class="flex items-center gap-x-2" v-if="!loggedIn">
        <UserCircleIcon class="h-6 w-6 text-blue-500" />
        <router-link :to="{ name: 'LoginView' }">LOGIN</router-link>
      </div>
      <div class="flex items-center gap-x-2" v-else>
        <UserCircleIcon class="h-6 w-6 text-blue-500" />
        {{ user.name }}
        <button @click="logout">
          <ArrowRightCircleIcon class="h-6 w-6 text-blue-500" />
        </button>
      </div>
    </div>
    <transition name="menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden absolute top-0 right-0 h-screen w-3/4 bg-gray-200 text-white flex flex-col p-4 duration-300 transition z-10"
      >
        <a
          href="/"
          target="'_blank'"
          class="block text-gray-900 hover:text-gray-500 mb-2 ml-2 mt-20 uppercase"
        >
          Home
        </a>
      </div>
    </transition>
    <div class="md:hidden flex items-center">
      <button
        class="text-gray-900 hover:text-gray-900 z-10"
        @click="toggleMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { UserCircleIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid'

// Auth Store
const authStore = useAuthStore()
const { user, loggedIn } = storeToRefs(authStore)

onMounted(async () => {
  // Check if user is logged in
  await authStore.getUserDetails()
})

const isMenuOpen = ref(false)

watch(isMenuOpen, newVal => {
  let bodyOverflow = ''
  if (newVal) bodyOverflow = 'hidden'
  document.body.style.overflow = bodyOverflow
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function logout() {
  authStore.logout()
}
</script>

<style scoped lang="scss">
.navbar {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.youtil-logo {
  max-width: 138px;
  height: auto;
}

.navLinks {
  line-height: 17.07px;
}

.menu-enter-active,
.menu-leave-active {
  transition: transform 0.3s ease;
}

.menu-enter-to {
  transform: translateX(10px);
}

.menu-leave-to {
  transform: translateX(100%);
}
</style>
