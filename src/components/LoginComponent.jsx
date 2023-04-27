import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocalState} from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";
import UserContext from "../context/UserContext";

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const [jwt, setJwt] = useLocalState("","jwt")

    const {setCurrentUser} = useContext(UserContext);

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();

        const reqBody={
            username: username,
            password: password,
        }


        fetch('api/auth/login',{
            headers:{
                "Content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify(reqBody)
        })
            .then((response) => {
                if(response.status===200)
                    return Promise.all([response.json(), response.headers]);
                else return Promise.reject("Invalid login attempt")
            })
            .then(([body,headers]) =>{
               // setJwt(headers.get("authorization"));
                 const authValue = headers.get("authorization");
                 localStorage.setItem("jwt", JSON.stringify(authValue));
                 navigate(`/myProfile/${username}`)
                localStorage.setItem('currentUser',  jwt_decode(authValue).sub);
                console.log(jwt_decode(authValue).sub)
                setCurrentUser(jwt_decode(authValue).sub)
            }).catch((message)=> {
               alert(message)
               console.log(message)
        });
       // setCurrentUser(jwt_decode(localStorage.getItem('jwt')).sub)
        //navigate(`/welcome/${username}`)
    }

    return (
        <div className="Login ">
            <Row className="justify-content-md-center">
                <Form className="col-5">
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username}
                                      onChange={handleUsernameChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                </Form>
            </Row>
            {showErrorMessage &&
            <div className="errorMessage">Authentication failed. Please check your credentials.</div>}
        </div>


    );
};

export default LoginComponent;