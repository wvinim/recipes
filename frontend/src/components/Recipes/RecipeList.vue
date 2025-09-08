<template>
  <div class="recipe-list">
    <h2>Lista de Receitas</h2>
    <div v-if="loading">Carregando receitas...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.description }}</p>
      <p>{{ recipe.ingredients }}</p>
      <p>{{ recipe.instructions }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../axios-config';
import { useRouter } from 'vue-router';

const router = useRouter();

const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await api.get('/recipes');
    recipes.value = response.data;
  } catch (err) {
    if(err.status === 401) {
      router.push('/login');
    }

    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro ao buscar as receitas. Tente novamente mais tarde.';
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.error {
  color: red;
}
</style>