import React from 'react';
import { PageTemplate, ReviewPageTemplate } from '../common/styles';
import Header from '../common/Header/Header';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router';
import useProductReviewHooks from './productReviewHooks';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllReviewsByProductIdUrl } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import LoggedInHeader from '../common/Header/LoggedInHeader';

export const ProductReviewPage = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    
    const { user } = UserAuth()
    
    const {         
        data, displayData, loading, error, generateRandomNum
    } = useProductReviewHooks(state)

    return (
        <ReviewPageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <ReviewHeaderContainer>
                <Title>Reviews</Title>
                <ReviewImg
                    src={require('./review-bg.png')}
                    alt="Second slide"
                />
            </ReviewHeaderContainer>
            <ReviewDetailsContainer>
                <StyledLink onClick={() => navigate(-1)}>Back</StyledLink>
                <h1>{state.d.name}</h1>
                <StyledReviewBody>
                {data != null && data.length == 0 && <h5>There are no reviews yet</h5>}
                {data != null && data.map((d) => (
                    <ReviewContainer>
                    <AvatarImg src={require(`./avatar/${d.avatar}.png`)}></AvatarImg>
                    <ReviewDescription>
                       {d.reviewDescription}
                    </ReviewDescription>
                    </ReviewContainer>

                ))}
            </StyledReviewBody>
            </ReviewDetailsContainer>  
        </ReviewPageTemplate>
    )

}

const ReviewHeaderContainer = styled.div`
    position: relative;
    margin-left:7vw;
    margin-right:7vw;
`

const Title = styled.h1`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1;
    font-size:4.5em;
    font-weight:semi-bold;
`

const ReviewImg = styled.img`
    width:100%;
    height:30vh;
    border-radius:10px;
    margin-top:7vh;
    opacity:0.8;
    z-index:0;
`

const ReviewDetailsContainer = styled.div`
    position: relative;
    margin-left:7vw;
    margin-right:7vw;
    margin-top:4vh;
`


const StyledLink = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    font-size: 1.1em;
    margin-bottom:2vh;
    &:hover {
        color:blue;
    }
`



const ReviewContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:5vh;
    align-items:center;
    justify-content:center;
`

const AvatarImg = styled.img`
    width:6vw;
    height:12vh;
    margin-right:2vw;
`

const StyledReviewBody = styled(Modal.Body)`
    margin-top:5vh;
`

const ReviewDescription = styled.div`
    position: relative;
    background: #FBFBFB;
    border-radius: .4em;
    padding:1em;
    width:100%;
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


