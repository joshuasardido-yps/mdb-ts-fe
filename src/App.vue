<template>
  <AppNav />
  <main class="container">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppNav from "./components/layouts/AppNav.vue";
</script>

<style scoped lang="scss"></style>
