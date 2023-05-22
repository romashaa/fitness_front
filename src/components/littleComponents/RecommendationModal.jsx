import React from 'react';
import {ListGroup, Modal} from "react-bootstrap";
import {FaInfo, FaRegTrashAlt, FaSyncAlt} from "react-icons/fa";

const RecommendationModal = ({show,onHide, recomList}) => {

    const breakfast = recomList.filter((dish) => dish.dishCategory === 'BREAKFAST');
    const mainCourse = recomList.filter((dish) => dish.dishCategory === 'MAIN_COURSE');
    const snack = recomList.filter((dish) => dish.dishCategory === 'SNACK');
    const soup = recomList.filter((dish) => dish.dishCategory === 'SOUP');
    const dessert = recomList.filter((dish) => dish.dishCategory === 'DESSERT');
    const salad = recomList.filter((dish) => dish.dishCategory === 'SALAD');

    const lunchMainCourse = mainCourse.slice(0, mainCourse.length / 2); // First half for lunch
    const dinnerMainCourse = mainCourse.slice(mainCourse.length / 2); // Second half for dinner

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Спробуйте таке меню</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li" variant="flush">
                            Сніданок
                            <div>
                                <ListGroup as="ul" variant="flush" className="menuListItem">
                                    {breakfast.map(dish=>(
                                        <ListGroup.Item as="li" key={dish.id}>
                                            {dish.dishName} <FaInfo style={{color:'darkgreen'}}/>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="flush">
                            Перекус
                            <div>
                                <ListGroup as="ul" variant="flush" className="menuListItem">
                                    {snack.map(dish=>(
                                        <ListGroup.Item as="li" key={dish.id}>
                                            {dish.dishName} <FaInfo style={{color:'darkgreen'}}/>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="flush">
                            Обід
                            <ListGroup as="ul" variant="flush" className="menuListItem">
                                {soup.map(dish=>(
                                    <ListGroup.Item as="li" key={dish.id}>
                                        {dish.dishName} <FaInfo style={{color:'darkgreen'}}/>
                                    </ListGroup.Item>
                                ))}
                                {lunchMainCourse.map(dish=>(
                                    <ListGroup.Item as="li" key={dish.id}>
                                        {dish.dishName} <FaInfo style={{color:'darkgreen'}}/>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="flush" >
                            Вечеря
                            <ListGroup as="ul" variant="flush" className="menuListItem">
                                {dinnerMainCourse.map(dish=>(
                                    <ListGroup.Item as="li" key={dish.id}>
                                        {dish.dishName} <FaInfo style={{color:'darkgreen'}}/>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <FaSyncAlt/>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RecommendationModal;