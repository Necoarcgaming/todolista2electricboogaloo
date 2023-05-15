import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiM-k61s_4o9k9za6Xy4LOaA54VRc9N44",
  authDomain: "todolistabasebased.firebaseapp.com",
  projectId: "todolistabasebased",
  storageBucket: "todolistabasebased.appspot.com",
  messagingSenderId: "305697639549",
  appId: "1:305697639549:web:9096420beddbdaf06f7514"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }