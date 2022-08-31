import * as dotenv from 'dotenv';
dotenv.config();


const firebaseConfig1 = {
  apiKey: process.env.API_KEY_A,
  authDomain: process.env.AUTH_DOMAIN_A,
  projectId: process.env.PROJECT_ID_A,
  storageBucket: process.env.STOREAGE_BUCKET_A,
  messagingSenderId: process.env.MESSING_SENDER_ID_A,
  appId: process.env.APP_ID_A,
  measurementId: process.env.MEASUREMENT_ID_A
};


export { firebaseConfig1 } 
