<template>
  <AppNav :is-registered="isRegistered" />
  <main class="container">
    <RouterView />
  </main>
  <AppFooter @is-registered="isRegistered = $event" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import AppNav from "./components/layouts/AppNav.vue";
import AppFooter from "./components/layouts/AppFooter.vue";

const isRegistered = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
