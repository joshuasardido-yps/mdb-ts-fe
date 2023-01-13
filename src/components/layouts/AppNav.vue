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

          <!-- <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'actors' }">
              Actors
            </router-link>
          </li> -->

          <li v-if="authenticated" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'saved-movies' }">
              Saved movies
            </router-link>
          </li>
        </ul>

        <SearchForm v-if="authenticated" />

        <ul v-else class="navbar-nav">
          <li class="nav-item me-2">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#authModal"
              @click.prevent="modalToggle(true)"
            >
              Sign up
            </button>
          </li>

          <li class="nav-item">
            <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#authModal"
              @click.prevent="modalToggle(false)"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <auth-modal :is-register="state.isRegister" />
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { RouterLink } from "vue-router";
import useUserStore from "@/stores/user";

import SearchForm from "@/components/forms/SearchForm.vue";
import AuthModal from "@/components/modals/AuthModal.vue";

const props = defineProps<{
  isRegistered: boolean;
}>();

watch(
  () => props.isRegistered,
  (val) => {
    modalToggle(val);
  }
);

const useUser = useUserStore();

const authenticated = computed(() => useUser.userLoggedIn);

const state = reactive({
  isRegister: false,
});

const modalToggle = (toggle: boolean): void => {
  state.isRegister = toggle;
};
</script>

<style scoped lang="scss"></style>
