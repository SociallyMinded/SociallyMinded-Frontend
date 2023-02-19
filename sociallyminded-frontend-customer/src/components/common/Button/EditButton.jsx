import React from "react";
import Button from 'react-bootstrap/Button';
import styled from "styled-components";

export const EditButton = (onClickEvent) => {
    return (
        <StyledEditButton variant="primary" onClick={onClickEvent}>Make Edits</StyledEditButton>

    )

}

const StyledEditButton = styled(Button)`
    font-family: 'Josefin Sans', sans-serif;
    padding: 0.3em;
`;
