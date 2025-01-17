<script setup>
import { RouterLink } from 'vue-router';
import { useRegistrationStore } from '../stores';

const registrationStore = useRegistrationStore();
</script>

<template>
  <div class="header">
    <nav>
      <ul class="navlist">
        <li class="logo">FreeFlix</li>
        <div class="buttons">
          <li v-if="$route.path === '/'">
            <RouterLink to="/login" class="button login">Login</RouterLink>
            <RouterLink to="/register" class="button register">Register</RouterLink>
          </li>
          <li v-if="registrationStore.email">
            <h1 class="email">{{ `Hello ${registrationStore.firstName}!` }}</h1>
            <RouterLink to="/settings" class="button setting">Settings</RouterLink>
            <RouterLink to="/" class="button setting">Logout</RouterLink>
            <RouterLink to="/cart" class="button cart">Cart</RouterLink>
          </li>
          <li v-if="$route.path === '/login' || $route.path === '/register'">
            <RouterLink to="/" class="button setting">Home</RouterLink>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.navlist {
  list-style-type: none;
  margin: 12px 10px;
  padding: 0;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 2.5rem;
  font-family: 'Georgia', serif;
  font-style: italic;
  font-weight: bold;
  color: #6c5ce7;
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}

.button {
  background-color: #fff;
  color: #6c5ce7;
  border-radius: 5px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  border: 2px solid #6c5ce7;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #6c5ce7;
  color: white;
  transform: scale(1.05);
}

.email {
  font-size: 1.1rem;
  color: #333;
  margin-left: 20px;
  font-weight: bold;
}

.cart {
  background-color: #58a6b8;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart:hover {
  background-color: #4a8e97;
}
</style>