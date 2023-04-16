import React from "react";
import styled from "styled-components";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductDescription = ({
    productName,
    category,
    price,
    description,
    socialenterpriseName,
    handleShowPurchaseModal,
    handleShowReviewsPage,
    state
}) => {
    return (
        <>
            <ProductListingDescriptionTitleContainer>
                <h1>{productName} </h1>
                <h5><StyledBadge> {category} </StyledBadge></h5>
            </ProductListingDescriptionTitleContainer>

            <h2>Price : ${price}</h2>

            <ProductListingDescriptionDetailContainer>
                <h4>Social Enterprise</h4>
                <p>{socialenterpriseName}</p>
            </ProductListingDescriptionDetailContainer>   

            <ProductListingDescriptionDetailContainer>
                <h4>About this item</h4>
                <p>{description}</p>    
            </ProductListingDescriptionDetailContainer>   

            <ProductListingPurchaseContainer>
                <StyledButton onClick={handleShowPurchaseModal}>Buy this product</StyledButton>
                <StyledButton variant="primary" onClick={handleShowReviewsPage}>
                    <StyledLink to="/product_review" state={ state }>View All Reviews</StyledLink>
                </StyledButton>
            </ProductListingPurchaseContainer>
        </>
    )
}


const StyledBadge = styled(Badge)`
    background-color: #b3a2de!important;
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