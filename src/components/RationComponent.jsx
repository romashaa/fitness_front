import React, {useEffect, useState} from 'react';
import Counter from "./counter/Counter";
import Calendar from "react-calendar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import breakfast from '../img/breakfast.jpg'
import dinner from '../img/dinner.jpg'
import snack from '../img/snack.jpg'
import supper from '../img/supper.jpg'
import {Col, Container, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import TimePicker from "react-time-picker";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";

const RationComponent = () => {
    const [open, setOpen] = React.useState(true);
    const [show, setShow] = useState(false);
    const [value, onChange] = useState('10:00');
    const [grams, setGrams] = useState('')
    const [dishOptions, setDishOptions] = useState([])
    const [dishName, setDishName] = useState("")
    const [currentDish, setCurrentDish] = useState({})
    const [suggestions, setSuggestions] = useState([])

    const handleGramsChange = (event) => {
        const inputValue = event.target.value.slice(0, 4); // limit input to 4 characters
        setGrams(inputValue);
    }

    const addDish = () => {

    }
    useEffect(() => {
        const loadDishes = async () => {
            const response = await axios.get("/dishes/all");
            setDishOptions(response.data)
        }
        loadDishes();
    }, [])

    const onSuggestHandler = (text) => {
        setDishName(text);
        setSuggestions([]);
        setCurrentDish(dishOptions.find(dish=> dish.dishName===text))
    }

    const handleDishInputChange = (dishName) => {
        let matches = []
        if (dishName.length > 0) {
            const dishnames = dishOptions.map(dish => dish.dishName)

            matches = dishnames.filter(dishname => {
                const regex = new RegExp(`${dishName}`, "gi");
                return dishname.match(regex)
            })
        }
        console.log(matches)
        setSuggestions(matches)
        setDishName(dishName)
    }


    function addBreakfast() {

    }

    function addSnack() {

    }

    function addDinner() {

    }

    function addSupper() {

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="col-md-5 col-sm-8 m-auto menuList">
                <ListGroup as="ul">
                    <ListGroup.Item as="li" variant="flush">
                        Сніданок<FaPlus className="menuItemBtn" onClick={handleShow}/>
                        <div>
                            <ListGroup as="ul" variant="flush" className="menuListItem">
                                <ListGroup.Item as="li">
                                    Cras justo odio
                                </ListGroup.Item>
                                <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item as="li">
                                    Morbi leo risus
                                </ListGroup.Item>
                                <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" variant="flush">Обід <FaPlus className="menuItemBtn"
                                                                         onClick={addDinner}/></ListGroup.Item>
                    <ListGroup.Item as="li" variant="flush">Вечеря <FaPlus className="menuItemBtn" onClick={addSupper}/></ListGroup.Item>
                    <ListGroup.Item as="li" variant="flush">Перекус <FaPlus className="menuItemBtn" onClick={addSnack}/></ListGroup.Item>
                </ListGroup>
            </div>

            <Modal show={show} onHide={handleClose} style={{backgroundColor: "rgba(0, 0, 0, 0)", height: '100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Прийом їжі</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Введіть текст для пошуку страви"
                                type="text"
                                value={dishName}
                                onChange={e => handleDishInputChange(e.target.value)}
                                className="dishInput"
                                style={{display: "inline-block", width: "85%"}}
                            />
                            <div>
                                {suggestions && suggestions.map((suggestion, i) =>
                                    <div
                                        className="dishSuggestion"
                                        style={{display: "block", marginLeft: "42px", width: "85%"}}
                                        key={i}
                                        onClick={() => onSuggestHandler(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                )}
                            </div>
                            <Form.Text className="text-muted">
                               На 100 г: (Ккал: {currentDish.calories}, Б:{currentDish.bilki}, Ж:{currentDish.fats}, В:{currentDish.vuhlevody} )
                            </Form.Text>
                        </InputGroup>
                        <Form.Group className="mb-3 dateAndMealRow">
                            <TimePicker className="dateAndMeal" onChange={onChange} value={value}/>
                            <Form.Select className="dateAndMeal">
                                <option value="1">Сніданок</option>
                                <option value="2">Обід</option>
                                <option value="3">Вечеря</option>
                                <option value="3">Перекус</option>
                            </Form.Select>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <Form.Label>Маса:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введіть значення"
                                inputMode="numeric"
                                onChange={handleGramsChange}
                                value={grams}
                                min={0}
                                max={2000}
                                maxLength={4}
                                aria-describedby="gramsDescr"
                            />
                            <InputGroup.Text id="gramsDescr">г</InputGroup.Text>

                        </InputGroup>
                        <Form.Text className="text-muted">
                            На {grams} г: (Ккал: {currentDish.calories/100*grams}, Б:{currentDish.bilki/100*grams}, Ж:{currentDish.fats/100*grams}, В:{currentDish.vuhlevody/100*grams} )
                        </Form.Text>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary" >
                         Додати
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RationComponent;