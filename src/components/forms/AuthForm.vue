<template>
  <form
    class="auth-form"
    @submit.prevent="isRegister ? register() : authenticate()"
  >
    <div v-if="state.alert.show" class="mb-3">
      <div class="alert" :class="[alertVariant]" role="alert">
        {{ state.alert.message }}
      </div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="state.email"
        placeholder="Enter your email address"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <div class="password">
        <input
          :type="state.password_show ? 'text' : 'password'"
          class="form-control"
          id="password"
          v-model="state.password"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          @click.prevent="state.password_show = !state.password_show"
        >
          <i
            class="bi"
            :class="[state.password_show ? 'bi-eye' : 'bi-eye-slash']"
          />
        </button>
      </div>
    </div>
    <template v-if="isRegister">
      <div class="mb-3">
        <label for="confirm-password" class="form-label">
          Confirm password
        </label>
        <div class="password">
          <input
            :type="state.confirm_password_show ? 'text' : 'password'"
            class="form-control"
            id="confirm-password"
            v-model="state.confirm_password"
            placeholder="Enter your confirm-password"
            required
            @keyup.prevent="passwordMatch()"
          />
          <button
            type="button"
            @click.prevent="
              state.confirm_password_show = !state.confirm_password_show
            "
          >
            <i
              class="bi"
              :class="[state.confirm_password_show ? 'bi-eye' : 'bi-eye-slash']"
            />
          </button>
        </div>
      </div>
      <div class="mb-3">
        <label for="first-name" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          id="first-name"
          v-model="state.first_name"
          placeholder="Enter your first name"
          required
          @keyup.prevent="passwordMatch()"
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
          required
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" :disabled="state.loading">
          Sign up
        </button>
      </div>
    </template>

    <div v-else class="mb-3">
      <button type="submit" class="btn btn-primary" :disabled="state.loading">
        Login
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import useUserStore from "@/stores/user";
import useMovieStore from "@/stores/movie";

defineProps<{
  isRegister: boolean;
}>();

const state = reactive({
  email: "" as string,
  password: "" as string,
  password_show: false as boolean,
  confirm_password: "" as string,
  confirm_password_show: false as boolean,
  first_name: "" as string,
  last_name: "" as string,
  loading: false as boolean,
  alert: {
    message: "" as string,
    variant: "" as string,
    show: false as boolean,
  },
});

const useUser = useUserStore();

const useMovie = useMovieStore();

const register = async () => {
  state.loading = true;
  state.alert.message = "Registering your information...";
  state.alert.variant = "alert-info";
  state.alert.show = true;

  await useUser
    .register({
      email: state.email,
      password: state.password,
      name: `${state.first_name} ${state.last_name}`,
    })
    .then(() => {
      state.loading = true;
      state.alert.message = "Congratulations and you're now logged in.";
      state.alert.variant = "alert-success";

      setTimeout(() => {
        document.querySelector<any>(".btn-close").click();
        state.loading = false;
      }, 1000);
    })
    .catch((error) => {
      console.log("xxx", error.message);
      state.alert.message = error.message;
      state.alert.variant = "alert-danger";
      state.loading = false;
    });
};

const authenticate = async () => {
  state.loading = true;
  state.alert.message = "Checking your credentials...";
  state.alert.variant = "alert-info";
  state.alert.show = true;
  await useUser
    .authenticate({ email: state.email, password: state.password })
    .then(async () => {
      state.alert.message = "Retrieving some data...";
      state.alert.variant = "alert-secondary";

      await useMovie.requestGetSavedMovies().then(() => {
        state.alert.message = "You're now logged in.";
        state.alert.variant = "alert-success";

        setTimeout(() => {
          document.querySelector<any>(".btn-close").click();
          state.loading = false;
        }, 1000);
      });
    })
    .catch((error) => {
      state.alert.message = error.message;
      state.alert.variant = "alert-danger";
      state.loading = false;
    });
};

const alertVariant = computed(() => state.alert.variant);

const passwordMatch = () => {
  const password: any = document.querySelector("#password");
  const confirm: any = document.querySelector("#confirm-password");
  if (confirm.value === password.value) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("Passwords do not match");
  }
};
</script>

<style scoped lang="scss">
.auth-form {
  .password {
    display: flex;
    align-items: center;

    input {
      padding-right: 45px;
    }

    button {
      background-color: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      right: 25px;
    }
  }
}
</style>
