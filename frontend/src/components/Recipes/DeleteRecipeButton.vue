<template>
  <button @click="deleteRecipe" :disabled="loading">
    {{ loading ? 'Excluindo...' : 'Excluir Receita' }}
  </button>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../axios-config';
import { useRouter } from 'vue-router';

const props = defineProps({
  recipeId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const loading = ref(false);
const error = ref(null);

const deleteRecipe = async () => {
  loading.value = true;
  error.value = null;

  try {
    await api.delete(`/recipes/${props.recipeId}`);

    router.push('/recipes');
  } catch (err) {
    if (err.response && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Ocorreu um erro ao excluir a receita.';
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