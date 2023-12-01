<template>
  <nav
    class="navbar flex items-center justify-between px-10 py-4 text-gray-900 sm:px-20"
    style="background-color: aliceblue;"
  >
    <div class="flex items-center">
      <a href="/"><img src="@/assets/images/logo.svg" alt="Logo" class="youtil-logo" /></a>
    </div>
    <transition name="menu">
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

<script>
export default {
  name: 'navbar-component',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
import { ref, watch } from 'vue'
// import { useHomeStore, useAuthStore, useCampaignStore } from '@/stores'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// const campaignStore = useCampaignStore()

// const goToLoginPage = () => {
//   router.push({ name: 'LoginPage', params: { campaign: campaignStore.activeCampaign?.domain }})
// }

const isMenuOpen = ref(false)

watch(isMenuOpen, newVal => {
  let bodyOverflow = ''
  if (newVal) bodyOverflow = 'hidden'
  document.body.style.overflow = bodyOverflow
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
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
