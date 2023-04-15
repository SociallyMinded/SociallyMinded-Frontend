import React from "react";
import styled from "styled-components";

export const SectionFour = ({clickaction, image, comment}) => {
    return (
        <>
            <h3>Hear what our customers say</h3>
            <CommentSection>
                <CommentImg src={require(`${image}`)}></CommentImg> 
                <StyledMessage onClick={clickaction}>{comment}</StyledMessage>
            </CommentSection>
        </>

    )
}

const CommentSection = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:5vh;
    align-items: center;
    justify-content:center;
`

const CommentImg = styled.img`
    width:13%;
    height:13%;
`

const StyledMessage = styled.div`
    margin-left:3vw;
    position: relative;
    background: #FBFBFB;
    border-radius: .4em;
    padding:1em;
    width:30%;
    max-width:30%;
    border:1px solid #dbdbdb;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        border-right-color: #dbdbdb;
        border-left: 0;
        border-bottom: 0;
        margin-top: -4.5px;
        margin-left: -9px;
    }
    
    &:hover {
        transition: all 0.2s ease-out;
        box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
        top: -4px;
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