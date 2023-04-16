import React from "react";
import { Spinner, Carousel } from "react-bootstrap";
import styled from "styled-components";

export const ProductImg = ({imageLink}) => {
    return (
        <>
            {imageLink == null && 
                <LoadingContainer>
                    <Spinner animation="grow" />
                    <SpinnerText>Loading</SpinnerText>
                </LoadingContainer>
            }
            {imageLink != null && 
                <Carousel variant="dark">
                {imageLink != null && imageLink.map((i) => (
                        <Carousel.Item key={`${i}`} >
                            <ProductListingImg 
                            src={`${i}`} 
                            alt="image"/>
                        </Carousel.Item>
                ))}
                </Carousel>
            }
        </>
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

const ProductListingImg = styled.img`
    width:25vw;
    height:50vh;
    max-height:50vh;
    border-radius:10px;
`