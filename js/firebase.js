// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
    apiKey: "AIzaSyD2acNg-aWLtVJzovE9ZAvv1BZccT0SOvo",
    authDomain: "spa-firebase-c0519.firebaseapp.com",
    projectId: "spa-firebase-c0519",
    storageBucket: "spa-firebase-c0519.appspot.com",
    messagingSenderId: "690871552047",
    appId: "1:690871552047:web:db8b5937ee552de9c29eda"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);