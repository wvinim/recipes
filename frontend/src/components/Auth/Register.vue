<template>
  <form @submit.prevent="submitForm">
    <h2>Cadastro de Usuário</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.post('http://localhost:3000/users/register', {
      email: email.value,
      password: password.value,
    });
    console.log('Usuário cadastrado com sucesso!', response.data);
    // Redirecionar para a página de login
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