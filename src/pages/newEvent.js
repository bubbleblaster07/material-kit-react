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
import UserDataService, { addEvent } from "../services/eventAdd"
// import firebase from "firebase";



const initialState={
    title:"",
    status:"",
    weekly:"",
    // link_text:"",
    // link:"",
    // image_url:"",
    description:"",
    date:"",
    // id:"",

}


const NewEvents = () =>{
    const [state,setState]=useState(initialState);
    const {date,title,status,weekly,description}=state;
    const navigate=useNavigate();


    
    const onsubmit=(e)=>{
        e.preventDefault();
        if(!title && !date && !status && !weekly && !description){
            toast.error("please provide the value in each input field")
        }else{
            addEvent(state,(err)=>{
                console.log(addEvent,"data");
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
                <title> New Event </title>
            </Helmet>
            <Card variant="outlined">
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
                        <label htmlFor="title">Title
                        <input type="text"
                            id="title"
                            name="title"
                            placeholder="enter title.."
                            value={title} 
                            onChange={handleInputChange} 
                        />
                        </label>
                        <label htmlFor="date">Date
                        <input type="date"
                            id="date"
                            name="date"
                            placeholder="00-00-0000"
                            value={date} 
                            onChange={handleInputChange} 
                        />
                        </label><br/>
                        <label htmlFor="status">status
                        <input type="text"
                            id="status"
                            name="status"
                            placeholder=""
                            value={status} 
                            onChange={handleInputChange} 
                        />
                        </label>                        
                        <label htmlFor="weekly">weekly
                        <input type="text"
                            id="weekly"
                            name="weekly"
                            placeholder=""
                            value={weekly} 
                            onChange={handleInputChange} 
                        />
                        </label>                        
                        <label htmlFor="description">description
                        <input type="text"
                            id="description"
                            name="description"
                            placeholder="enter description"
                            value={description} 
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



export default NewEvents;
