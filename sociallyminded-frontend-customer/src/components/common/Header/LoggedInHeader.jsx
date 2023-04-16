import React from "react";
import SiteLogo from "../SiteLogo/SiteLogo";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { HOME_LINK, SHOP_LINK, PROFILE_PAGE_LINK } from "../../../routes/routes";
import useLoginHooks from "../../Login/loginHooks";

const LoggedInHeader = () => {

    const { state, action } = useLoginHooks()
    const d = { "userLoggedOut" : true}

    return (
        <HeaderLinkContainer>
            <SiteLogo></SiteLogo>
            <HeaderSiteLinks>
                <HeaderLink to={SHOP_LINK}>Shop</HeaderLink>
                <HeaderLink to={PROFILE_PAGE_LINK}>Profile</HeaderLink>
                <HeaderLink to={HOME_LINK} onClick={action.signOutFromAccount}  state={{ d }}>Log Out</HeaderLink>
            </HeaderSiteLinks>
        </HeaderLinkContainer>
    )
}

const HeaderLinkContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const HeaderSiteLinks = styled.div`
    justify-content:end;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    width:90%;
    margin-top:0.5em;
    margin-left:30%;
`
const HeaderLink = styled(Link)`
    margin-left:10%;
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

export default LoggedInHeader