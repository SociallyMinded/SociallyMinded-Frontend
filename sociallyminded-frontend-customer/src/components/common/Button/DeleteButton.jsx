import React from "react";
import Button from 'react-bootstrap/Button';
import styled from "styled-components";

export const DeleteButton = (onClickEvent) => {
    return (
        <StyledDeleteButton variant="danger" onClick={onClickEvent}>Delete</StyledDeleteButton>

    )
}

const StyledDeleteButton = styled(Button)`
    font-family: 'Josefin Sans', sans-serif;
    border-width:0px;
`;

// const StyledCancelButton = styled(Button)`
//     font-family: 'Josefin Sans', sans-serif;
//     background-color: #EA8174;
//     border-width:0px;
//     color:#ffff;
//     &:hover {
//         background-color: #EC8D81;
//         color: #ffff;
//       }

// `;
