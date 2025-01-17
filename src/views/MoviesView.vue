<script setup>
import Genres from "../components/Genres.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 12,
    genreName: "Adventure"
  },
  {
    id: 27,
    genreName: "Horror"
  },
  {
    id: 10751,
    genreName: "Family"
  },
  {
    id: 36,
    genreName: "History"
  },
]
</script>

<template>
  <Header />
  <Genres :genres="genresList" />
  <Footer />
</template>