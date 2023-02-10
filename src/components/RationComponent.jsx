import React, {useState} from 'react';
import Counter from "./counter/Counter";
import Calendar from "react-calendar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import breakfast from '../img/breakfast.jpg'
import dinner from '../img/dinner.jpg'
import snack from '../img/snack.jpg'
import supper from '../img/supper.jpg'
import {Col, Container, Row} from "react-bootstrap";

const RationComponent = () => {
    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={breakfast} />
                            <Card.Body>
                                <Card.Title>Сніданок</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Додати прийом їжі</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={snack} />
                            <Card.Body>
                                <Card.Title>Перекус</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Додати прийом їжі</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={dinner} />
                            <Card.Body>
                                <Card.Title>Обід</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Додати прийом їжі</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={supper} />
                            <Card.Body>
                                <Card.Title>Вечеря</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Додати прийом їжі</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default RationComponent;