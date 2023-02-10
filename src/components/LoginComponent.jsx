import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContex";
import {Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const LoginComponent = () => {
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
        <div className="Login ">
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
                 Login
             </Button>
         </Form>
     </Row>

            {/*<div className="LoginForm">*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <label htmlFor="username">username</label>*!/*/}
            {/*    /!*    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <label htmlFor="password">Password</label>*!/*/}
            {/*    /!*    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <label htmlFor="weight">Weight</label>*!/*/}
            {/*    /!*    <input type="number" name="weight" value={weight} onChange={handleWeightChange}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <label htmlFor="height">Height</label>*!/*/}
            {/*    /!*    <input type="number" name="height" value={height} onChange={handleHeightChange}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <label htmlFor="birthYear">Birth Year</label>*!/*/}
            {/*    /!*    <input type="number" name="birthYear" value={birthYear} onChange={handleBirthYearChange}/>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    /!*<div>*!/*/}
            {/*    /!*    <button type="button" name="login" onClick={handleSubmit}>Login</button>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
            {showErrorMessage &&   <div className="errorMessage">Authentication failed. Please check your credentials.</div>}
        </div>


    );
};

export default LoginComponent;