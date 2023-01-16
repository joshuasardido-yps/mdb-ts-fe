import { defineStore } from "pinia";
import useMovieStore from "@/stores/movie";
import { auth, usersCollection } from "@/includes/firebase";
import type IUser from "@/interfaces/IUser";
import type { TUserCred } from "@/types/TUserCred";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false as boolean,
    uid: "" as string,
  }),

  actions: {
    async register(user: IUser): Promise<void> {
      const userCred = (await auth.createUserWithEmailAndPassword(
        user.email as string,
        user.password as string
      )) as TUserCred;

      this.checkUser();

      this.addUser(userCred as TUserCred, user as IUser);
    },

    async addUser(userCred: TUserCred, user: IUser): Promise<void> {
      await usersCollection.doc(userCred.user.uid).set({
        name: user.name as string,
        email: user.email as string,
      });

      await userCred.user.updateProfile({
        displayName: user.name as string,
      });
    },

    async authenticate(user: IUser): Promise<void> {
      await auth.signInWithEmailAndPassword(
        user.email as string,
        user.password as string
      );

      this.checkUser();
    },

    async signOut(): Promise<void> {
      await auth.signOut();

      this.$reset();
      useMovieStore().$reset();
    },

    checkUser(): void {
      if (auth.currentUser) {
        this.userLoggedIn = true;
        this.uid = auth.currentUser.uid;
      }
    },
  },

  getters: {
    getUid: (state): string => state.uid,
  },
});
