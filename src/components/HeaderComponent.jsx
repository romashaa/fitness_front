import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import SidebarComponent from "./littleComponents/SidebarComponent";
import {Context} from "../context/MenuContext";

const HeaderComponent = () => {
    const {menuActive, setMenuActive} = useContext(Context)
    return (
       // <header className='header'>
          //  <div className="container">
                <div className="row">
                    <SidebarComponent active={menuActive} setActive={setMenuActive}/>
                    <nav className="navbar navbar-expand-lg">
                        <div className="burger-btn" onClick={()=>setMenuActive(!menuActive)}>
                            <span/>
                        </div>
                        {/*<a className="navbar-brand ms-2 fs-2 fw-bold text-black">Fitness App</a>*/}
                        {/*<div className="collapse navbar-collapse">*/}
                        {/*    <ul className="navbar-nav">*/}
                        {/*        <li className="nav-item fs-5">*/}
                        {/*            <Link className="nav-link" to="/myProfile/masha">Мій профіль</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item fs-5">*/}
                        {/*           <Link className="nav-link" to="/ration">Раціон</Link>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5 ">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
           // </div>
        //</header>
    );
};
export default HeaderComponent;