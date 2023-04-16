import React from "react";
import { SIGNUP_PAGE_LINK, RESET_PASSWORD_LINK } from "../../routes/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Links = () => {
    return (
        <>
            <LinkContainer>
                <SignupPageLink to={SIGNUP_PAGE_LINK}>Sign Up</SignupPageLink>
                <HomeLink to={RESET_PASSWORD_LINK}>Reset Password</HomeLink>
            </LinkContainer>
            <HomeLinkTop to={"/"}>Back to Home</HomeLinkTop>
        </>
    )
}

const LinkContainer = styled.div`
    margin-top:3vh;
    margin-bottom:2vh;
`

const SignupPageLink = styled(Link)`
    text-decoration:none;
    margin-right:3vw;
`
const HomeLinkTop = styled(Link)`
    text-decoration:none;
    margin-bottom:1em;
`
const HomeLink = styled(Link)`
    margin-top:1.5em;
    text-decoration:none;
`