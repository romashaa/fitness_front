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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import Select from 'react-select';

const RationComponent = () => {
    const [open, setOpen] = React.useState(true);
    const [show, setShow] = useState(false);
    const [value, onChange] = useState('10:00');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDishes, setSearchDishes] = useState([]);


    useEffect(() => {
        axios.get(`/dishes/search?term=`).then(response => {
            setSearchDishes(response.data);
        });
    }, []);

    // const handleSearchInputChange = async (event) => {
    //     const term = event.target.value;
    //     setSearchTerm(term);
    //     if (term.length >= 1) {
    //         const response = await axios.get(`/dishes/search?term=`);
    //         const searchDishes = response.data;
    //         setSearchDishes(searchDishes);
    //     }
    //     console.log("1")
    //     console.log(searchDishes)
    // };

    function print(){
        console.log(searchDishes)
    }

    const handleSearchTermClick = (term) => {
        setSearchTerm(term);
        // Perform the search using the selected search term
    };
    const handleInput = (event) => {
        setSearchTerm(event.target.value);
    };
    function addBreakfast(){

    }
    function addSnack(){

    }
    function addDinner(){

    }
    function addSupper(){

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="col-md-5 col-sm-8 m-auto menuList">
                <ListGroup as="ul">
                    <ListGroup.Item as="li" variant="flush">
                        Сніданок<FaPlus className="menuItemBtn" onClick={handleShow} />
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
                    <ListGroup.Item as="li" variant="flush">Обід <FaPlus className="menuItemBtn" onClick={addDinner}/></ListGroup.Item>
                    <ListGroup.Item as="li" variant="flush">Вечеря <FaPlus className="menuItemBtn" onClick={addSupper}/></ListGroup.Item>
                    <ListGroup.Item as="li" variant="flush">Перекус <FaPlus className="menuItemBtn" onClick={addSnack}/></ListGroup.Item>
                </ListGroup>
            </div>

            <Modal show={show} onHide={handleClose} style={{backgroundColor: "rgba(0, 0, 0, 0)", height:'100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Прийом їжі</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            {/*{searchDishes.length > 0 && (*/}
                                <Select
                                    placeholder="Введіть текст для пошуку страви"
                                    value={searchTerm}
                                    onChange={print}
                                    options={searchDishes}
                                    isSearchable
                                >
                                    {/*{searchDishes.map((term) => (*/}
                                    {/*    <option key={term} onClick={() => handleSearchTermClick(term)}>*/}
                                    {/*        {term}*/}
                                    {/*    </option>*/}
                                    {/*))}*/}
                                </Select>
                            {/*)}*/}
                        </InputGroup>
                        <Form.Group className="mb-3 dateAndMealRow">
                            <TimePicker className="dateAndMeal" onChange={onChange} value={value} />
                            <Form.Select  className="dateAndMeal">
                                <option value="1">Сніданок</option>
                                <option value="2">Обід</option>
                                <option value="3">Вечеря</option>
                                <option value="3">Перекус</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Маса:</Form.Label>
                            <Form.Control placeholder="Введіть значення"/>
                        </Form.Group>

                        {/*<Form.Group>*/}

                        {/*</Form.Group>*/}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RationComponent;