import React from "react";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import useProfileHooks from "./profileHooks.js"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ModalDialog from "react-bootstrap";
import ModalHeader from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Actions } from "./profileHooks.js";

import { Pagination } from 'react-bootstrap';

import { Map, Marker } from "react-map-gl";
import PointMarker from "../PointMarker";

export const ProfilePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { user } = UserAuth()
    const { 
        data, loading, error,
        editOrderQty,
        editOrderAddress,
        handleOrderSelected,
        handleEditOrderAddress,
        orderSelected,
        geocodeAddress,

        updateEditedOrder,
        showEditOrderModal,
        handleShowEditOrderModal,
        handleCloseEditOrderModal,
        handleEditOrderQty,
        showEditSuccessToast,
        handleShowEditSuccessToast,
        handleCloseEditSuccessToast,
        showConfirmEditModalPage,
        closeConfirmEditOrderPage,
       
        cancelOrder,
        showCancelOrderModal,
        handleShowCancelOrderModal,
        handleCloseCancelOrderModal,
        showCancelSuccessToast,
        handleShowCancelSuccessToast,
        handleCloseCancelSuccessToast,

        payment,
        creditCardNos,
        creditCardCVV,
        creditCardExpiryDate,
        handleCreditCardNos,
        handleCreditCardCVV,
        handleCreditCardExiryDate,
        handlePayment,
        makePayment,
        showPaymentOrderModal,
        handleShowPaymentOrderModal,
        handleClosePaymentOrderModal,
        showPaymentSuccessToast,
        handleShowPaymentSuccessToast,
        handleClosePaymentSuccessToast,


        addressData,
        setShowConfirmEditOrderModal,
        returnToPurchaseModalAfterConfirmModal

    } = useProfileHooks(user)

    const [page, setPage] = useState(1)

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
      });

    console.log(data)
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            {showEditSuccessToast &&  
                <StyledToast onClose={handleCloseEditSuccessToast}>
                    <Toast.Header>
                        <strong className="me-auto">Order Updated</strong>
                    </Toast.Header>
                    <Toast.Body> {orderSelected.orderTitle} is updated!</Toast.Body>
                </StyledToast>
                }
            {showCancelSuccessToast &&  
                <StyledToast onClose={handleCloseCancelSuccessToast}>
                    <Toast.Header>
                        <strong className="me-auto">Order Cancelled</strong>
                    </Toast.Header>
                    <Toast.Body>{orderSelected.orderTitle} is cancelled!</Toast.Body>
                </StyledToast>
                }

                {showPaymentSuccessToast &&  
                <StyledToast onClose={handleClosePaymentSuccessToast}>
                    <Toast.Header>
                        <strong className="me-auto">Order Paid</strong>
                    </Toast.Header>
                    <Toast.Body>Payment is credited to {orderSelected.orderTitle}!</Toast.Body>
                </StyledToast>
                }


       
            <TableContainer>
        
            <StyledHeader>{user.displayName}'s Order Records</StyledHeader>
            <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={editOrderQty}
                            disabled
                        />
                        </Form.Group>
                       
                    </Form>

            {data != null && data.length == 0 && <h5>You have no orders currently</h5>}
 
            {data != null && data.length != 0 && <Table hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Order Title</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Order Date</th>
                    <th>Order Address</th>
                    <th>Status</th>
                    <th></th>
                    </tr>
                </thead>
                
       
                <tbody>
                {data != null && data.slice(0,10).map((d) => (
                    <tr>
                        <StyledTd>{d.orderRecordId}</StyledTd>
                        <StyledTd>{d.orderTitle}</StyledTd>
                        <StyledTd>{d.quantity}</StyledTd>
                        <StyledTd>{d.totalPrice}</StyledTd>
                        <StyledTd>{d.dateOfOrder != null && d.dateOfOrder.split("T")[0]}</StyledTd>
                        <StyledTd>{d.address}</StyledTd>
                        <StyledTd>{d.orderStatus}</StyledTd>
                        <StyledTd>
                            <StyledNavbar>
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        <NavDropdown title="More" id="basic-nav-dropdown" class="navbar-toggler-icon">
                                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2" onClick={() => handleOrderSelected(d, Actions.UPDATE)}>
                                            Update Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleOrderSelected(d, Actions.CANCEL)}>
                                            Cancel Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleOrderSelected(d, Actions.PAYMENT)}>
                                            Pay for Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">
                                            Submit a Review
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    </Navbar.Collapse>
                            </Container>
                        </StyledNavbar>
                        </StyledTd>
                    </tr>
                ))}
                                                           
                </tbody>
                </Table>}
                
                <Modal show={showEditOrderModal} centered>
                    <Modal.Header closeButton onClick={handleCloseEditOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={orderSelected != null && orderSelected.quantity}
                            autoFocus
                            value={editOrderQty}
                            onChange={(e) => handleEditOrderQty(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={orderSelected != null && orderSelected.address}
                            autoFocus
                            value={editOrderAddress}
                            onChange={(e) => handleEditOrderAddress(e.target.value)}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={geocodeAddress}>  
                        Confirm Update
                    </Button>
                    </Modal.Footer>
                </Modal> 

                {addressData != null  && <Modal show={showConfirmEditModalPage} onHide={closeConfirmEditOrderPage} centered>
                    <Modal.Header closeButton onClick={closeConfirmEditOrderPage}>
                    <Modal.Title>Confirm Edits : {orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={editOrderQty}
                            disabled
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                                type="number"
                                placeholder="1"
                                autoFocus
                                value={orderSelected != null && (orderSelected.totalPrice/orderSelected.quantity) * editOrderQty}
                                disabled
                            />                    
                        </Form.Group>
                    </Form>
                    <Form>
  
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address : {addressData.ADDRESS}</Form.Label>
                        </Form.Group>
                    </Form>
                    <Form>
                             
                    <Map
                        mapboxAccessToken={'pk.eyJ1Ijoib25neW9uZ2VuMjAwMCIsImEiOiJjbDZseXN2ejQwZ25pM2JxcTNwbGY2Mm01In0.6_e_3aUVc5M9RUMI9S2sfw'}
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        style={{width:"100%", height:"40vh"}}
                        latitude={addressData.LATITUDE}
                        longitude={addressData.LONGITUDE}
                    >
                        <PointMarker
                            longitude={addressData.LONGITUDE}
                            latitude={addressData.LATITUDE}
                        />
                    </Map>

                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={returnToPurchaseModalAfterConfirmModal}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={updateEditedOrder}>
                        Apply Updates
                    </Button>
                    </Modal.Footer>
                </Modal> 
                }


          
                <Modal show={showCancelOrderModal} centered>
                    <Modal.Header closeButton onClick={handleCloseCancelOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Are you sure you want to cancel this order?</Form.Label>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={cancelOrder}>  
                        Cancel Order
                    </Button>
                    </Modal.Footer>
                </Modal> 
                
                <Modal show={showPaymentOrderModal} centered>
                    <Modal.Header closeButton onClick={handleClosePaymentOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Credit Card Number"}
                            autoFocus
                            value={creditCardNos}
                            onChange={handleCreditCardNos}
                        />
                        <Form.Label>Credit Card CVV</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Credit Card CVV"}
                            autoFocus
                            value={creditCardCVV}
                            onChange={handleCreditCardCVV}
                        />
                        <Form.Label>Credit Card Expiry Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder={"Credit Card Expiry Date"}
                            autoFocus
                            value={creditCardExpiryDate}
                            onChange={handleCreditCardExiryDate}
                        />
                        <Form.Label>Payment</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={orderSelected != null && orderSelected.totalPrice}
                            autoFocus
                            value={payment}
                            onChange={handlePayment}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={makePayment}>  
                        Make Payment
                    </Button> 
                    </Modal.Footer>
                </Modal> 
{/*     
                {data != null && data.length != 0 && <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next />
                <Pagination.Last />
                </Pagination>} */}
                
            </TableContainer>
        </PageTemplate>
    )
}

const StyledNavbar = styled(Navbar)`
    width:50%;
    height:5vh;
`

const TableContainer = styled(Table)`
    margin-top:10vh;
    width:95%;
    margin-left:5%;
    height:100vh;
    max-height:100vh;
    overflow: scroll;
`


const StyledTable = styled(Table)`
    height:50vh;
    padding-top:0px!important;
`

const StyledHeader = styled.h3`
    margin-bottom:5vh;
`

const StyledThead = styled.thead`
`
const StyledTd = styled.td`
    vertical-align: middle;
    max-width:10vw;
`

const StyledToast = styled(Toast)`
    margin-left:75%;
    margin-top:2%;
    position:absolute;
    z-index:1;
    width:15vw;
    background-color:#DBE8D7;    
`