import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBuqvJMG-n8O6APgwQL06gW5QdGqmjjDw4",
  authDomain: "list-of-clients-3f80d.firebaseapp.com",
  databaseURL: "https://list-of-clients-3f80d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "list-of-clients-3f80d",
  storageBucket: "list-of-clients-3f80d.firebasestorage.app",
  messagingSenderId: "38104258111",
  appId: "1:38104258111:web:81023b2c982c3c98310a8a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue};