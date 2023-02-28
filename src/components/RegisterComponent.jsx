import React, {useState} from 'react';
import {Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContex";

const RegisterComponent = () => {
    const[username, setUsername] =useState('')
    const[password, setPassword] =useState('')
    const[weight, setWeight] =useState('')
    const[height, setHeight] =useState('')
    const[birthYear, setBirthYear] =useState('')
    const[showErrorMessage, setShowErrorMessage] =useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()
    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handleWeightChange(event){
        setWeight(event.target.value)
    }
    function handleHeightChange(event){
        setHeight(event.target.value)
    }
    function handleBirthYearChange(event){
        setBirthYear(event.target.value)
    }
    function handleSubmit(){
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }else {
            setShowErrorMessage(true)
        }
    }
    return (
        <div>
            <Row className="justify-content-md-center">
                <Form className="col-5">
                    <Form.Group>
                        <Form.Label className="ml-0">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" placeholder="Enter weight" value={weight} onChange={handleWeightChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="number" placeholder="Enter height" value={height} onChange={handleHeightChange}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Birth Year</Form.Label>
                        <Form.Control type="number" placeholder="Enter birth year" value={birthYear} onChange={handleBirthYearChange}/>
                    </Form.Group>
                    <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                        Register
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default RegisterComponent;