import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyC8pa0n0rTBDSDIOEOxvH0hJc6Y9xY6ZCA",
  authDomain: "fir-realtime-db-app.firebaseapp.com",
  databaseURL: "https://fir-realtime-db-app.firebaseio.com",
  projectId: "fir-realtime-db-app",
  storageBucket: "fir-realtime-db-app.appspot.com",
  messagingSenderId: "672263673706",
  appId: "1:672263673706:web:d5bc9185fc8992d4847713"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
export {db}