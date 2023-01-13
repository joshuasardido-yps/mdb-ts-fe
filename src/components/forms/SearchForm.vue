<template>
  <form class="search-bar d-flex">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
