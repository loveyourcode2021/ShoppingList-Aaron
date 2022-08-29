import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
const firebaseConfig1 = {
  apiKey: process.env.REACT_APP_API_KEY_A,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_A,
  projectId: process.env.REACT_APP_PROJECT_ID_A,
  storageBucket: process.env.REACT_APP_STOREAGE_BUCKET_A,
  messagingSenderId: process.env.REACT_APP_MESSING_SENDER_ID_A,
  appId: process.env.REACT_APP_APP_ID_A,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_A
}
const app = initializeApp(firebaseConfig1)



const storage = getStorage(app);
const collections = {
    PRODUCTS: "products",
    ORDERS: "orders",
}




export {  collections, storage };

