import React from "react";
import SiteLogo from "../SiteLogo/SiteLogo";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { LOGIN_PAGE_LINK, SIGNUP_PAGE_LINK } from "../../../routes/routes";

const Header = () => {
    return (
        <HeaderLinkContainer>
            <SiteLogo></SiteLogo>
            <HeaderSiteLinks>
                <HeaderLink>Shop</HeaderLink>
                <HeaderLink>Volunteering</HeaderLink>
                <HeaderLink to={LOGIN_PAGE_LINK}>Log in</HeaderLink>
                <HeaderLink to={SIGNUP_PAGE_LINK}>Sign up</HeaderLink>
            </HeaderSiteLinks>
        </HeaderLinkContainer>
    )
}

const HeaderLinkContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const HeaderSiteLinks = styled.div`
    display:flex;
    flex-direction:row;
    margin-left:50%;
    margin-top:0.5em;
    width:100%;
`
const HeaderLink = styled(Link)`
    margin-right:10%;
    font-size:1.1em;
    text-decoration:none;
    color: black;
    position: relative;

    &:hover {
        color:#9f7ad7;
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 4px;
        background-color: #8351cf;
        bottom: 0;
        left: 0;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
    }


    &:hover::before {
        transform-origin: left;
        transform: scaleX(1);
    }

`

export default Header