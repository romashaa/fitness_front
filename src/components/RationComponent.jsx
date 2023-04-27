import React, {useContext, useEffect, useState, useSyncExternalStore} from 'react';
import Button from 'react-bootstrap/Button';
import {Col, Container, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import TimePicker from "react-time-picker";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const RationComponent = () => {
    const [show, setShow] = useState(false);
    const [time, setTime] = useState('10:00');
    const [grams, setGrams] = useState('')
    const [mealType, setMealType] = useState("BREAKFAST")
    const [dishOptions, setDishOptions] = useState([])
    const [dishName, setDishName] = useState("")
    const [currentDish, setCurrentDish] = useState({})
    const [suggestions, setSuggestions] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [breakfastList, setBreakfastList] = useState([])
    const [dinnerList, setDinnerList] = useState([])
    const [supperList, setSupperList] = useState([])
    const [snackList, setSnackList] = useState([])

    const currentUser = localStorage.getItem('currentUser')
    const handleGramsChange = (event) => {
        const inputValue = event.target.value.slice(0, 4); // limit input to 4 characters
        setGrams(inputValue);
    }
    const handleSelectTypeChange = (event) => {
        setMealType(event.target.value); // update mealType state when selection changes
    }
    const pickDate = (date) => {
        const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        setSelectedDate(newDate)
        console.log(newDate)
    }
    const addMeal = () => {
        const mealData = {
            mealType:mealType,
            date:selectedDate,
            time:time,
            grams:grams,
            dishName:dishName
        };
        fetch(`/api/auth/meals/addMeal/${currentUser}`,{
            headers:{
                "Content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify(mealData)
        })
            .then((response) => {
                console.log('New meal added');
            })
            .catch(error => {
            console.error('Error adding new meal:', error);
            // Handle the error
        });
        setShow(false)
    }
    useEffect(() => {
        const loadDishes = async () => {
            const response = await axios.get("/dishes/all");
            setDishOptions(response.data)
        }
        loadDishes();
    }, [])


    useEffect(()=>{
        fetch(`/api/auth/meals/mealsOfType/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}&type=BREAKFAST`)
            .then(response => response.json())
            .then(data => setBreakfastList(data));
        fetch(`/api/auth/meals/mealsOfType/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}&type=DINNER`)
            .then(response => response.json())
            .then(data => setDinnerList(data));
        fetch(`/api/auth/meals/mealsOfType/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}&type=SUPPER`)
            .then(response => response.json())
            .then(data => setSupperList(data));
        fetch(`/api/auth/meals/mealsOfType/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}&type=SNACK`)
            .then(response => response.json())
            .then(data => setSnackList(data));
    }, [selectedDate, show])

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
      //  console.log(matches)
        setSuggestions(matches)
        setDishName(dishName)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="rationPage">
            <div className="rationHeader">
                <h1>Мої прийоми їжі</h1>
            </div>
            <div className="panel-container">
                <div className="left-panel">
                    <h2>Додати прийом їжі<FaPlus className="menuItemBtn" onClick={handleShow}/></h2>
                    <div className="col-md-7 col-sm-8 m-auto menuList">
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" variant="flush">
                                Сніданок
                                <div>
                                    <ListGroup as="ul" variant="flush" className="menuListItem">
                                        {breakfastList.map(meal=>(
                                            <ListGroup.Item as="li" key={meal.dish.id}>
                                                {meal.dish.dishName}, {meal.grams}г
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" variant="flush">
                                Обід
                                <div>
                                    <ListGroup as="ul" variant="flush" className="menuListItem">
                                        {dinnerList.map(meal=>(
                                            <ListGroup.Item as="li" key={meal.dish.id}>
                                                {meal.dish.dishName}, {meal.grams}г
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" variant="flush">
                                Вечеря
                                <div>
                                    <ListGroup as="ul" variant="flush" className="menuListItem">
                                        {supperList.map(meal=>(
                                            <ListGroup.Item as="li" key={meal.dish.id}>
                                                {meal.dish.dishName}, {meal.grams}г
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" variant="flush">
                                Перекус
                                <div>
                                    <ListGroup as="ul" variant="flush" className="menuListItem">
                                        {snackList.map(meal=>(
                                            <ListGroup.Item as="li" key={meal.dish.id}>
                                                {meal.dish.dishName}, {meal.grams}г
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
                <div className="right-panel">
                    <Calendar onChange={pickDate} value={selectedDate}/>
                </div>
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
                            <TimePicker className="dateAndMeal" onChange={setTime} value={time}/>
                            <Form.Select className="dateAndMeal" value={mealType} onChange={handleSelectTypeChange}>
                                <option value="BREAKFAST">Сніданок</option>
                                <option value="DINNER">Обід</option>
                                <option value="SUPPER">Вечеря</option>
                                <option value="SNACK">Перекус</option>
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
                        Закрити
                    </Button>
                    <Button variant="primary" onClick={addMeal}>
                         Додати
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RationComponent;