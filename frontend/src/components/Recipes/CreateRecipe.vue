<template>
  <router-link :to="`/recipes`" class="edit-link">
      Voltar para receitas
  </router-link>
  <form @submit.prevent="submitForm">
    <h2>Nova Receita</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <div>
      <label for="title">Título:</label>
      <input type="text" id="title" v-model="title" required />
    </div>
    <div>
      <label for="description">Descrição:</label>
      <textarea id="description" v-model="description" required></textarea>
    </div>
    <div>
      <label for="ingredients">Ingredientes (separados por vírgula):</label>
      <textarea id="ingredients" v-model="ingredients" required></textarea>
    </div>
    <div>
      <label for="instructions">Instruções:</label>
      <textarea id="instructions" v-model="instructions" required></textarea>
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../axios-config';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const description = ref('');
const ingredients = ref('');
const instructions = ref('');
const loading = ref(false);
const error = ref(null);

const submitForm = async () => {
  loading.value = true;
  error.value = null;

  const recipeData = {
    title: title.value,
    description: description.value,
    ingredients: ingredients.value.split(',').map(item => item.trim()),
    instructions: instructions.value,
  };

  try {
    await api.post('/recipes', recipeData);
    router.push('/recipes');
  } catch (err) {
    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro. Tente novamente mais tarde.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>