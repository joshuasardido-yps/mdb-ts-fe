<template>
  <div class="movie-view">
    <MovieCard :movies="movie" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useMovieStore from "@/stores/movie";
import MovieCard from "@/components/ui/MovieCard.vue";

const route = useRoute();

const useMovie = useMovieStore();

const movie = computed(() => useMovie.requestMovie(route.params.id as string));
</script>
