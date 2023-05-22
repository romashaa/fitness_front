import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react";

const HeaderComponent = observer(() => {
    // const {menuActive, setMenuActive} = useContext(Context)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {currentUserStore} = useContext(Context)


    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    function handleLogout() {
        localStorage.removeItem('jwt')
        localStorage.removeItem('currentUser')
        currentUserStore.setIsAuth(false);
    }


    return (
        <Navbar expand="md" className="header">
            <Navbar.Brand href="/" className="headerBrand">Fitness App</Navbar.Brand>
            <Navbar.Toggle onClick={handleMobileMenuToggle} />
            <Navbar.Collapse className="justify-content-end" isOpen={isMobileMenuOpen}>

                    {!currentUserStore.isAuth &&
                        (<Nav>
                            <Nav.Link className="headerMenuItem fs-5" href="/login">Login</Nav.Link>
                            <Nav.Link className="headerMenuItem fs-5" href="/register">Register</Nav.Link>
                        </Nav>)
                    }

                    {currentUserStore.isAuth &&
                    (<Nav>
                        <Nav.Link  className="headerMenuItem" href="/myProfile/masha">Мій профіль</Nav.Link>
                        <Nav.Link className="headerMenuItem" href="/ration">Раціон</Nav.Link>
                        <Nav.Link className="headerMenuItem" onClick={handleLogout} href="/login">Вихід</Nav.Link>
                    </Nav>)
                    }


                    {/*<Nav.Link className="headerMenuItem fs-5" href="/login">Login</Nav.Link>*/}
                    {/*<Nav.Link className="headerMenuItem fs-5" href="/register">Register</Nav.Link>*/}
                    {/*<Nav.Link className="headerMenuItem fs-5" href="/myProfile/masha">Мій профіль</Nav.Link>*/}
                    {/*<Nav.Link className="headerMenuItem fs-5" href="/ration">Раціон</Nav.Link>*/}
                    {/*<Nav.Link className="headerMenuItem fs-5" onClick={handleLogout} href="/login">Logout</Nav.Link>*/}

            </Navbar.Collapse>
        </Navbar>
    );
});
export default HeaderComponent;