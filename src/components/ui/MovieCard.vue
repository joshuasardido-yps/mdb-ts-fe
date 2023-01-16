<template>
  <div
    class="card"
    :class="{ 'loading-skeleton': !moviesLength }"
    v-for="movie in renderMovies"
    :key="movie.id"
  >
    <div class="card-img-top bg-light p-1">
      <img
        :src="renderImage(movie.primaryImage?.url)"
        class="img-fluid rounded mx-auto d-block"
        alt="Poster image"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ movie.titleText?.text || "No title" }}</h5>
      <p class="card-text">
        {{ movie.primaryImage?.caption.plainText || "No description" }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <router-link
        :to="{ name: 'movie', params: { id: movie.id } }"
        class="btn btn-info"
      >
        Visit
      </router-link>

      <template v-if="useUser.userLoggedIn">
        <button
          v-if="!useMovie.checkMovie(movie.id).length"
          class="btn btn-primary"
          @click.prevent="savedMovie(movie)"
        >
          Save
        </button>
        <button
          v-else
          class="btn bg-danger"
          @click.prevent="unsavedMovie(movie.id)"
        >
          Unsave
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useUserStore from "@/stores/user";
import useMovieStore from "@/stores/movie";

const props = defineProps<{
  movies: any;
}>();

const useUser = useUserStore();

const useMovie = useMovieStore();

const moviesLength = computed(() => props.movies.length);

const fakeMovies = () => {
  let result = [];

  for (let i = 0; i <= 9; i++) {
    result.push({
      id: `${i}`,
      primaryImage: null,
      titleText: null,
    });
  }

  return result;
};

const renderMovies = computed(() =>
  moviesLength.value ? props.movies : fakeMovies()
);

const renderImage = (imageUrl: string): string => {
  return imageUrl || "/images/Image-Not-Available.png";
};

const savedMovie = (data: object) => {
  useMovie.requestSaveMovie(data as any);
};

const unsavedMovie = (id: string) => {
  useMovie.requestUnsaveMovie(id);
};
</script>

<style scoped lang="scss">
.card {
  img {
    height: 250px;
  }
}
</style>
