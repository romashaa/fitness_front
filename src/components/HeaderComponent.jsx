import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import SidebarComponent from "./littleComponents/SidebarComponent";
import {Context} from "../context/UserContext";
import {Nav, Navbar} from "react-bootstrap";

const HeaderComponent = () => {
    // const {menuActive, setMenuActive} = useContext(Context)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <Navbar expand="md" className="header">
            <Navbar.Brand href="/" className="headerBrand">Fitness App</Navbar.Brand>
            <Navbar.Toggle onClick={handleMobileMenuToggle} />
            <Navbar.Collapse className="justify-content-end" isOpen={isMobileMenuOpen}>
                <Nav>
                    <Nav.Link className="headerMenuItem fs-5" href="/myProfile/masha">Мій профіль</Nav.Link>
                    <Nav.Link className="headerMenuItem fs-5" href="/ration">Раціон</Nav.Link>
                    <Nav.Link className="headerMenuItem fs-5" href="/login">Login</Nav.Link>
                    <Nav.Link className="headerMenuItem fs-5" href="/register">Register</Nav.Link>
                    <Nav.Link className="headerMenuItem fs-5" href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default HeaderComponent;