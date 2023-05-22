import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Form, Modal} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import TimePicker from "react-time-picker";
import Button from "react-bootstrap/Button";
import {Context} from "../../index";

const SportModal = ({show,onHide, selectedDate, onActivityAdded, fetchActivities}) => {
    const {currentUserStore} = useContext(Context)

    const [sportOptions, setSportOptions] = useState([])
    const [sportName, setSportName] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [time, setTime] = useState('');
    const [currentSport, setCurrentSport] = useState({})
    const [durability, setDurability] = useState('');
    const currentUser = localStorage.getItem('currentUser')
    const currentUserWeight = currentUserStore.currentUser.weight

    useEffect(() => {
        const loadActivities = async () => {
            const response = await axios.get("api/auth/sport/all");
            setSportOptions(response.data)
        }
        loadActivities();
    }, [])



    const handleDurabilityChange = (event) => {
        setDurability(event.target.value);
    }


    const handleSportInputChange = (sportName) => {
       // console.log(sportOptions)
        let matches = []
        if (sportName.length > 0) {
            const sportnames = sportOptions.map(sport => sport.name)
            matches = sportnames.filter(sportname => {
                const regex = new RegExp(`${sportName}`, "gi");
                return sportname.match(regex)
            })
        }
        //  console.log(matches)
        setSuggestions(matches)
        setSportName(sportName)
    }

    const onSuggestHandler = (text) => {
        setSportName(text);
        setSuggestions([]);
        setCurrentSport(sportOptions.find(sport=> sport.name===text))
    }

    const addSport = async () => {
        const sportData = {
            date:selectedDate,
            time:time,
            duration:durability,
            sportName:sportName
        };
        const response = await fetch(`/api/auth/sport/addActivity/${currentUser}`,{
            headers:{
                "Content-type":"application/json"
            },
            method:"post",
            body:JSON.stringify(sportData)
        });
        if(response.ok){
            setSportName("")
            setTime("")
            setDurability("")
            const updatedActivitiesResponse = await fetchActivities();
            onActivityAdded(updatedActivitiesResponse);
            onHide()
        }
    }


    return (
        <div>
            <Modal show={show} onHide={onHide} style={{backgroundColor: "rgba(0, 0, 0, 0)", height: '100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Активності</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Введіть текст для пошуку активності"
                                type="text"
                                value={sportName}
                                onChange={e => handleSportInputChange(e.target.value)}
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
                        </InputGroup>
                        <Form.Group className="mb-3 dateAndMealRow">
                            <TimePicker className="dateAndMeal" onChange={setTime} value={time}/>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <Form.Label style={{marginRight:'10px'}}>Тривалість:</Form.Label>
                            <Form.Control
                                type="number"
                                id="durability"
                                name="durability"
                                value={durability}
                                onChange={handleDurabilityChange}
                                step="30"
                                min="30"
                                aria-describedby="sportDescr"
                            />
                            <InputGroup.Text id="sportDescr">хв</InputGroup.Text>

                        </InputGroup>
                        <Form.Text className="text-muted">
                            На {durability} хв: (Ккал: {Math.round(currentSport.calories*(durability/30)*currentUserWeight)} )
                        </Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Закрити
                    </Button>
                    <Button variant="primary" onClick={addSport}>
                        Додати
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SportModal;