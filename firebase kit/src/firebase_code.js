// real-time firebase database
// Import the functions you need from the SDKs you need
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore-lite.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
// import {  } from "../firebase/firebase-database";
// import { Firestore } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
// set, ref, child, update, remove
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// {
//     apiKey: "AIzaSyD6n5GrUTJofcBEOe_VUIcKdEujJLUZeto",
//     authDomain: "quizzes-and-tests-0.firebaseapp.com",
//     databaseURL: "https://quizzes-and-tests-0-default-rtdb.firebaseio.com",
//     projectId: "quizzes-and-tests-0",
//     storageBucket: "quizzes-and-tests-0.appspot.com",
//     messagingSenderId: "606479983980",
//     appId: "1:606479983980:web:d42f93d1e107e44382bf49",
//     measurementId: "G-5HT3VL8SWR"
// }

let firebaseConfig, app, analytics, db

function init_firebase(firebase_config_data) {
    firebaseConfig = firebase_config_data;

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    // analytics = getAnalytics(app);
    db = getFirestore(app)
    console.log(getDoc('c'))

    //  realtime database
    // db = getDatabase()
    // set(ref(db, "c/" + "hii"), { name: "hii" })
    //     .then(() => console.log("set"))
    //     .catch(err => console.log(err))

    // console.log("Initialized Firebase");
    // console.log(db, get(db, "c"))
    // set(db, "users/test", { name: "test" })
    // db.collection("users")
    //     .add({
    //         first: "Ada",  
    //         last: "Lovelace",
    //         born: 1815
    //     })
    //     .then((docRef) => {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });
}




export { init_firebase };

