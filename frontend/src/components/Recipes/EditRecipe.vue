<template>
  <form @submit.prevent="submitForm">
    <h2>Editar Receita</h2>
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
      {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../axios-config';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const title = ref('');
const description = ref('');
const ingredients = ref('');
const instructions = ref('');
const loading = ref(true);
const error = ref(null);

const fetchRecipe = async () => {
  loading.value = true;
  try {
    const response = await api.get(`/recipes/${route.params.id}`);
    const recipe = response.data;
    title.value = recipe.title;
    description.value = recipe.description;
    ingredients.value = recipe.ingredients.join(', ');
    instructions.value = recipe.instructions;
  } catch (err) {
    error.value = 'Erro ao carregar a receita. Tente novamente mais tarde.';
  } finally {
    loading.value = false;
  }
};

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
    await api.put(`/recipes/${route.params.id}`, recipeData);
    router.push(`/recipes/${route.params.id}`);
  } catch (err) {
    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro ao salvar a receita. Tente novamente mais tarde.';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRecipe);
</script>

<style scoped>
.error {
  color: red;
}
</style>