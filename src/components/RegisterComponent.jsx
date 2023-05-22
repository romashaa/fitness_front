import React, {useState} from 'react';
import {Form, FormGroup, FormText, Row} from "react-bootstrap";
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
                    <Form className=" m-auto col-4" style={{textAlign:'left'}}>
                        <Form.Group>
                            <Form.Label className='label'>Ім'я користувача</Form.Label>
                            <Form.Control type="email" placeholder="Введіть ім'я користувача" value={email}
                                          onChange={handleEmailChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="ml-0 label">Вік</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Введіть вік" value={age}
                                          onChange={handleAgeChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="radio-label label">Стать</Form.Label>
                            <div className="radio-options">
                                <Form.Check
                                    label="Чоловіча"
                                    name="group1"
                                    type="radio"
                                    id="male"
                                    value="MALE"
                                    checked={gender === 'MALE'}
                                    onChange={handleGenderChange}
                                    className="form-check"

                                />
                                <Form.Check
                                    className="form-check"
                                    label="Жіноча"
                                    name="group1"
                                    type="radio"
                                    id="female"
                                    value="FEMALE"
                                    checked={gender === 'FEMALE'}
                                    onChange={handleGenderChange}
                                    style={{marginRight:'10px', marginLeft:'20px', alignItems:'center'}}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label'>Спосіб життя</Form.Label>
                            <Form.Select aria-label="Спосіб життя" value={activityLevel} onChange={handleActivityLevelChange}>
                                <option value="SEDENTARY_ACTIVE">Малорухливий</option>
                                <option value="LIGHTLY_ACTIVE">Злегка активний</option>
                                <option value="MODERATELY_ACTIVE">Помірно активний</option>
                                <option value="ACTIVE">Активний</option>
                                <option value="VERY_ACTIVE">Дуже активний</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label'>Зріст</Form.Label>
                            <Form.Control type="text" placeholder="Введідь ваш зріст" value={height}
                                          onChange={handleHeightChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label'>Вага</Form.Label>
                            <Form.Control type="text" placeholder="Введіть вашу вагу" value={weight}
                                          onChange={handleWeightChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label'>E-mail</Form.Label>
                            <Form.Control type="text" placeholder="Введіть e-mail" value={name}
                                          onChange={handleUsernameChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label'>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" value={password}
                                          onChange={handlePasswordChange}/>
                        </Form.Group>
                        <FormGroup style={{textAlign:'center'}}>
                            <Button style={{margin:"10px"}} variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                                Register
                            </Button><br/>
                            <FormText style={{fontSize:'16px', paddingBottom:'30px'}}>
                                <Link to="/login">Вже зареєстровані? Увійти.</Link>
                            </FormText>
                        </FormGroup>
                    </Form>
                {/*</Row>*/}
            </div>
        );
    };
export default RegisterComponent;