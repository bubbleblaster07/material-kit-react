import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA",
    authDomain: "gomasjid-4a35a.firebaseapp.com",
    projectId: "gomasjid-4a35a",
    storageBucket: "gomasjid-4a35a.appspot.com",
    messagingSenderId: "416819165099",
    appId: "1:416819165099:web:2b48d670bc8a4b4a9444ee",
    measurementId: "G-7B04JD2R2N"
};

const app=initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storage = firebase.storage();

export default db;