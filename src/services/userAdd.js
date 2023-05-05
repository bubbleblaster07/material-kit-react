
import {collection,getDocs,getDoc,addDoc,doc} from "firebase/firestore";
import {db} from "../firebase_config";
 

const userRef = collection(db,"users")

export const addUser= (n) =>{
    return addDoc(userRef,n);
};
export const getAllUser = () => {
    return getDocs(userRef);  
}