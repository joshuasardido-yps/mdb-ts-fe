<template>
  <footer class="text-center text-lg-start bg-light text-muted">
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      TypeScript Practice: to unlock the other feature you're required to
      <button
        type="button"
        class="btn btn-link p-0"
        data-bs-toggle="modal"
        data-bs-target="#authModal"
        @click.prevent="emit('isRegistered', true)"
      >
        Sign up
      </button>
      or
      <button
        type="button"
        class="btn btn-link p-0"
        data-bs-toggle="modal"
        data-bs-target="#authModal"
        @click.prevent="emit('isRegistered', false)"
      >
        Login
      </button>
      your account
    </div>
  </footer>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "isRegistered", data: boolean): void;
}>();
</script>
