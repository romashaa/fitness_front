import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, FormText, InputGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocalState} from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import userStore from '../store/UserStore'
import {inject, observer} from "mobx-react";
import {Context} from "../index";

const LoginComponent  = observer(() => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const {currentUserStore} = useContext(Context)

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
                 const authValue = headers.get("authorization");
                 localStorage.setItem("jwt", JSON.stringify(authValue));
                 navigate(`/myProfile/${username}`)
                 localStorage.setItem('currentUser',  jwt_decode(authValue).sub);
                // console.log(jwt_decode(authValue).sub)
            }).catch((message)=> {
               alert(message)
               console.log(message)
        });
        axios.get(`myProfile/api/auth/userDto/${username}`)
            .then(r =>{
                const userFields = r.data;
                currentUserStore.setCurrentUser(userFields);
            })
            .catch(err => console.log(err))
        currentUserStore.setIsAuth(true)
    }

    return (
        <div className="Login ">
            <h1>Увійти</h1>
            <Row className="justify-content-md-center">
                <Form className="col-4">
                    <Form.Group>
                        <Form.Label>Ім'я користувача/e-mail</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username}
                                      onChange={handleUsernameChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Button style={{margin:"10px"}} variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                        Login
                    </Button><br/>
                    <FormText>
                        <Link to='/register'>Ще не маєте акаунту? Зареєструватися.</Link>
                    </FormText>

                </Form>
            </Row>
            {showErrorMessage &&
            <div className="errorMessage">Authentication failed. Please check your credentials.</div>}
        </div>
    );
});


export default LoginComponent;