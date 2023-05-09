import React, {useState} from 'react';
import {Form, FormText, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const RegisterComponent = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState()
    const [gender, setGender]=useState("")
    const [activityLevel, setActivityLevel]=useState("")
    const [height, setHeight] = useState()
    const [weight, setWeight]=useState()
    const navigate = useNavigate()

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

    function handleUsernameChange(event) {
        setName(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = 'api/auth/register'
        const data = {
            name: name,
            email: email,
            password: password,
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            activityLevel: activityLevel
        };
        axios
            .post(url, data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then(({data}) => {
                console.log(data);
            });
            navigate('/login')
    }
        return (
            <div className="container">
                <h1>Зареєструватися</h1>
                {/*<Row className="justify-content-md-center">*/}
                    <Form className=" m-auto col-4">
                        <Form.Group>
                            <Form.Label>Ім'я користувача</Form.Label>
                            <Form.Control type="email" placeholder="Введіть ім'я користувача" value={email}
                                          onChange={handleEmailChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="ml-0">Вік</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Введіть вік" value={age}
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
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="text" placeholder="Введіть e-mail" value={name}
                                          onChange={handleUsernameChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" value={password}
                                          onChange={handlePasswordChange}/>
                        </Form.Group>
                        <Button style={{margin:"10px"}} variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                            Register
                        </Button><br/>
                        <FormText>
                            <Link to="/login">Вже зареєстровані? Увійти.</Link>
                        </FormText>

                    </Form>
                {/*</Row>*/}
            </div>
        );
    };
export default RegisterComponent;