import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { auth } from "./includes/firebase";

import "./assets/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

let app: any;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount("#app");
  }
});
