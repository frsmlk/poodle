// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4H-VPqmEy3oROBmFr8fOYlHNN30_IG9A',
  authDomain: 'poodle-202ef.firebaseapp.com',
  projectId: 'poodle-202ef',
  storageBucket: 'poodle-202ef.appspot.com',
  messagingSenderId: '189587937896',
  appId: '1:189587937896:web:13954e309514515dacb9dd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);
