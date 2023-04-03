import {Link, useParams} from "react-router-dom";
import React, {useContext, useState} from "react";
import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import SidebarComponent from "./littleComponents/SidebarComponent";
import {Context} from "../context/MenuContext";

const WelcomeComponent = () => {
    const {menuActive, setMenuActive} = useContext(Context)
    const {username} = useParams()
    return (
        <div>

            <h1>Welcome {username}</h1>
            Welcome Component
        </div>
    );
};



export default WelcomeComponent;