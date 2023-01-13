import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";
import UpcomingView from "@/views/UpcomingView.vue";
import MovieView from "@/views/MovieView.vue";
import MoviesView from "@/views/MoviesView.vue";
import ActorsView from "@/views/ActorsView.vue";
import SavedMoviesView from "@/views/SavedMoviesView.vue";

const routes = [
  {
    path: "/",
    name: "upcoming",
    component: UpcomingView,
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: MovieView,
  },
  {
    path: "/movies/:title",
    name: "movies",
    component: MoviesView,
  },
  {
    path: "/actors",
    name: "actors",
    component: ActorsView,
  },
  {
    path: "/saved-movies",
    name: "saved-movies",
    component: SavedMoviesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "upcoming" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "upcoming" });
  }
});
export default router;
