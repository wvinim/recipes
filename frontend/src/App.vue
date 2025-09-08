<template>
  <div id="app">
    <header class="app-header">
      <nav class="app-nav">
        <button v-if="isAuthenticated" @click="handleLogout" class="logout-button">Sair</button>
      </nav>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { isAuthenticated } from './components/auth/auth.state.js';
import { handleLogout } from './components/auth/auth.service.js';
</script>