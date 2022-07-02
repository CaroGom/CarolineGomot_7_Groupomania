import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { UidContext } from "./AppContext";
import Logout from "./Log/LogOut";

const Navbar = () => {
    const uid = useContext(UidContext);
    const [userData, setUserData] = useState('');
    
    const accessToken = JSON.parse(localStorage.getItem('userdata')).token;
    const id = JSON.parse(localStorage.getItem('userdata')).user;

    useEffect (() => 
        {
            const infosAxios = async () => {
            const res = await axios.get (`${process.env.REACT_APP_API_URL}api/auth/` + id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
            setUserData({
                email: res.data.email,
            });
        };
        infosAxios();
    },
      [id, accessToken]);
        
  /**/ 


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to ="/"></NavLink>
                    <div className="logo">
                        <img src="./img/icon.png" alt = "icon"/>
                        <h3>Groupomania</h3>
                    </div>
                </div>
            { uid ? (
                <ul>
                    <li></li>
                    <li className="welcome">
                        <NavLink exact to ="/connexion">
                            <h5>Bienvenue {userData.email} !</h5>
                        </NavLink>
                    </li>
                    <Logout/>
                </ul>
            ) : (
                <ul>
                    <li></li>
                    <li> 
                        <NavLink exact to="/connexion">
                            <img src="./img/icons/login.svg"/>
                        </NavLink>
                    </li>
                </ul>
            )}
            </div>

        </nav>
    )
};

export default Navbar;