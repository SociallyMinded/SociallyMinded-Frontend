import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HOME_LINK } from "../../../routes/routes";

const SiteLogo = () => {
    return (
        <SiteLogoStyled>
            <SiteLogoDescription to={HOME_LINK}>SociallyMinded</SiteLogoDescription>
        </SiteLogoStyled>
    )
}

const SiteLogoStyled = styled.div`
    display:flex;
    flex-direction:row;
`
const SiteLogoDescription = styled(Link)`
    font-size:1.5em;
    text-decoration:none;
    color:#8351cf;
    &:hover {
        color: #9f7ad7;
    }
`

export default SiteLogo