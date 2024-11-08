import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// ID firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpiAQiFshuhmtbWTh3Y-KaF7XarRJrwRM",
  authDomain: "admin-panel-cea7d.firebaseapp.com",
  projectId: "admin-panel-cea7d",
  storageBucket: "admin-panel-cea7d.firebasestorage.app",
  messagingSenderId: "408563999172",
  appId: "1:408563999172:web:7d52a11d6781e4cdc70491",
  measurementId: "G-C5PVM4HJCR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product); // Přídání nového dokumentu do databáze
    console.log("Product added with ID: ", docRef.id); // Potvrzení přidání produktu
  } catch (e) {
    console.error("Error adding product: ", e); // Upozornění na chybu
  }
};

const getProducts = async () => {
  const queryGet = await getDocs(collection(db, "products")); // Vytáhne data z databáze
  // Projede celé pole jednoho produktu a vloží je do proměnných
  const products = queryGet.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id)); // Příkaz odebrání produktu z databáze
    console.log("Product deleted with ID:", id); // Výpis o odebrání
  } catch (e) {
    console.error("Error deleting product: ", e); // Případná error zpráva
  }
};

export { db, addProduct, getProducts, deleteProduct };
