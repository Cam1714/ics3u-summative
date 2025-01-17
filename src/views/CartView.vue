<script setup>
import { useStore } from '../stores';
const store = useStore();
</script>

<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <div class="item" v-for="([key, value]) in store.cart" :key="key">
      <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" alt="Movie Poster" />
      <h2>{{ value.title }}</h2>
      <button @click="store.removeFromCart(key)">Remove</button>
    </div>
  </div>
</template>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.cart h1 {
  text-align: center;
  color: #6c5ce7;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 15px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.item img {
  width: 100px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.item h2 {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

.item button {
  background-color: #6c5ce7;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.item button:hover {
  background-color: #5a3ac1;
  transform: scale(1.05);
}
</style>