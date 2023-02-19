import React from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter>
            <p>Footer</p>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    font-family: 'Josefin Sans', sans-serif;
    background-color:pink;
    padding: 1em;
`

export default Footer