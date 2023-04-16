import React from "react";
import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";

export const ModalPageOne = ({
    showPurchaseModal,
    handleClosePurchaseModal,
    productName,
    validated,
    handleSubmit,
    orderQty,
    handleOrderQty,
    unitNos,
    handleUnitNos,
    postalCode,
    handlePostalCode,
    message,
    handleSetMessage,
    renderDisabledButton,
    geocodeAddress
}) => {
    return (
        <Modal show={showPurchaseModal} onHide={handleClosePurchaseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{productName}</Modal.Title>
            </Modal.Header>
                    
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            autoFocus
                            value={orderQty}
                            onChange={handleOrderQty}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide your order quantity
                        </Form.Control.Feedback>
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Unit Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            autoFocus
                            value={unitNos}
                            onChange={handleUnitNos}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide your unit number
                        </Form.Control.Feedback>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Postal Code </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            autoFocus
                            value={postalCode}
                            onChange={handlePostalCode}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide your postal code
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Message to social enterprise </Form.Label>
                        <Form.Control
                            as="textarea"
                            autoFocus
                            value={message}
                            onChange={handleSetMessage}
                        />
                    </Form.Group>

                    <ModalButtonContainer>
                        {renderDisabledButton() == true && <ModalButton disabled type="submit" variant="primary" onClick={geocodeAddress}>
                            Confirm Order
                        </ModalButton>}
                        {renderDisabledButton() == false && <ModalButton type="submit" variant="primary" onClick={geocodeAddress}>
                            Confirm Order
                        </ModalButton>}
                    </ModalButtonContainer>
                </Form>
            </Modal.Body>
        </Modal> 
    )
}

const ModalButtonContainer = styled.div`
    width:100%;
    margin-top:3vh;
    margin-bottom:1vh;
`

const ModalButton = styled(Button)`
`
