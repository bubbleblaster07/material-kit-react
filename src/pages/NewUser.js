import react,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {
    Card,

  } from '@mui/material';


import { Helmet } from 'react-helmet-async';

import './NewUser.css';
import {toast} from 'react-toastify';
import fireDb from '../firebase';
import {db} from "../firebase_config";
import UserDataService, { addUser ,getAllUser} from "../services/userAdd"
// import firebase from "firebase";



const initialState={
    userName:"",
    emailAddress:"",
    phoneNumber:""

}


const NewUser = () =>{
    const [state,setState]=useState(initialState);
    const {userName,emailAddress,phoneNumber}=state;
    const navigate=useNavigate();


    
    const onsubmit=(e)=>{
        e.preventDefault();
        if(!userName && !emailAddress && !phoneNumber){
            toast.error("please provide the value in each input field")
        }else{
            addUser(state,(err)=>{
                console.log(addUser,"data");
            // db.collection("events").add(state,(err)=>{
            // fireDb.child("New user").push(state,(err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.success("new user have been added successfully")
                    toast.dismiss()
                }
            })
        }
        setTimeout(()=> 
        navigate(-1),500)
    };
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    };
    return(
        <>
            <Helmet>
                <title> New Registration </title>
            </Helmet>
            <Card>
                <div style={{marginTop:"100px"}}>
                    <form style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        alignContent: "center"

                    }}
                    onSubmit={onsubmit
                    }
                    >
                        <label htmlFor="name">Name
                        <input type="text"
                            id="userName"
                            name="userName"
                            placeholder="enter your name.."
                            value={userName} 
                            onChange={handleInputChange} 
                        />
                        </label>
                        <label htmlFor="email">Email
                        <input type="text"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="enter your email Id.."
                            value={emailAddress} 
                            onChange={handleInputChange} 
                        />
                        </label>
                        <label htmlFor="role">Number
                        <input type="number"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="enter your number.."
                            value={phoneNumber} 
                            onChange={handleInputChange} 
                        />
                        </label>
                        <input type="submit" value="save" onChange={onsubmit}/>
                    </form >
                    
                </div>

            </Card>
            
        </>    
    );
};



export default NewUser;
