import React from "react";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { SIGNUP_PAGE_LINK } from "../../routes/routes";

const Home = () => {
    return (
        <PageTemplate>
            <Header></Header>
            <HomePage>
                <HomePageDescription>
                    <HomePageTitle>SociallyMinded</HomePageTitle>
                    <HomePageSubtitle>Support your favourite social enterprises today!</HomePageSubtitle>
                    <HomePageLink to={SIGNUP_PAGE_LINK}>Get Started</HomePageLink>
                </HomePageDescription>
            <HomeImage src={require('./home-logo.png')}></HomeImage>
            </HomePage>
        </PageTemplate>

    )
}

const HomePage = styled.div`
    display:flex;
    flex-direction:row;
`

const HomePageTitle = styled.h1`
    font-size:3em;
`

const HomePageSubtitle = styled.h1`
    font-size:1.2em;
    margin-top:1em;
    margin-bottom:1.5em;
`

const HomePageDescription = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:15%;
    margin-left:10%;
`

const HomeImage = styled.img`
    width:45em;
    height:35em;
    margin-top:5%;
    margin-left:3%;
`

const HomePageLink = styled(Link)`
    text-decoration: none;
    background-image: linear-gradient(92.88deg, #455EB5 10.16%, #5643CC 42.89%, #673FD7 64.72%);
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
    padding: 0.5em;
    width:6.5em;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all .5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
        text-decoration: none;
        color:white;
        box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
        transition-duration: .1s;
    }
`

export default Home
