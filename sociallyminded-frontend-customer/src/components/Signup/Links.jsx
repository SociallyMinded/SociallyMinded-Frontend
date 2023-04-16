import React from "react";
import { LOGIN_PAGE_LINK } from "../../routes/routes";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Links = () => {
    return (
        <>
            <LoginLink to={LOGIN_PAGE_LINK}>Log in</LoginLink>
            <LoginLink to={"/"}>Back to Home</LoginLink>
        </>
    )
}

const LoginLink = styled(Link)`
    text-decoration:none;
    margin-right:2vw;
    margin-left:2vw;
`