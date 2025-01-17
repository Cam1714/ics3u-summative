<script setup>
import { useRegistrationStore } from '../stores';
import { computed } from 'vue';

const registrationStore = useRegistrationStore();

const firstName = computed({
  get: () => registrationStore.firstName,
  set: (value) => registrationStore.firstName = value,
});

const lastName = computed({
  get: () => registrationStore.lastName,
  set: (value) => registrationStore.lastName = value,
});

const email = computed({
  get: () => registrationStore.email,
});

const updateProfileHandler = (event) => {
  event.preventDefault();
  registrationStore.setRegistrationData({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  });

  alert('Profile updated successfully!');
};
</script>

<template>
  <div class="form-container">
    <h2>User Settings</h2>
    <form @submit.prevent="updateProfileHandler">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="firstName" class="input-field" /><br /><br />
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="lastName" class="input-field" /><br /><br />
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" class="input-field" readonly /><br /><br />
      <button type="submit" class="button">Save Changes</button>
    </form>
  </div>
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