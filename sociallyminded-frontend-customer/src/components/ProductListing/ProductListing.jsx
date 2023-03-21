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

const ProductListing = () => {
    const { state } = useLocation();
    const { user } = UserAuth()

    const {         
        data, displayData, loading, error, generateRandomNum, createNewOrder,
        handleShowPurchaseModal, handleShowReviewsPage, handleClosePurchaseModal, showPurchaseModal,
        showSuccessToast, handleShowSuccessToast, handleCloseSuccessToast, orderQty, handleOrderQty,
        showLoginPromptToast, handleShowLoginPromptToast, handleCloseLoginPromptToast
    } = useProductListingHooks(state)

    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ProductListingPage>

                <ProductListingImgSection>

                    <Carousel>
                        <Carousel.Item>
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
                        </Carousel.Item>
                    </Carousel>
                </ProductListingImgSection>
                        
                <ProductListingDescriptionSection>
                    <ProductListingDescriptionContainer>
                        <ProductListingDescriptionTitleContainer>
                            <h1>{state.d.name} </h1>
                            <h5><Badge bg="secondary"> {state.d.category} </Badge></h5>
                        </ProductListingDescriptionTitleContainer>
                        <h2>Price : ${state.d.price}</h2>
                        <ProductListingDescriptionDetailContainer>
                            <h4>About this item</h4>
                            <p>{state.d.description}</p>    
                        </ProductListingDescriptionDetailContainer>                            
                    </ProductListingDescriptionContainer>
                    
                    <ProductListingPurchaseContainer>
                        <StyledButton onClick={handleShowPurchaseModal}>Buy this product</StyledButton>
                        <StyledButton variant="primary" onClick={handleShowReviewsPage}>
                            <StyledLink to="/product_review" state={ state }>View All Reviews</StyledLink>
                        </StyledButton>
                    </ProductListingPurchaseContainer>
                </ProductListingDescriptionSection>

                <ProductListingToastSection>
                    <div>
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
                    </div>    
                </ProductListingToastSection>

       

         
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
                            placeholder="1"
                            autoFocus
                            value={orderQty}
                            onChange={handleOrderQty}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={createNewOrder}>
                        Place Order
                    </Button>
                    </Modal.Footer>
                </Modal> 
                
            </ProductListingPage>
        
        </PageTemplate>
    )
}

const ProductListingPage = styled.div`
    display:flex;
    flex-direction:row;
`

const ProductListingImgSection = styled.div`
    width:30vw;
    height:70vh;
    margin-top:5%;
`

const ProductListingImg = styled.img`
    width:30vw;
    height:70vh;
    border-radius:10px;
`

const ProductListingDescriptionSection = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:5%;
    margin-left:5%;
    width:60vw;
    max-width:60vw;
    overflow:scroll;
`

const ProductListingToastSection = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:5%;
    margin-left:5%;
    width:60vw;
    max-width:60vw;
    overflow:scroll;
`

const ProductListingDescriptionContainer = styled.div`
    max-height:65vh;
    height:65vh;
    margin-right:5%;
    overflow:scroll;
    width:100%;
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

const StyledToast = styled(Toast)`
    height:100%;
    width:80%;
    margin-right:5%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color:#DBE8D7;
`

const StyledLoginPromptToast = styled(Toast)`
    height:100%;
    width:80%;
    margin-right:5%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color:#EDD2D2;
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

const AvatarImg = styled.img`
    width:3em;
    height:4em;
    margin-right:5%;
`

const StyledReviewBody = styled(Modal.Body)`
    max-height:70vh;
    overflow: scroll;
`

const ReviewContainer = styled.div`
    display:flex;
    flex-direction:row;
    max-height:6em;
    overflow:scroll;
    margin-bottom:10%;
`

const StyledModal = styled(Modal)`
    margin-top:5%;
`


export default ProductListing
