import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUAQmR12m8zb7tkwRfw3KvKMscEyDaF0M",
    authDomain: "wayfinderapp-8f8f7.firebaseapp.com",
    projectId: "wayfinderapp-8f8f7",
    storageBucket: "wayfinderapp-8f8f7.firebasestorage.app",
    messagingSenderId: "284872104501",
    appId: "1:284872104501:web:2640e04a09f66a13f26f7c",
    measurementId: "G-JKVLPLVKSG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;


