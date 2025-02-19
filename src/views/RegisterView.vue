<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from "../stores";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password1 = ref('');
const password2 = ref('');
const router = useRouter();
const store = useStore();

async function signUpWithEmail() {
  if (password1.value !== password2.value) {
    alert("The passwords don't match! Please check and try again.");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password1.value);
    const user = userCredential.user;


    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

    store.user = user;
    router.push("/movies");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already in use. Please log in.");
      router.push("/login");
    } else {
      console.error(error);
      alert("Something went wrong. " + error.message);
    }
  }
}


async function signUpWithGoogle() {
  try {

    if (store.user) {
      router.push("/movies");
      return;
    }

    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;


    if (store.user && store.user.email === user.email) {
      alert("This Google account is already registered.");
      router.push("/login");
      return;
    }

    store.user = user;
    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert("An error occurred while logging in with Google: " + error.message);
  }
}
</script>

<template>
  <Header />
  <div class="form-container">
    <h2>Create Your Account</h2>
    <form @submit.prevent="signUpWithEmail">
      <input type="text" placeholder="First Name" class="input-field" v-model="firstName" required />
      <input type="text" placeholder="Last Name" class="input-field" v-model="lastName" required />
      <input type="email" placeholder="Email Address" class="input-field" v-model="email" required />
      <input type="password" placeholder="Create Password" class="input-field" v-model="password1" required />
      <input type="password" placeholder="Confirm Password" class="input-field" v-model="password2" required />
      <button type="submit" class="register">Sign Up</button>
    </form>
  </div>
  <button @click="signUpWithGoogle" class="button register">Sign Up with Google</button>
  <Footer />
</template>

<style scoped>
body {
  background-color: #f3e5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  background-color: #ffffff;
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

.input-field {
  padding: 15px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
  outline: none;
}

.register {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.register:active {
  background-color: #388e3c;
}
</style>
