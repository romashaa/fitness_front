import React, {useContext, useEffect, useState, useSyncExternalStore} from 'react';
import Button from 'react-bootstrap/Button';
import {Col, Container, Form, ListGroup, Modal, Row, Tab, Tabs} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import MealModal from "./littleComponents/MealModal";
import SportModal from "./littleComponents/SportModal";
import UserContext from "../context/UserContext";

const RationComponent = () => {
    const [mealModalShow, setMealModalShow] = useState(false)
    const [sportModalShow, setSportModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mealList, setMealList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [dayNorm, setDayNorm] = useState("")
    const [totalGrams, setTotalGrams] = useState("")
    const [eaten, setEaten] = useState("")
    const [spent, setSpent] = useState("")
    const [left, setLeft] = useState(0)
 //   const {currentUser, setCurrentUser} = useContext(UserContext)
    const currentUser = localStorage.getItem('currentUser')
    const pickDate = (date) => {
        const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        setSelectedDate(newDate)
        console.log(newDate)
        console.log("user:"+ currentUser)
    }

    useEffect(() => {
        fetchActivities()
            .then((activities) => setActivityList(activities))
            .catch((error) => console.error(error));
    }, [selectedDate])
    useEffect(() => {
        fetchMeals()
            .then((meals) => setMealList(meals))
            .catch((error) => console.error(error));
    }, [selectedDate])

    useEffect( () => {
        axios.get(`/api/auth/info/dayNorm/${currentUser}`)
            .then((response) => setDayNorm(response.data))
    }, [])

    useEffect( () => {
         axios.get(`/api/auth/info/dayReceived/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}`)
             .then((response) => setEaten(response.data))
    }, [selectedDate, mealList])
    useEffect(()=>{
        setLeft(dayNorm-eaten)
    }, [eaten])
    // useEffect(async () => {
    //     await axios.get(`/api/auth/info/dayReceived/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}\``)
    // }, [selectedDate])

    const fetchActivities = async () => {
        const response = await fetch(`/api/auth/sport/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}`);
        const activities = await response.json();
        return activities;
    };
    const fetchMeals = async () => {
        const response = await fetch(`/api/auth/meals/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}`);
        const meals = await response.json();
        return meals;
    };
    const handleActivityAdded = () => {
        fetchActivities()
            .then((activities) => setActivityList(activities))
            .catch((error) => console.error(error));
    }
    const handleMealAdded = () => {
        fetchMeals()
            .then((meals) => setMealList(meals))
            .catch((error) => console.error(error));
    }

    const handleMealClose = () => setMealModalShow(false);
    const handleMealShow = () => setMealModalShow(true);
    const handleSportClose = () => setSportModalShow(false);
    const handleSportShow = () => setSportModalShow(true);


    return (
        <div className="rationPage">
            <div className="infoRow">
                <div className="Column">Вага:</div>
                <div className="Column">Норма: {dayNorm} ккал</div>
                <div className="Column">Отримано: {eaten} ккал</div>
                <div className="Column">Витрачено: {spent} ккал</div>
                <div className="Column">Залишилось: {left} ккал</div>
            </div>

            <div className="panel-container">
                <div className="left-panel">
                    <Tabs
                        defaultActiveKey="ration"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="ration" title="Мій раціон">
                            <h2>Додати прийом їжі<FaPlus className="menuItemBtn" onClick={handleMealShow}/></h2>
                            <div className="col-md-7 col-sm-8 m-auto menuList">
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" variant="flush">
                                        Сніданок
                                        <div>
                                            <ListGroup as="ul" variant="flush" className="menuListItem">
                                                {(mealList.filter((meal) => meal.mealType === "BREAKFAST")).map(meal=>(
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
                                                {(mealList.filter((meal) => meal.mealType === "DINNER")).map(meal=>(
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
                                                {(mealList.filter((meal) => meal.mealType === "SUPPER")).map(meal=>(
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
                                                {(mealList.filter((meal) => meal.mealType === "SNACK")).map(meal=>(
                                                    <ListGroup.Item as="li" key={meal.dish.id}>
                                                        {meal.dish.dishName}, {meal.grams}г
                                                    </ListGroup.Item>
                                                ))}

                                            </ListGroup>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Tab>
                        <Tab eventKey="physicalActivities" title="Мої фізичні навантаження">
                            <h2>Додати навантаження<FaPlus className="menuItemBtn" onClick={handleSportShow}/></h2>

                            <ListGroup className="col-md-7 col-sm-8 m-auto menuList">
                                {activityList.map(activity=>(
                                    <ListGroup.Item as="li" key={activity.sport.id}>
                                        {activity.sport.name}, {activity.duration} хв
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </div>

                <div className="right-panel">
                    <Calendar onChange={pickDate} value={selectedDate}/>
                </div>
            </div>
            <SportModal onActivityAdded={handleActivityAdded} fetchActivities={fetchActivities} show = {sportModalShow} onHide={handleSportClose} selectedDate={selectedDate}/>
            <MealModal onMealAdded={handleMealAdded} fetchMeals={fetchMeals}  show = {mealModalShow} onHide={handleMealClose} selectedDate={selectedDate}/>
        </div>
    );
};

export default RationComponent;