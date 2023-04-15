import React from "react";
import { Toast } from "react-bootstrap";
import styled from "styled-components";

export const WhiteToast = ({onCloseAction, headerText, bodyText}) => {
    return (
        <StyledToast onClose={onCloseAction}>
            <Toast.Header>
                <strong className="me-auto">{headerText}</strong>
            </Toast.Header>
            <Toast.Body>{bodyText}</Toast.Body>
        </StyledToast>                    
    )
}

const StyledToast = styled(Toast)`
    position:absolute;
    z-index:2;
    margin-left:73%;
    width:15%;
    margin-top:3%;
`