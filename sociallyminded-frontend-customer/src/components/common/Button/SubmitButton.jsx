import React from "react";
import Button from 'react-bootstrap/Button';
import styled from "styled-components";

export const SubmitButton = (onClickEvent) => {
    return (
        <StyledSubmitButton variant="success" onClick={onClickEvent}>Submit</StyledSubmitButton>

    )

}

const StyledSubmitButton = styled(Button)`
    font-family: 'Josefin Sans', sans-serif;
    border-width:0px;
    color:#ffff;
`;

// const StyledSubmitButton = styled(Button)`
//     font-family: 'Josefin Sans', sans-serif;
//     background-color: #77BD72;
//     border-width:0px;
//     color:#ffff;
//     &:hover {
//         background-color: #82CD7C;
//       }

// `;
