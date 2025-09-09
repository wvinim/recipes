<template>
  <div id="app">
    <header class="app-header">
      <nav class="app-nav">
        <button v-if="showButton" @click="handleLogout" class="logout-button">Sair</button>
      </nav>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { handleLogout } from './components/auth/auth.service.js';

const route = useRoute()

const hiddenRoutes = ['/login', '/register']

const showButton = computed(() => !hiddenRoutes.includes(route.path))
</script>