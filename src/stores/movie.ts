import { defineStore } from "pinia";
import axios from "redaxios";
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

export const useMovieStore = defineStore("movie", {
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

    async requestMovie(id: number): Promise<void> {
      this.loading = true;
      this.clearMovies();

      try {
        const response = await axios.request(options(`/titles/${id}`) as any);

        this.movies.results = [
          ...response.data.results,
          response.data.results,
        ] as any;
        this.loading = false;
      } catch (error) {
        this.errors;
      }
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
        (movie: { id: string }) => movie.id === id
      );
    },

    saveMovie(data: { id: string }): void {
      const isExist = this.checkMovie(data.id).filter(
        (movie: { id: string }) => movie.id === data.id
      );

      if (isExist.length === 0) {
        this.savedMovies = [...this.savedMovies, data] as any;
      }
    },

    unsaveMovie(id: string): void {
      const newSavedMovies: { id: string }[] = this.savedMovies;

      const indexOfObject = newSavedMovies.findIndex((movie) => {
        return movie.id === id;
      });

      if (indexOfObject !== -1) {
        newSavedMovies.splice(indexOfObject, 1);
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
