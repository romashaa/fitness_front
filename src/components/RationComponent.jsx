import React, {useContext, useEffect, useState, useSyncExternalStore} from 'react';
import Button from 'react-bootstrap/Button';
import {Col, Container, Form, ListGroup, Modal, OverlayTrigger, Popover, Row, Tab, Tabs} from "react-bootstrap";
import {FaCross, FaPlus, FaRegTrashAlt, FaSearch, FaUtensils} from "react-icons/fa";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import MealModal from "./littleComponents/MealModal";
import SportModal from "./littleComponents/SportModal";
import {inject, observer} from "mobx-react";
import userStore from "../store/UserStore";
import {Context} from "../index";
import {PieChart} from "react-minimal-pie-chart";
import RecommendationModal from "./littleComponents/RecommendationModal";

const RationComponent = observer(() => {
    const {currentUserStore} = useContext(Context)

    const [mealModalShow, setMealModalShow] = useState(false)
    const [sportModalShow, setSportModalShow] = useState(false);
    const [recomModalShow, setRecomModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mealList, setMealList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [recommendationsList, setRecommendationsList] = useState([])
    const [dayNorm, setDayNorm] = useState("")
    const [totalGrams, setTotalGrams] = useState(0)
    const [eaten, setEaten] = useState("")
    const [spent, setSpent] = useState("")
    const [left, setLeft] = useState(0)
    const [fats, setFats]= useState(0)

    const currentUser = currentUserStore.currentUser.email
    const pickDate = (date) => {
        const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        setSelectedDate(newDate)
        console.log('weight: '+ currentUserStore.currentUser.weight)
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

    useEffect( () => {
        axios.get(`/api/auth/info/dayTotalGrams/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}`)
            .then((response) => setTotalGrams(response.data))
    }, [selectedDate, mealList])

    useEffect(()=>{
        setLeft(dayNorm-eaten)
    }, [eaten])

    useEffect( () => {
         axios.get(`/api/auth/info/daySpent/${currentUser}?date=${(selectedDate.toISOString()).slice(0, 10)}`)
            .then((response) => setSpent(response.data))
    }, [activityList])

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
    const fetchRecommendations = () => {
      axios.get(`/api/auth/meals/recommendation/${currentUser}`)
          .then(r => setRecommendationsList(r.data))
    }

    const handleMealClose = () => setMealModalShow(false);
    const handleMealShow = () => setMealModalShow(true);
    const handleSportClose = () => setSportModalShow(false);
    const handleSportShow = () => setSportModalShow(true);
    const handleRecomClose = () => setRecomModalShow(false);
    const handleRecomShow = () => {
        setRecomModalShow(true);
        fetchRecommendations();
    }





    const data = [
        { title: 'Білки', value: 30, color: '#E38627' },
        { title: 'Жири', value: 30, color: '#C13C37' },
        { title: 'Вуглеводи', value: 40, color: '#6A2135' },
    ];

    const totalValue = data.reduce((total, entry) => total + entry.value, 0);


    function handleMealDelete(id) {
        axios.delete(`/api/auth/meals/deleteMeal/${currentUser}?mealId=${id}`)
            .then(response => {
                handleMealAdded()
                console.log('Item deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    }

    return (
        <div className="rationPage">
            <div className="infoRow">
                <div className="Column">Вага: {totalGrams} г</div>
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
                            <h2>Додати прийом їжі
                                <FaPlus className="menuItemBtn" onClick={handleMealShow}/>
                                <Button onClick={handleRecomShow} className="popBtn" variant='success'>Підібрати раціон</Button>
                            </h2>
                            <div className="col-md-7 col-sm-8 m-auto menuList">
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" variant="flush">
                                        Сніданок
                                        <div>
                                            <ListGroup as="ul" variant="flush" className="menuListItem">
                                                {(mealList.filter((meal) => meal.mealType === "BREAKFAST")).map(meal=>(
                                                    <ListGroup.Item as="li" key={meal.id}>
                                                        {meal.dish.dishName}, {meal.grams}г
                                                        <FaRegTrashAlt onClick={()=>handleMealDelete(meal.id)} style={{marginLeft:'15px', cursor:'pointer'}}/>
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
                                                    <ListGroup.Item as="li" key={meal.id}>
                                                        {meal.dish.dishName}, {meal.grams}г
                                                        <FaRegTrashAlt onClick={()=>handleMealDelete(meal.id)} style={{marginLeft:'15px', cursor:'pointer'}}/>
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
                                                    <ListGroup.Item as="li" key={meal.id}>
                                                        {meal.dish.dishName}, {meal.grams}г
                                                        <FaRegTrashAlt onClick={()=>handleMealDelete(meal.id)} style={{marginLeft:'15px', cursor:'pointer'}}/>
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
                                                    <ListGroup.Item as="li" key={meal.id}>
                                                        {meal.dish.dishName}, {meal.grams}г
                                                        <FaRegTrashAlt onClick={()=>handleMealDelete(meal.id)} style={{marginLeft:'15px', cursor:'pointer'}}/>
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
                                    <ListGroup.Item as="li" key={activity.id}>
                                        {activity.sport.name}, {activity.duration} хв
                                        <FaRegTrashAlt style={{marginLeft:'15px', cursor:'pointer'}}/>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </div>

                <div className="right-panel">
                    <Calendar onChange={pickDate} value={selectedDate} style={{height:'100px'}}/>

                    <PieChart
                        style={{height:'200px', marginTop:'5px'}}
                        data={data}
                        label={({ dataEntry }) => dataEntry.title + `\n`+ `${Math.round((dataEntry.value / ( data.reduce((total, entry) => total + entry.value, 0))) * 100)}%`} // Provide label based on the dataEntry.title
                        labelStyle={{
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                            fill: '#ffffff',
                        }}
                    />
                </div>
            </div>
            <SportModal onActivityAdded={handleActivityAdded} fetchActivities={fetchActivities} show = {sportModalShow} onHide={handleSportClose} selectedDate={selectedDate}/>
            <RecommendationModal show={recomModalShow} onHide={handleRecomClose} recomList={recommendationsList}/>
            <MealModal onMealAdded={handleMealAdded} fetchMeals={fetchMeals}  show = {mealModalShow} onHide={handleMealClose} selectedDate={selectedDate}/>
        </div>
    );
});

export default RationComponent;
//export default inject('userStore')(observer(RationComponent));
