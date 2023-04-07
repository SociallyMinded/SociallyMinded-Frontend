import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PageTemplate, ReviewPageTemplate } from "../common/styles";

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

import InputGroup from 'react-bootstrap/InputGroup';
import { getProductsBySocialEnterprise } from "../../routes/routes";
import { useEffect } from "react";
import axios from "axios";

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
        addressText, handleAddressText, showAddressNotFoundError, handleCloseAddressNotFoundError, getOtherProducts,
        message, handleSetMessage
    } = useProductListingHooks(state)

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
      });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        event.preventDefault()
        setValidated(true)
    }


    const getAllRecommendedProducts = () => {
        const recommended = data.filter((d) => 
            d.socialenterprise.socialEnterpriseId == state.d.socialenterprise.socialEnterpriseId &&
            d.productId != state.d.productId
        )
        return recommended
    }

    const renderDisabledButton = () => {
        if (orderQty == "" || creditCardNos == "" || creditCardCVV == "" || unitNos == "" || postalCode == "") {
            return true
        } else {
            return false
        }
    }

    
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ProductListingPage>        
            <ProductListingImgSection>
                
            {state.d.imageLink == null && 
                <LoadingContainer>
                    <Spinner animation="grow" />
                    <SpinnerText>Loading</SpinnerText>
                </LoadingContainer>
            }
            {state.d.imageLink != null && <Carousel variant="dark">
                {state.d.imageLink != null && state.d.imageLink.map((i) => (
                        <Carousel.Item>
                            <ProductListingImg 
                            src={`${i}`} 
                            alt="image"/>
                        </Carousel.Item>
                ))}
            </Carousel>}
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
                {showAddressNotFoundError &&
                      <StyledLoginPromptToast onClose={handleCloseAddressNotFoundError}>
                      <Toast.Header>
                          <strong className="me-auto">Notice</strong>
                      </Toast.Header>
                      <Toast.Body>Your provided postal code does not exist. Please check if your postal code is correct</Toast.Body>
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
            <ProductRecommendationSectionContainer>
                    {data != null && getAllRecommendedProducts().length > 0 &&     
                        <ProductRecommendationTitle>other products from this social enterprise</ProductRecommendationTitle>
                    }
                    <ProductRecommendationSection>
                    {data != null && getAllRecommendedProducts().length > 0 && getAllRecommendedProducts().map((d) => (
                        <ProductRecommendationImgContainer>
                            <StyledProductLink id="styled-card-link" to={'/product_listing/'+ d.productId } state={{ d:d, allData: data }}>
                            {d.imageLink != null && <ProductRecommendationImg
                                src={`${d.imageLink[0]}`}
                                alt="First slide"
                            />}
                            <ProductRecommendationName>{d.name}</ProductRecommendationName>
                            </StyledProductLink>
                        </ProductRecommendationImgContainer>
                    ))}
                    </ProductRecommendationSection>
                    
                </ProductRecommendationSectionContainer>
            

                <Modal show={showPurchaseModal} onHide={handleClosePurchaseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{state.d.name}</Modal.Title>
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
                                <Form.Label>Credit Card Nos</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoFocus
                                    value={creditCardNos}
                                    onChange={handleCreditCardNos}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide your credit card nos
                                </Form.Control.Feedback>
                            </Form.Group>
                    

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Credit Card CVV</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoFocus
                                    value={creditCardCVV}
                                    onChange={handleCreditCardCVV}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide your credit card cvv
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
                             
                    {!showAddressNotFoundError && <Map
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
                    </Map>}

                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={returnToPurchaseModalAfterConfirmModal}>
                        Back
                    </Button>
                    <Button type="submit" variant="primary" onClick={createNewOrder}>
                        Place Order
                    </Button>
                    </Modal.Footer>
                </Modal> 
                }
            </ProductListingPage>
        </PageTemplate>
    )
}

const SpinnerText = styled.h5`
    margin-left:1vw;
    margin-top:1vh;
`

const LoadingContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:50vh;
`

const ProductRecommendationName = styled.p`
    width:80%;
`

const StyledProductLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: none;
        color: black;
    }
`
const ProductRecommendationTitle = styled.h4`
`

const ProductRecommendationSectionContainer = styled.div`
    padding-bottom:10vh;
    width:90vw;
    max-width:80vw;
    margin-top:1vh;
`

const ProductRecommendationSection = styled.div`
    display:flex;
    flex-direction:row;
    max-width:100%;
    margin-top:1vh;
    overflow:scroll;
`

const ProductRecommendationImgContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const ProductRecommendationImg = styled.img`
    width:20vw;
    height:30vh;
    border-radius:10px;
    margin-right:1vw;
    margin-top:2vh;
    margin-bottom:2vh;

    display: block;
    top: 0px;
    position: relative;
    border-radius: 4px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;


    &:hover {
        transition: all 0.2s ease-out;
        box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
        border-radius:20px;
    }

    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 32px;
        transform: scale(2);
        transform-origin: 50% 50%;
        transition: transform 0.15s ease-out;
    }

    &:hover:before {
        transform: scale(2.15);
    }
`

const ModalButtonContainer = styled.div`
    width:100%;
    margin-top:3vh;
    margin-bottom:1vh;
`

const ModalButton = styled(Button)`
`

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
    max-height:50vh;
    overflow:scroll;
    margin-right:5vw;
    display:flex;
    border-radius:10px;
`

const ProductListingImg = styled.img`
    width:25vw;
    height:50vh;
    max-height:50vh;
    border-radius:10px;
`

const ProductListingDescriptionSection = styled.div`
    display:flex;
    flex-direction:column;
    width:50vw;
    max-height:100%;
    overflow:scroll;
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
