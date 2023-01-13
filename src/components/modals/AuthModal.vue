<template>
  <div class="auth-modal">
    <div
      class="modal fade"
      id="authModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <auth-form :is-register="isRegister" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AuthForm from "@/components/forms/AuthForm.vue";

const props = defineProps<{
  isRegister: boolean;
}>();

const title = computed(() => (props.isRegister ? "Sign Up" : "Login"));
</script>
