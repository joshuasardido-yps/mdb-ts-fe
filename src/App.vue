<template>
  <AppNav :is-registered="isRegistered" />
  <main class="container pb-5">
    <RouterView />
  </main>
  <AppFooter
    v-if="!useUser.userLoggedIn"
    @is-registered="isRegistered = $event"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import useUserStore from "./stores/user";
import AppNav from "./components/layouts/AppNav.vue";
import AppFooter from "./components/layouts/AppFooter.vue";

const useUser = useUserStore();

onBeforeMount(() => {
  useUser.checkUser();
});

const isRegistered = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
