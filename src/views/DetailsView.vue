<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const response = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
    );
    response.value = res.data;
    console.log(response.value);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
});
</script>

<template>
  <div v-if="response" class="movie-detail">
    <h1 class="movie-title">{{ response.original_title }}</h1>


    <p class="movie-overview">{{ response.overview }}</p>
    <p class="movie-release-date">Release Date: {{ response.release_date }}</p>
    <a class="movie-site" :href="response.homepage" target="_blank">Official Movie Site</a>
    <p class="movie-runtime">Runtime: {{ response.runtime }} minutes</p>
    <p class="movie-rating">Rating: {{ response.vote_average }} / 10</p>
    <p class="movie-language">Language: {{ response.original_language.toUpperCase() }}</p>
    <p class="movie-status">Status: {{ response.status }}</p>
    <img :src="`https://image.tmdb.org/t/p/w500${response.poster_path}`" alt="Movie Poster" class="movie-poster" />
    <h2 class="trailers-title">Trailers</h2>
    <div class="trailers-container">
      <div v-for="trailer in response.videos.results" :key="trailer.id" class="trailer-tile">
        <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
          <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
            class="trailer-thumbnail" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail {
  text-align: center;
  margin: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #6c5ce7;
  margin-bottom: 15px;
}

.movie-overview,
.movie-release-date,
.movie-runtime,
.movie-rating,
.movie-language,
.movie-status {
  font-size: 1.1rem;
  margin-top: 10px;
  color: #555;
}

.movie-site {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #6c5ce7;
  text-decoration: none;
}

.movie-site:hover {
  text-decoration: underline;
}

.movie-poster {
  width: 300px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.trailers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.trailer-tile {
  position: relative;
  width: 200px;
  height: 113px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.trailer-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.trailer-tile:hover .trailer-thumbnail {
  transform: scale(1.05);
}

.trailers-title {
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #6c5ce7;
}
</style>