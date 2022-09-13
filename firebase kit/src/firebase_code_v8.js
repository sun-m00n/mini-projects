// cloud firestore database
let firebaseConfig, app, db

function init_firebase(firebase_config_data) {
    firebaseConfig = firebase_config_data;
    // Initialize Firebase
    app = firebase.initializeApp(firebase_config_data);
    db = firebase.firestore();

    // db.collection("users").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    // })
    //     .then((docRef) => {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });
}

export { init_firebase };

