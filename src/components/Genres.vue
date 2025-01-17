<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../stores';

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();

const selectedGenre = ref(28);
const response = ref(null);

const genres = [
  { id: 28, genreName: 'Action' },
  { id: 12, genreName: 'Adventure' },
  { id: 27, genreName: 'Horror' },
  { id: 10751, genreName: 'Family' },
  { id: 36, genreName: 'History' },
];

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`)
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
})
</script>

<template>
  <div class="movie-gallery">
    <select v-model="selectedGenre" @change="getMovieByGenre()">
      <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <div @click="getMovieDetails(movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        <button v-if='!store.cart.has(movie.id)'
          @click="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })" class="buy">
          Buy
        </button>
        <button v-else class='buy'>
          Added
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 12px;
}

select {
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1.1rem;
  background-color: #6c5ce7;
  color: white;
  border: none;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

select:hover {
  background-color: #f1c6e4;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card {
  width: 250px;
  margin: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster {
  transform: scale(1.1);
}

.movie-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 10px;
  color: #6c5ce7;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.movie-card:hover .movie-title {
  color: #58a6b8;
}

.buy {
  display: block;
  margin-top: 15px;
  padding: 12px 24px;
  background-color: #58a6b8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy:hover {
  background-color: #4a8e97;
  transform: scale(1.05);
}

.buy:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>