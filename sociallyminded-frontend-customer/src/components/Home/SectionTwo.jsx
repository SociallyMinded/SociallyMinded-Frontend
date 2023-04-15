import React from "react";
import styled from "styled-components";
import { WIDE_VARIETY_IMG, SUSTAINABLE_IMG, LOCAL_ENTERPRISE_IMG } from "./imgRoutes";

export const SectionTwo = () => {
    return (
        <>
            <h3>Why SociallyMinded?</h3>
            <OfferingContainer>
                <OfferingSection>
                    <CardImg src={require(`${WIDE_VARIETY_IMG}`)}></CardImg> 
                    <h6>Wide variety of selection</h6>
                </OfferingSection>
                <OfferingSection>
                    <CardImg src={require(`${SUSTAINABLE_IMG}`)}></CardImg> 
                    <h6>Sustainably produced products</h6>
                </OfferingSection>
                <OfferingSection>
                    <CardImg src={require(`${LOCAL_ENTERPRISE_IMG}`)}></CardImg> 
                    <h6>Support local social enterprises</h6>
                </OfferingSection>
            </OfferingContainer>
        </>
    )
}

const OfferingContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const OfferingSection = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:center;
`

const CardImg = styled.img`
    width:50%;
    height:80%;
    margin-bottom:3vh;

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