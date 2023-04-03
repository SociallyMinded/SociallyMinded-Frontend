import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter>
            <p>SociallyMinded 2023</p>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
    width:100%;
    background-color:#d3e8e8;
    margin-top:5vh;
    height:6vh;
    padding-top:2.5vh;
`

export default Footer