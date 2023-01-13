<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="https://rapidapi.com/SAdrian/api/moviesdatabase/"
        target="_blank"
      >
        Movie Database
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'upcoming' }">
              Upcoming
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'actors' }">
              Actors
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'saved-movies' }">
              Saved movies
            </router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            v-model="search"
            placeholder="Search movies"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-success"
            type="submit"
            @click.prevent="requestSearch()"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const search = ref<string>("");

const route = useRoute();

const router = useRouter();

onMounted(() => {
  if (route.name === "movies") {
    search.value = route.params.title as string;
  }
});

const requestSearch = (): void => {
  router.push({ name: "movies", params: { title: search.value } });
};
</script>

<style scoped lang="scss">
.router-link-active {
  color: #fff;
}
</style>
