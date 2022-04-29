import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyD5Lb7mk2-QkOSzTsdG5rTkzYwvN37cn40",
    authDomain: "fhomez-c86fb.firebaseapp.com",
    projectId: "fhomez-c86fb",
    storageBucket: "fhomez-c86fb.appspot.com",
    messagingSenderId: "418087428319",
    appId: "1:418087428319:web:261028897e59afa6b1896a",
});

const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
