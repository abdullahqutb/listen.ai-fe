
<template>
  <navbar-component />
  <main class="h-full">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>