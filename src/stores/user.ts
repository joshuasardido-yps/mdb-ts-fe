import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
import type IUser from "@/interfaces/IUser";
import type { TUserCred } from "@/types/TUserCred";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false as boolean,
  }),

  actions: {
    async register(user: IUser): Promise<void> {
      const userCred = (await auth.createUserWithEmailAndPassword(
        user.email as string,
        user.password as string
      )) as TUserCred;

      await usersCollection.doc(userCred.user.uid).set({
        name: user.name as string,
        email: user.email as string,
        age: user.age as number,
        country: user.country as string,
      });

      await userCred.user.updateProfile({
        displayName: user.name as string,
      });

      this.userLoggedIn = true;
    },

    async authenticate(user: IUser): Promise<void> {
      await auth.signInWithEmailAndPassword(
        user.email as string,
        user.password as string
      );

      this.userLoggedIn = true;
    },

    async signOut(): Promise<void> {
      await auth.signOut();

      this.userLoggedIn = false;
    },

    async checkUser(): Promise<string> {
      return (await auth.currentUser) as any;
    },

    async getProfile(): Promise<object> {
      const user = auth.currentUser;
      console.log("xxxx", user);
      return {};
    },
  },
});
