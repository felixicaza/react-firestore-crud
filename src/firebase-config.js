import firebase from 'firebase/app';
import 'firebase/firestore';

// Add your firebase configuration here
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);

const firestoreDB = firebaseInit.firestore();

export default firestoreDB;
