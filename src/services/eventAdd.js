import {collection,getDocs,getDoc,addDoc,doc} from "firebase/firestore";
import {db} from "../firebase_config";
 

const eventRef = collection(db,"events")

export const addEvent= (n) =>{
    return addDoc(eventRef,n);
};
export const getAllEvent = () => {
    return getDocs(eventRef);  
}