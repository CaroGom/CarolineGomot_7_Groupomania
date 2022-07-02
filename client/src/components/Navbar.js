import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/LogOut";

const Navbar = () => {
    const uid = useContext(UidContext);
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
                            <h5>Bienvenue !</h5>
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