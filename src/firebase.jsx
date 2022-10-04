import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgYTzNysm19oZ7Y6N7pSRfjVrhzRIkghg",
  authDomain: "fireebase-real-time.firebaseapp.com",
  projectId: "fireebase-real-time",
  storageBucket: "fireebase-real-time.appspot.com",
  messagingSenderId: "591022954600",
  appId: "1:591022954600:web:31c370f72aa4d0b63143dd",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
