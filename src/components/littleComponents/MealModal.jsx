import React from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const MealModal = ({show,handleClose}) => {

    return (
        <div>
            <Modal show={show} onHide={handleClose} style={{backgroundColor: "rgba(0, 0, 0, 0)", height:'100%'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Прийом їжі</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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

export default MealModal;