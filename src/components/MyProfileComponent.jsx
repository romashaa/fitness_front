import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Card, InputGroup, ListGroup, Modal, FormCheck, Form} from "react-bootstrap";
import avatar from '../img/girl.png'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Context} from "../index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const MyProfileComponent = () => {
    const {currentUserStore} = useContext(Context)
    const [age, setAge] = useState()
    const [gender, setGender]=useState("")
    const [activityLevel, setActivityLevel]=useState("")
    const [height, setHeight] = useState()
    const [weight, setWeight]=useState()
    const [show, setShow] = useState(false);
    const [caloriesNorm, setCaloriesNorm]=useState(0)
    const [loaded, setLoaded] = useState(false)
    // const {currentUser, setCurrentUser} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState('')
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(storedUser);
        }
        //console.log(storedUser)
        if(currentUser) {
             axios.get(`api/auth/user/${currentUser}`)
                .then(response => {
                    setUserData(response.data)
                    setNorm()
                }).catch(error => {
                    console.log(error)
                }).finally(()=>{
                 setLoaded(true)
                });
        }
        setLoaded(true)

    }, [currentUser, caloriesNorm]);




    const handleClose = () => setShow(false);
    const handleShow = () => {
        setGender(userData.gender)
        setWeight(userData.weight)
        setHeight(userData.height)
        setAge(userData.age)
        setActivityLevel(userData.activityLevel)
        setShow(true);
        console.log(currentUserStore.isAuth)
    }

    function handleGenderChange(event) {
        setGender(event.target.value)
    }
    function handleActivityLevelChange(event) {
        setActivityLevel(event.target.value)
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
            activityLevel: activityLevel,
            height: height,
            weight: weight
        }
        fetch(`api/auth/user/${currentUser}`,{
            headers:{
                "Content-type":"application/json"
            },
            method:"put",
            body:JSON.stringify(reqBody)
        })
            .then(r => console.log("updated"));
        setUserData({
            age: age,
            gender: gender,
            activityLevel: activityLevel,
            height: height,
            weight: weight
        })
        setShow(false)
    }

    const setNorm = () =>{
        let norm;
        if(userData.gender==='FEMALE'){
            norm=10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
        }
        if(userData.gender==='MALE'){
            norm= 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
        }
        let norm2;
        if(userData.activityLevel==='SEDENTARY_ACTIVE'){
            norm2=norm*1.2;
        }
        if(userData.activityLevel==='LIGHTLY_ACTIVE'){
            norm2=norm*1.375;
        }
        if(userData.activityLevel==='MODERATELY_ACTIVE'){
            norm2=norm*1.55;
        }
        if(userData.activityLevel==='ACTIVE'){
            norm2=norm*1.725;
        }
        if(userData.activityLevel==='VERY_ACTIVE'){
            norm2=norm*1.9;
        }
         setCaloriesNorm(Math.round(norm2));

    }

    function countNorm() {
        setNorm();
       // console.log(caloriesNorm);
        fetch(`api/auth/user/${currentUser}/countNorm?norm=${caloriesNorm}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                // handle response
            })
            .catch(error => {
                // handle error
            });
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} style={{backgroundColor: "rgba(0, 0, 0, 0)", height:'100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Мої дані</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="ml-0">Вік</Form.Label>
                            <Form.Control type="email" placeholder="Введіть вік" value={age}
                                          onChange={handleAgeChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Стать</Form.Label>
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
                            <Form.Label>Спосіб життя</Form.Label>
                            <Form.Select aria-label="Спосіб життя" value={activityLevel} onChange={handleActivityLevelChange}>
                                <option value="SEDENTARY_ACTIVE">Малорухливий</option>
                                <option value="LIGHTLY_ACTIVE">Злегка активний</option>
                                <option value="MODERATELY_ACTIVE">Помірно активний</option>
                                <option value="ACTIVE">Активний</option>
                                <option value="VERY_ACTIVE">Дуже активний</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Зріст</Form.Label>
                            <Form.Control type="text" placeholder="Enter height" value={height}
                                          onChange={handleHeightChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Вага</Form.Label>
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
                <div className="container">
                    {loaded ?
                        <Card className="m-auto col-md-4" style={{marginTop:'10px'}}>
                            <Card.Img className="m-auto" style={{width: "18rem"}} variant="top" src={avatar}/>
                            <Card.Body>
                                <Card.Title>{currentUser}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {userData.gender === "MALE" ? <ListGroup.Item>Стать : Чоловіча </ListGroup.Item>
                                    : <ListGroup.Item>Стать : Жіноча </ListGroup.Item>}
                                <ListGroup.Item>Вік: {userData.age}</ListGroup.Item>
                                <ListGroup.Item>Зріст: {userData.height}</ListGroup.Item>
                                <ListGroup.Item>Вага: {userData.weight}</ListGroup.Item>
                                {userData.activityLevel === "SEDENTARY_ACTIVE" ?
                                    <ListGroup.Item>Спосіб життя: Малорухливий</ListGroup.Item> :
                                    userData.activityLevel === "LIGHTLY_ACTIVE" ?
                                        <ListGroup.Item>Спосіб життя: Злегка активний</ListGroup.Item> :
                                        userData.activityLevel === "MODERATELY_ACTIVE" ?
                                            <ListGroup.Item>Спосіб життя: Помірно активний</ListGroup.Item> :
                                            userData.activityLevel === "ACTIVE" ?
                                                <ListGroup.Item>Спосіб життя: Активний</ListGroup.Item> :
                                                <ListGroup.Item>Спосіб життя: Дуже активний</ListGroup.Item>}
                            </ListGroup>
                            <Card.Body>
                                <Button variant="primary" onClick={handleShow}>
                                    Редагувати
                                </Button>
                            </Card.Body>
                        </Card> : <div>Dgdfxgdsfg...</div>
                    }
                    <Card bg='light' border='success' className='small-card' style={{position:"absolute", top:"10px", right:"5%"}}>
                        <Card.Header><b>Ваша норма калорій на день</b>
                            <FontAwesomeIcon icon={faInfoCircle} style={{marginLeft:"10px"}} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                На добу вам рекомендовано вживати: {loaded &&!isNaN(caloriesNorm) ? caloriesNorm : 0} ккал
                            </Card.Text>
                            <Button variant="primary" onClick={countNorm}>
                                Розрахувати
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MyProfileComponent;