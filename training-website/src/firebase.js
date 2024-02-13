// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDE2m4Gi955pyPGJxdgP8D_q4pyIT0VTU",
    authDomain: "dc3010-individual-projec-27a02.firebaseapp.com",
    projectId: "dc3010-individual-projec-27a02",
    storageBucket: "dc3010-individual-projec-27a02.appspot.com",
    messagingSenderId: "770247357288",
    appId: "1:770247357288:web:f6bbaea24fa917d570dcdd",
    measurementId: "G-HV0G443KCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Define login, signup and logout functions for app session
function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
function logOut() {
    return signOut(auth);
}

// Monitor status of user on the application
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        console.log("Auth", currentuser);
        setUser(currentuser);
    });

    return () => {
        unsubscribe();
    };
}, []);