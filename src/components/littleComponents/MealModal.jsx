import React, {useEffect, useState} from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import TimePicker from "react-time-picker";
import axios from "axios";

const MealModal = ({show,onHide, selectedDate, onMealAdded, fetchMeals}) => {
    const [dishOptions, setDishOptions] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [time, setTime] = useState('10:00');
    const [grams, setGrams] = useState('')
    const [mealType, setMealType] = useState("BREAKFAST")
    const [dishName, setDishName] = useState("")
    const [currentDish, setCurrentDish] = useState({})
    const currentUser = localStorage.getItem('currentUser')


    useEffect(() => {
        const loadDishes = async () => {
            const response = await axios.get("/dishes/all");
            setDishOptions(response.data)
        }
        loadDishes();
    }, [])

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
    const handleGramsChange = (event) => {
        const inputValue = event.target.value.slice(0, 4); // limit input to 4 characters
        setGrams(inputValue);
    }
    const handleSelectTypeChange = (event) => {
        setMealType(event.target.value); // update mealType state when selection changes
    }
    const onSuggestHandler = (text) => {
        setDishName(text);
        setSuggestions([]);
        setCurrentDish(dishOptions.find(dish=> dish.dishName===text))
    }
    const addMeal = async () => {
        const mealData = {
            mealType:mealType,
            date:selectedDate,
            time:time,
            grams:grams,
            dishName:dishName
        };
        const response = await fetch(`/api/auth/meals/addMeal/${currentUser}`,{
            headers:{
                "Content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify(mealData)
        });
        if(response.ok){
            setTime("")
            setDishName("")
            setGrams("")
            const updatedMealsResponse = await fetchMeals();
            onMealAdded(updatedMealsResponse);
            onHide()
        }
        onHide()
    }
    return (
        <div>
            <Modal show={show} onHide={onHide} style={{backgroundColor: "rgba(0, 0, 0, 0)", height: '100%'}}>
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
                            На {grams} г: (Ккал: {Math.round(currentDish.calories/100*grams)}, Б:{Math.round(currentDish.bilki/100*grams)}, Ж:{Math.round(currentDish.fats/100*grams)}, В:{Math.round(currentDish.vuhlevody/100*grams)} )
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

export default MealModal;