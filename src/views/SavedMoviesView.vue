<template>
  <div class="saved-movies-view">
    <h1>Saved movie lists</h1>
    <div class="movie-container">
      <MovieCard :movies="movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "@/components/MovieCard.vue";

import { computed } from "vue";
import { useMovieStore } from "@/stores/movie";

const useMovie = useMovieStore();

const movies = computed(() => useMovie.savedMovies);
</script>

<style scoped lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.saved-movies-view {
  .movie-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    @include media-breakpoint-down(xxl) {
      grid-template-columns: repeat(4, 1fr);
    }

    @include media-breakpoint-down(xl) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media-breakpoint-down(lg) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
