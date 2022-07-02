import React, { useEffect, useState, useContext, createContext } from 'react';
import { UidContext } from './components/AppContext';
import Routes from "./components/Routes";

import axios from "axios";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';



const App = () => {
    
    const [uid, setUid]= useState(null);
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchToken = async () => {
            await axios({
                method: "GET",
                url:`${process.env.REACT_APP_API_URL}`,
              
                
            })
            .then((res) => {
                /*console.log(res.data)
                console.log(localStorage.getItem('token'))*/
                setUid(localStorage.getItem('userId'))})
            .catch((err) => console.log("No token"))
        }
        fetchToken();

        if(uid) dispatch(getUser(uid))
    }, [uid])

    return (
        <UidContext.Provider value ={uid}>
       
            <Routes />
        
        </UidContext.Provider>
    );
};

export default App;

/*    const [uid, setUid]= useState(null);

    useEffect( () => {
        const fetchToken = async () => {
            await axios({
                method: "GET",
                url:`${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                setUid(res.data)})
            .catch((err) => console.log("No token"))
        }
        fetchToken();
    }, [uid])
    */

    /*    const [uid, setUid]= useState(null);

    useEffect( () => {
        const fetchToken = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}jwtid`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  }
               
            })

        const verifyToken = await fetchToken.json()
            .then((res) => {
                console.log(res)
                setUid(res.data)})
            .catch((err) => console.log("No token"))
        }
        fetchToken();
    }, [uid])

    headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' }
    */