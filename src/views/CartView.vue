<script setup>
import { ref } from 'vue';
import { useStore } from '../stores';
import { useRouter } from "vue-router";

import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";

const store = useStore();
const router = useRouter();
const thank = ref(false);
const cartEmpty = ref(false);


const handleCheckout = () => {

  if (store.cart.size === 0) {
    cartEmpty.value = true;
  } else {
    thank.value = true;
    store.clearCart();
  }
};

</script>

<template>
  <Header />

  <div class="cart-container" v-if="!thank">
    <h2>Shopping Cart</h2>


    <div class="cart-item" v-for="([key, value]) in store.cart" :key="key">
      <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
      <div class="item-details">
        <h3>{{ value.title }}</h3>
        <button @click="store.removeFromCart(key)">Remove</button>
      </div>
    </div>


    <div class="checkout-button">
      <button @click="handleCheckout">Checkout</button>
    </div>


    <div v-if="cartEmpty" class="cart-empty-message">
      <p>Your cart is empty. Please add some items before proceeding!</p>
    </div>
  </div>


  <div v-else class="thank-you-message">
    <p>Enjoy your purchase!</p>
  </div>

  <Footer />
</template>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #fafafa;
  min-height: 100vh;
}

.cart-container h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #5e81ac;
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 15px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.cart-item img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 8px;
}

.item-details button {
  background-color: #5e81ac;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s ease;
}

.item-details button:hover {
  background-color: #4c6b8c;
  transform: scale(1.05);
}

.checkout-button {
  text-align: center;
  margin-top: 20px;
}

.checkout-button button {
  background-color: #6c5ce7;
  color: white;
  padding: 12px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease;
}

.checkout-button button:hover {
  background-color: #5a3ac1;
  transform: scale(1.05);
}

.thank-you-message {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.thank-you-message p {
  font-size: 2rem;
  color: #4caf50;
  font-weight: bold;
}

.cart-empty-message {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: red;
}
</style>
