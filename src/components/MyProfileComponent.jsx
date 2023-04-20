import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, InputGroup, ListGroup, Modal, FormCheck, Form} from "react-bootstrap";
import avatar from '../img/avatar.png'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {UserContext} from "../context/UserContext";
import jwt_decode from "jwt-decode";
import {logDOM} from "@testing-library/react";

const MyProfileComponent = () => {
    const [age, setAge] = useState()
    const [gender, setGender]=useState("FEMALE")
    const [aim, setAim]=useState("")
    const [height, setHeight] = useState()
    const [weight, setWeight]=useState()
    const [show, setShow] = useState(false);
    // let user = jwt_decode(localStorage.getItem("jwt")).sub;
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(storedUser);
        }
        console.log(storedUser)
        if(currentUser) {
            axios.get(`api/auth/user/${currentUser}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [currentUser]);




    const handleClose = () => setShow(false);
    const handleShow = () => {
        setGender(userData.gender)
        setWeight(userData.weight)
        setHeight(userData.height)
        setAge(userData.age)
        setAim(userData.goal)
        setShow(true);
    }

    function handleGenderChange(event) {
        setGender(event.target.value)
    }
    function handleAimChange(event) {
        setAim(event.target.value)
    }
    function handleAgeChange(event) {
        setAge(event.target.value)
    }
    function handleHeightChange(event) {
        setHeight(event.target.value)
    }

    function handleWeightChange(event) {
        setWeight(event.target.value)
    }



    function updateUser(){
        const reqBody = {
            age: age,
            gender: gender,
            goal: aim,
            height: height,
            weight: weight
        }
        fetch(`api/auth/user/${currentUser}`,{
            headers:{
                "Content-type":"application/json"
            },
            method:"put",
            body:JSON.stringify(reqBody)
        }).then(r => alert("updated"));
        setUserData({
            age: age,
            gender: gender,
            goal: aim,
            height: height,
            weight: weight
        })
        setShow(false)
    }



    return (
        <div>
            <Modal show={show} onHide={handleClose} style={{backgroundColor: "rgba(0, 0, 0, 0)", height:'100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="ml-0">Age</Form.Label>
                            <Form.Control type="email" placeholder="Enter age" value={age}
                                          onChange={handleAgeChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Check
                                inline
                                label="Чоловіча"
                                name="group1"
                                type="radio"
                                id="male"
                                value="MALE"
                                checked={gender === 'MALE'}
                                onChange={handleGenderChange}
                            />
                            <Form.Check
                                inline
                                label="Жіноча"
                                name="group1"
                                type="radio"
                                id="female"
                                value="FEMALE"
                                checked={gender === 'FEMALE'}
                                onChange={handleGenderChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Goal</Form.Label>
                            <Form.Select aria-label="Оберіть ціль" value={aim} onChange={handleAimChange}>
                                <option value="STAYINFORM">Залишатися в формі</option>
                                <option value="LOSEWEIGHT">Схуднути</option>
                                <option value="BIGMUSCLES">Набрати м'язову масу</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="text" placeholder="Enter height" value={height}
                                          onChange={handleHeightChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="text" placeholder="Enter weight" value={weight}
                                          onChange={handleWeightChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрити
                    </Button>
                    <Button variant="primary" onClick={updateUser}>
                        Зберегти
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <div className="row">
                    <Card className="row m-auto col-md-4">
                        <Card.Img className="m-auto" style={{width:"18rem"}} variant="top" src={avatar}/>
                        <Card.Body>
                            <Card.Title>{currentUser}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {userData.gender ==="MALE"? <ListGroup.Item>Стать :  Чоловіча </ListGroup.Item>
                                : <ListGroup.Item>Стать : Жіноча </ListGroup.Item>}
                            <ListGroup.Item>Вік: {userData.age}</ListGroup.Item>
                            <ListGroup.Item>Зріст: {userData.height}</ListGroup.Item>
                            <ListGroup.Item>Вага: {userData.weight}</ListGroup.Item>
                            {userData.goal==="BIGMUSCLES" ? <ListGroup.Item>Ціль: Набрати м'язову масу</ListGroup.Item> :
                                userData.goal==="LOSEWEIGHT" ? <ListGroup.Item>Ціль: Схуднути</ListGroup.Item> :
                                    <ListGroup.Item>Ціль: Залишатися в формі</ListGroup.Item>}


                        </ListGroup>
                        <Card.Body>
                            <Button variant="primary" onClick={handleShow}>
                                Редагувати
                            </Button>
                        </Card.Body>
                    </Card>


                </div>
            </div>
        </div>
    );
};

export default MyProfileComponent;