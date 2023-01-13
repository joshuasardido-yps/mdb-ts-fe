<template>
  <div class="auth-view">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="state.email"
        placeholder="Enter your email address"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="state.password"
        placeholder="Enter your password"
      />
    </div>
    <template v-if="isRegister">
      <div class="mb-3">
        <label for="confirm-password" class="form-label">
          Confirm password
        </label>
        <input
          type="confirm-password"
          class="form-control"
          id="confirm-password"
          v-model="state.confirm_password"
          placeholder="Enter your confirm-password"
        />
      </div>
      <div class="mb-3">
        <label for="first-name" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          id="first-name"
          v-model="state.first_name"
          placeholder="Enter your first name"
        />
      </div>
      <div class="mb-3">
        <label for="last-name" class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          id="last-name"
          v-model="state.last_name"
          placeholder="Enter your last name"
        />
      </div>
      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input
          type="number"
          class="form-control"
          id="age"
          v-model="state.age"
          placeholder="Enter your age"
        />
      </div>
      <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <input
          type="text"
          class="form-control"
          id="country"
          v-model="state.country"
          placeholder="Enter your Country"
        />
      </div>
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="register()"
        >
          Sign up
        </button>
      </div>
    </template>

    <div v-else class="mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="authenticate()"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import useUserStore from "@/stores/user";

defineProps<{
  isRegister: boolean;
}>();

const state = reactive({
  email: "" as string,
  password: "" as string,
  confirm_password: "" as string,
  first_name: "" as string,
  last_name: "" as string,
  age: 0 as number,
  country: "" as string,
});

const useUser = useUserStore();

const register = () => {
  useUser.register({
    email: state.email,
    password: state.password,
    name: `${state.first_name} ${state.last_name}`,
    age: state.age,
    country: state.country,
  });
};

const authenticate = () => {
  useUser.authenticate({ email: state.email, password: state.password });
};
</script>
