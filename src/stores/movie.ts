import { defineStore } from "pinia";
import useUserStore from "@/stores/user";
import axios from "redaxios";
import { auth, savedMoviesCollection } from "@/includes/firebase";
import type { TOptions } from "@/types/TMovies";

const apiKey = import.meta.env.VITE_X_RapidAPI_Key;
const apiHost = import.meta.env.VITE_X_RapidAPI_Host;
const apiUrl = import.meta.env.VITE_X_RapidAPI_Url;

const options = (path: string, page?: number, limit?: number): TOptions => {
  return {
    method: "GET",
    url: `${apiUrl}${path}`,
    params: {
      page: page,
      limit: limit,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  };
};

export default defineStore("movie", {
  state: () => {
    return {
      search: {
        title: "" as string,
      },
      loading: false,
      movies: {
        entries: 0 as number,
        next: "" as string,
        results: [],
      },
      movie: {},
      savedMovies: [],
      errors: {},
    };
  },

  actions: {
    async requestUpcoming(
      page = 1 as number,
      limit = 50 as number
    ): Promise<void> {
      this.loading = true;
      this.clearMovies();

      try {
        const response = (await axios.request(
          options(`/titles/x/upcoming`, page, limit) as any
        )) as any;

        this.movies = response.data;
        this.loading = false;
      } catch (error) {
        this.errors;
      }
    },

    async requestMovies(
      page = 1 as number,
      limit = 50 as number
    ): Promise<void> {
      this.loading = true;
      this.clearMovies();

      try {
        const response = await axios.request(
          options(
            `/titles/search/title/${this.search.title}`,
            page,
            limit
          ) as any
        );

        this.movies = response.data;
        this.loading = false;
      } catch (error) {
        this.errors;
      }
    },

    requestMovie(id: string): object {
      this.loading = true;

      return this.movies.results.filter(
        (movie: { id: string }) => movie.id === id
      );
    },

    async requestActorMovies(id: number): Promise<void> {
      try {
        const response = await axios.request(options(`/titles/${id}`) as any);

        this.movies.results = [response.data.results] as any;
      } catch (error) {
        this.errors;
      }
    },

    searchTitle(title: string) {
      this.search.title = title;
      this.requestMovies();
    },

    checkMovie(id: string): any {
      return this.savedMovies.filter(
        (movie: { id: string; uid: string }) =>
          movie.id === id && movie.uid === useUserStore().getUid
      );
    },

    async requestGetSavedMovies() {
      const savedMovies = await savedMoviesCollection
        .where("uid", "==", useUserStore().getUid)
        .get();

      this.savedMovies = [];

      savedMovies.forEach((data) => {
        this.savedMovies = [...this.savedMovies, data.data()] as any;
      });
    },

    async requestSaveMovie(data: { id: string; uid: string }): Promise<void> {
      const isExist = this.checkMovie(data.id).filter(
        (movie: { id: string; uid: string }) =>
          movie.id === data.id && movie.uid === data.uid
      );

      if (isExist.length === 0) {
        data.uid = useUserStore().getUid;

        this.savedMovies = [...this.savedMovies, data] as any;

        await savedMoviesCollection.doc().set(data);
      }
    },

    async requestUnsaveMovie(id: string): Promise<void> {
      const newSavedMovies: { id: string; uid: string }[] = this.savedMovies;

      const indexOfObject = newSavedMovies.findIndex((movie) => {
        return movie.id === id && movie.uid === useUserStore().getUid;
      });

      if (indexOfObject !== -1) {
        newSavedMovies.splice(indexOfObject, 1);

        await savedMoviesCollection
          .where("id", "==", id)
          .where("uid", "==", useUserStore().getUid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
              doc.ref.delete();
            });
          });
      }
    },

    clearMovies(): void {
      this.movies = {
        entries: 0,
        next: "",
        results: [],
      };
    },
  },

  getters: {},
});
