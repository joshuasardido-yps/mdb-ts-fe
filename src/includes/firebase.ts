import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfyLwXH6JMOMiokPtRWtzzCqM-LVIzrb8",
  authDomain: "movie-database-f6bea.firebaseapp.com",
  projectId: "movie-database-f6bea",
  storageBucket: "movie-database-f6bea.appspot.com",
  messagingSenderId: "136035442295",
  appId: "1:136035442295:web:445d68ca5768e3e3923072",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
