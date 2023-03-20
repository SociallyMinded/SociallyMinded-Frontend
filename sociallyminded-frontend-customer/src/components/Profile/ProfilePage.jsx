import React from "react";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";

export const ProfilePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  
    return (
        <PageTemplate>
            <Header></Header>
            <h3>Order Records</h3>
            <Table hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Confirm Order Received</th>
                    <th>Cancel Order</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td><Button>Confirm</Button></td>
                    <td><Button>Cancel</Button></td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    
                    <td>
                    <>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                    </>
                    </td>
                    <td>
                    
                <Button variant="primary" onClick={handleShow}>
                   Cancel
                </Button>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Confirm
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

  
                        
                        </td>
                        
                    </tr>
                </tbody>
                </Table>
        </PageTemplate>
    )
}

