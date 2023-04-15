import React from "react";
import styled from "styled-components";
import { SHOP_PRODUCTS_IMG } from "./imgRoutes";

export const SectionThree = () => {
    return (
        <>
            <CardTitle>
                <h3>Shop products on our platform</h3>
            </CardTitle>
            <CardSection>
                <ShoppingImg src={require(`${SHOP_PRODUCTS_IMG}`)}/>
                <ProductListingDescSection>
                        Shop from over 100 different products created locally
                        by our home grown Singaporean social enterprises. Here,
                        you can find anything ranging from clothes, to food, to 
                        clay crafts. 
                        <ParagraphBreak></ParagraphBreak>
                        Enjoy a fuss free and seamless online shopping experience 
                        while contributing towards sustainable social and environmental 
                        causes! 
                </ProductListingDescSection>
            </CardSection>
        </>
    )
}

const ParagraphBreak = styled.div`
    height:3vh;
`

const CardTitle = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
`

const CardSection = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`
const ProductListingDescSection = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:30vw;
    height:50vh;
    margin-top:7vh;
    margin-left:3vw;
    border-radius:10px;
`

const ShoppingImg = styled.img`
    position:relative;
    z-index:1;
    width:30em;
    height:30em;

    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-top: 5px;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }   
    }
`