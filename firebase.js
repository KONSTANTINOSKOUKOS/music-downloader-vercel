import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    apiKey: "AIzaSyDC65gYH9AlYQV93VbR9wzCv_7ZdsN8o-k",
    authDomain: "music-downloader-ab375.firebaseapp.com",
    projectId: "music-downloader-ab375",
    storageBucket: "music-downloader-ab375.appspot.com",
    messagingSenderId: "443983257394",
    appId: "1:443983257394:web:751063ca6ddfb4e2be812b"
});

const storage = getStorage(app);
export default storage;