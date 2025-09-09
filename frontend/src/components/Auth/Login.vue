<template>
  <form @submit.prevent="submitForm">
    <h2>Login de Usuário</h2>
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
      {{ loading ? 'Entrando...' : 'Entrar' }}
    </button>
  </form>
  <div class="redirect-link">
      <p>Ainda não tem uma conta?</p>
      <router-link to="/register">Cadastre-se aqui</router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../axios-config';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });
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
.redirect-link {
  margin-top: 1rem;
}
</style>