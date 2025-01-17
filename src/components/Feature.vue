<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const response = ref(null);
const numbers = ref([]);

numbers.value = (() => {
  const set = new Set();

  while (true) {
    set.add(Math.floor(Math.random() * 19));

    if (set.size === 3) {
      return set;
    }
  }
})();

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
})
</script>

<template>
  <div class="movie-gallery">
    <div v-if="response" class="movie-list">
      <div v-for="number in numbers" :key="response.data.results[number].id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`" alt="Movie Poster"
          class="movie-poster" />
        <p class="movie-title">{{ response.data.results[number].title }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.movie-gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(to right, #e2f3f5, #d4e7ec);
}

.movie-list {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  flex-wrap: wrap;
}

.movie-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 5px solid #a0d8e6;
}

.movie-title {
  font-size: 1.1rem;
  color: #444444;
  font-weight: bold;
  margin: 10px 0;
  padding: 0 10px;
}

.text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  margin-top: 40px;
  text-align: center;
}
</style>