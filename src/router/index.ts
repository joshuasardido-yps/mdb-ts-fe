import { createRouter, createWebHistory } from "vue-router";
import UpcomingView from "@/views/UpcomingView.vue";
import MovieView from "@/views/MovieView.vue";
import MoviesView from "@/views/MoviesView.vue";
import ActorsView from "@/views/ActorsView.vue";
import SavedMoviesView from "@/views/SavedMoviesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
  ],
});

export default router;
