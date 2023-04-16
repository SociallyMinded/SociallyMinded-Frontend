import React from "react";
import { GooglePay } from "./GooglePay";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { ModalMap } from "./ModalMap";

export const ModalPageTwo = ({
    addressData,
    confirmOrder,
    closeConfirmOrderPage,
    productName,
    orderQty,
    price,
    addressText,
    showAddressNotFoundError,
    returnToPurchaseModalAfterConfirmModal,
    setConfirmOrder,
    setShowSuccessToast,
    createNewOrder,
}) => {

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
    });

    return (
        <>
        {
            addressData != null  && 
            <Modal show={confirmOrder} onHide={closeConfirmOrderPage} centered>
                
                <Modal.Header closeButton onClick={closeConfirmOrderPage}>
                    <Modal.Title>Confirm Order for {productName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={orderQty}
                            disabled
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                                type="number"
                                placeholder="1"
                                autoFocus
                                value={price * orderQty}
                                disabled
                            />                    
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address : {addressText}</Form.Label>
                        </Form.Group>
                    </Form>
                    <Form>       
                        {!showAddressNotFoundError && <ModalMap addressData={addressData}/>}
                    </Form>
                </Modal.Body>
    
                <Modal.Footer>
                    <StyledBackButton 
                        variant="primary" 
                        onClick={returnToPurchaseModalAfterConfirmModal}
                    >
                        Back
                    </StyledBackButton>
                    <GooglePay
                        setConfirmOrder={setConfirmOrder}
                        setShowSuccessToast={setShowSuccessToast}
                        createNewOrder={createNewOrder}
                    />
                </Modal.Footer>
            </Modal> 
        }
        </>
    )
}


const StyledBackButton = styled(Button)`
    margin-top:-3px;
    margin-right:1vw;
`
