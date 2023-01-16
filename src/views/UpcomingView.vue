<template>
  <div class="upcoming-view">
    <h1>Upcoming lists</h1>
    <div class="movie-container">
      <MovieCard :movies="movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "@/components/ui/MovieCard.vue";

import { onMounted, computed } from "vue";
import useUserStore from "@/stores/user";
import useMovieStore from "@/stores/movie";

const useUser = useUserStore();

const useMovie = useMovieStore();

onMounted(() => {
  useMovie.requestUpcoming();

  if (useUser.getUid) {
    useMovie.requestGetSavedMovies();
  }
});

const movies = computed(() => useMovie.movies.results);
</script>

<style scoped lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.upcoming-view {
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
