
<template>
  <navbar-component />
  <main class="h-full">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>