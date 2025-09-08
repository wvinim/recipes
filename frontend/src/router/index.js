import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import RecipeList from '../components/Recipes/RecipeList.vue';
import CreateRecipe from '../components/Recipes/CreateRecipe.vue';
import EditRecipe from '../components/Recipes/EditRecipe.vue';
import ViewRecipe from '../components/Recipes/ViewRecipe.vue';

const routes = [
  { path: '/', redirect: '/recipes' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/recipes', component: RecipeList },
  { path: '/recipes/create', component: CreateRecipe },
  { path: '/recipes/:id/edit', component: EditRecipe },
  { path: '/recipes/:id', component: ViewRecipe },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;