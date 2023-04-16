import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Recommendations = ({
    data,
    getAllRecommendedProducts,
}) => {
    return (
        <>
            {
                data != null && 
                getAllRecommendedProducts().length > 0 &&     
                <ProductRecommendationTitle>other products from this social enterprise</ProductRecommendationTitle>
            }

            <ProductRecommendationSection>
                {
                    data != null && 
                    getAllRecommendedProducts().length > 0 && 
                    getAllRecommendedProducts().map((d) => (
                        <ProductRecommendationImgContainer key={`${d.productId}`} >
                            <StyledProductLink 
                                id="styled-card-link" 
                                to={'/product_listing/'+ d.productId } 
                                state={{ d:d, allData: data }}
                            >
                                {
                                    d.imageLink != null && 
                                    <ProductRecommendationImg
                                        src={`${d.imageLink[0]}`}
                                        alt="First slide"
                                    />
                                }
                                <ProductRecommendationName>{d.name}</ProductRecommendationName>
                            </StyledProductLink>
                        </ProductRecommendationImgContainer>
                    ))
                }
            </ProductRecommendationSection>
        </>
    )
}

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
