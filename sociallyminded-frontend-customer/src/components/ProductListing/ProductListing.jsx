import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PageTemplate } from "../common/styles";

import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import useProductListingHooks from "./productListingHooks";
import { UserAuth } from "../../context/AuthContext";
import useLoginHooks from "../Login/loginHooks";
import Header from "../common/Header/Header";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Map from 'react-map-gl';

import PointMarker from "../Map/PointMarker"
import BaseMap from "../Map/BaseMap"

import Alert from 'react-bootstrap/Alert';

const ProductListing = () => {
    const { state } = useLocation();
    const { user } = UserAuth()

    const [showPopup, setShowPopup] = useState(true);

    const {         
        data, displayData, loading, error, createNewOrder, 
        handleShowPurchaseModal, handleShowReviewsPage, handleClosePurchaseModal, showPurchaseModal,
        showSuccessToast, handleShowSuccessToast, handleCloseSuccessToast, orderQty, handleOrderQty,
        postalCode, handlePostalCode, creditCardCVV, handleCreditCardCVV, creditCardNos, handleCreditCardNos,
        showLoginPromptToast, handleShowLoginPromptToast, handleCloseLoginPromptToast, geocodeAddress,
        confirmOrder, showConfirmOrderPage,
        addressData, returnToPurchaseModalAfterConfirmModal, closeConfirmOrderPage, unitNos, handleUnitNos,
        addressText, handleAddressText
    } = useProductListingHooks(state)

    console.log(addressData)

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
      });
    
      
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ProductListingPage>        
            <ProductListingImgSection>
                
                <Carousel>

                    {state.d.imageLink != null && state.d.imageLink.map((i) => (
                         <Carousel.Item>
                             <ProductListingImg 
                             src={`${i}`} 
                             alt="image"/>
                         </Carousel.Item>
                        //    {d.reviewImages.map((base64, index) => (
                        //     <ReviewImgByUser key={index} src={base64} alt={`Review Image ${index }`} onClick={() => handleEnlarged(base64)}/>
                        // ))}

                    ))}

                    {/* <Carousel.Item>
                        <ProductListingImg
                        src={require('./donut.png')}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <ProductListingImg
                        src={require('./donut.png')}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <ProductListingImg
                        src={require('./donut.png')}
                        alt="Third slide"
                        />
                    </Carousel.Item> */}
                </Carousel>
            </ProductListingImgSection>

            
            <ProductListingDescriptionSection>
     
            <ProductListingToastSection>
                {showSuccessToast && 
                    <StyledToast onClose={handleCloseSuccessToast}>
                        <Toast.Header>
                            <strong className="me-auto">Order Placed</strong>
                        </Toast.Header>
                        <Toast.Body>Your order for {state.d.name} is placed!</Toast.Body>
                    </StyledToast>
                }
                {showLoginPromptToast && 
                    <StyledLoginPromptToast onClose={handleCloseLoginPromptToast}>
                        <Toast.Header>
                            <strong className="me-auto">Notice</strong>
                        </Toast.Header>
                        <Toast.Body>Please log in to your account to place an order</Toast.Body>
                    </StyledLoginPromptToast>
                }
            </ProductListingToastSection>

                <ProductListingDescriptionContainer>
                    <ProductListingDescriptionTitleContainer>
                        <h1>{state.d.name} </h1>
                        <h5><StyledBadge> {state.d.category} </StyledBadge></h5>
                    </ProductListingDescriptionTitleContainer>
                    <h2>Price : ${state.d.price}</h2>
                    <ProductListingDescriptionDetailContainer>
                        <h4>Social Enterprise</h4>
                        <p>{state.d.socialenterprise.enterpriseName}</p>
                    </ProductListingDescriptionDetailContainer>   
                    <ProductListingDescriptionDetailContainer>
                        <h4>About this item</h4>
                        <p>{state.d.description}</p>    
                    </ProductListingDescriptionDetailContainer>   
                        <ProductListingPurchaseContainer>
                        <StyledButton onClick={handleShowPurchaseModal}>Buy this product</StyledButton>
                        <StyledButton variant="primary" onClick={handleShowReviewsPage}>
                            <StyledLink to="/product_review" state={ state }>View All Reviews</StyledLink>
                        </StyledButton>
                    </ProductListingPurchaseContainer>
                </ProductListingDescriptionContainer>

                
                
            </ProductListingDescriptionSection>

      



                <Modal show={showPurchaseModal} onHide={handleClosePurchaseModal} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>{state.d.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={orderQty}
                            onChange={handleOrderQty}
                        />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Credit Card Nos</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={creditCardNos}
                            onChange={handleCreditCardNos}
                        />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Credit Card CVV</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={creditCardCVV}
                            onChange={handleCreditCardCVV}
                        />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Unit Number</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={unitNos}
                            onChange={handleUnitNos}
                        />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Postal Code </Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={postalCode}
                            onChange={handlePostalCode}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={geocodeAddress}>
                        Confirm Order
                    </Button>
                    </Modal.Footer>
                </Modal> 

                {addressData != null  && <Modal show={confirmOrder} onHide={closeConfirmOrderPage} centered>
                    <Modal.Header closeButton onClick={closeConfirmOrderPage}>
                    <Modal.Title>Confirm Order for {state.d.name}</Modal.Title>
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
                                value={state.d.price * orderQty}
                                disabled
                            />                    
                        </Form.Group>
                    </Form>
                    <Form>
  
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address : {addressText}</Form.Label>
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
                    <Button variant="primary" onClick={createNewOrder}>
                        Place Order
                    </Button>
                    </Modal.Footer>
                </Modal> 
                }


            </ProductListingPage>
        </PageTemplate>
    )
}

const StyledBadge = styled(Badge)`
    background-color: #b3a2de!important;

`

const ProductListingPage = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    width:90vw;
    height:70vh;
    margin-top:5vh;
    padding-top:8vh;
    padding-left:5vw;
`

const ProductListingImgSection = styled.div`
    width:25vw;
    height:50vh;
    margin-right:5vw;
`

const ProductListingImg = styled.img`
    width:25vw;
    height:50vh;
    border-radius:10px;
`

const ProductListingDescriptionSection = styled.div`
    display:flex;
    flex-direction:column;
    width:50vw;
    height:50vh;
    position:1;
    display:absolute;
`

const ProductListingDescriptionContainer = styled.div`
    height:70vh;
    max-height:70vh;
`

const ProductListingDescriptionTitleContainer = styled.div`
    margin-bottom:3vh;
`
const ProductListingDescriptionDetailContainer = styled.div`
    margin-top:3vh;
`

const ProductListingPurchaseContainer = styled.div`
    width:100%;
`


const ProductListingToastSection = styled.div`
    position:absolute;
    z-index:1;
    width:53%;
    padding-left:38%;
    top:17%;
`

const StyledToast = styled(Toast)`
    height:100%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color: rgba(219, 242, 206, 0.95);
`

const StyledLoginPromptToast = styled(Toast)`
    position:relative;
    z-index:2;
    height:100%;
    width:100%;
    margin-right:5%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color:rgba(255, 204, 204, 0.95);
`

const StyledButton = styled(Button)`
    margin-bottom:10%;
    margin-right:5%;
`

const StyledLink = styled(Link)`
    text-decoration:none;
    color:white;
    &:hover {
        color:white;
    }
`


export default ProductListing
