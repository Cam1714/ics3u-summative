<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from "vue-router";
import { useStore } from '../stores';
import { updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { ref } from 'vue';

const store = useStore();
const router = useRouter();
const name = ref(store.user?.displayName?.split(" ")[0] || '');
const lastName = ref(store.user?.displayName?.split(" ")[1] || '');
const email = ref(store.user?.email || '');
const password = ref('');

const isEmailProvider = store.user?.providerData.some(provider => provider.providerId === 'password');

const changeName = async () => {
  if (!isEmailProvider) {
    alert("You can only change your information if you signed in through email.");
    return;
  }
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });

      store.user = user;
      alert("Name updated successfully!");
    }
  } catch (error) {
    console.error("Error occurred during name change:", error);
    alert("There was an error updating the name. Please try again.");
  }
};

const changePassword = async () => {
  if (!isEmailProvider) {
    alert("You can only change your password if you signed in through email.");
    return;
  }
  try {
    const user = auth.currentUser;
    await updatePassword(user, password.value);
    alert("Password updated successfully!");
    password.value = '';
  } catch (error) {
    alert("There was an error updating the password. Please try again.");
  }
};
</script>

<template>
  <Header />
  <div class="form-container">
    <h1>User Profile</h1>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `First Name: ${name}` }}</p>
        <input v-model="name" type="text" id="name" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `Last Name: ${lastName}` }}</p>
        <input v-model="lastName" type="text" id="lastName" class="input-field" />
        <button type="submit" class="changeName">Change</button>
      </div>
    </form>
    <div class="email">
      <div class="input-container">
        <p>{{ `Email:` }}</p>
        <input v-model="email" type="email" id="email" class="input-field" readonly />
      </div>
    </div>
    <form @submit.prevent="changePassword" class="form">
      <div class="input-container">
        <p>New Password</p>
        <input v-model="password" type="password" id="password" class="input-field" required />
        <button type="submit" class="changeName">Change Password</button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<style scoped>
body {
  background-color: #f0f4f8;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  background-color: #e6f7ff;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.form-container form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-field {
  padding: 15px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f3f4f9;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #64b5f6;
  box-shadow: 0 0 8px rgba(100, 181, 246, 0.4);
  outline: none;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}

button:active {
  background-color: #2e7d32;
}
</style>