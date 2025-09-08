<template>
  <div class="view-recipe">
    <router-link :to="`/recipes`" class="edit-link">
      Voltar para receitas
    </router-link>
    <h2>Visualizar Receita</h2>
    <div v-if="loading">Carregando receita...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="recipe">
      <h3>{{ recipe.title }}</h3>
      <h3>Descrição:</h3>
      <p class="description">{{ recipe.description }}</p>
      <h3>Ingredientes:</h3>
      <p class="ingredients">{{ recipe.ingredients.join(', ') }}</p>
      <h3>Instruções:</h3>
      <p class="instructions">{{ recipe.instructions }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../axios-config';

const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchRecipe = async () => {
  try {
    const response = await api.get(`/recipes/${route.params.id}`);
    recipe.value = response.data;
  } catch (err) {
    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro ao carregar a receita.';
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