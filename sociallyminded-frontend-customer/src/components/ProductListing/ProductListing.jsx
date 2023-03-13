import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoggedInHeader from "../common/Header/Header";
import { PageTemplate } from "../common/styles";

import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Toast from 'react-bootstrap/Toast';
import { useLocation } from 'react-router-dom';


const ProductListing = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { state } = useLocation();
    

    return (
        <PageTemplate>
            <LoggedInHeader></LoggedInHeader>
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
                        <h1>{state.d.name}</h1>
                        <h1>${state.d.price}</h1>
                        <h4>Category : {state.d.category}</h4>
                        <h4>About this item</h4>
                        <p>{state.d.description}</p>                                
                    </ProductListingDescriptionContainer>
                    
                    <ProductListingPurchaseContainer>
                        <StyledButton>Buy this product</StyledButton>
                        <StyledButton variant="primary" onClick={handleShow}>
                            View all reviews
                        </StyledButton>
                        <StyledModal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <PageTemplate>
                                <Modal.Header closeButton>
                                    <Modal.Title>Reviews</Modal.Title>
                                </Modal.Header>
                                <StyledReviewBody>

                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                    <ReviewContainer>
                                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                                        <p>
                                            Username : pppp
                                            <br></br>
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                            Review 1 description
                                        </p>
                                    </ReviewContainer>
                                </StyledReviewBody>
                            </PageTemplate>
                        </StyledModal>
                    </ProductListingPurchaseContainer>
        
                </ProductListingDescriptionSection>

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
const ProductListingDescriptionContainer = styled.div`
    max-height:60vh;
    height:60vh;
    margin-right:5%;
    overflow:scroll;
    background-:red;
`

const ProductListingPurchaseContainer = styled.div`
    margin-top:5%;
    margin-bottom:0%;
`

const StyledButton = styled(Button)`
    margin-bottom:10%;
    margin-right:5%;
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

/*
<FloatingLabel
    controlId="floatingInput"
    label="Quantity"
    className="mb-3">
    <Form.Control type="number" placeholder="quantity" min="0"/>
</FloatingLabel>

<Spinner animation="border" role="status"></Spinner>


<Modal.Header closeButton>
    <Modal.Title>Write your review</Modal.Title>
</Modal.Header>

<Modal.Body>
    <FloatingLabel
        controlId="floatingTextarea"
        label="Review"
        className="mb-3"
    >
    <Form.Control as="textarea" placeholder="Leave a comment here" />
    </FloatingLabel>
    <FloatingLabel
        controlId="floatingInput"
        label="Rating"
        className="mb-3">
    <Form.Control type="number" placeholder="quantity" min="0" max="5"/>
    </FloatingLabel>
    
</Modal.Body>

<Modal.Footer>
    <Button variant="primary">Submit review</Button>
</Modal.Footer>

*/