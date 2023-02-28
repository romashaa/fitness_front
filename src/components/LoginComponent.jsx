import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContex";
import {Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocalState} from "../util/useLocalStorage";

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    const [jwt, setJwt] = useLocalState("","jwt")

    // useEffect(()=>{
    //     if(!jwt){
    //         const reqBody={
    //             "username":"masha",
    //             "password":"asdfasdf"
    //         }
    //         fetch('api/auth/login',{
    //             headers:{
    //                 "Content-type":"application/json"
    //             },
    //             method:"post",
    //             body:JSON.stringify(reqBody)
    //         })
    //             .then((response) => Promise.all([response.json(),response.headers]))
    //             .then(([body,headers]) =>{
    //                 setJwt(headers.get("authorization"));
    //                 console.log(jwt);
    //             });
    //     }
    // },[])
    //
    // useEffect(()=>{
    //     console.log(`JWT is ${jwt}`)
    // },[jwt])



    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
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