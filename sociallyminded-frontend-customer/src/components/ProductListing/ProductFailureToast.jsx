import React from "react";
import styled from "styled-components";
import { Toast } from "react-bootstrap";

export const ProductFailureToast = ({
    showFailureToast,
    handleCloseFailureToast,
    headerText,
    bodyText
}) => {
    return (
        <>
        {
            showFailureToast && 
            <StyledFailureToast onClose={handleCloseFailureToast}>
                <Toast.Header>
                    <strong className="me-auto">{headerText}</strong>
                </Toast.Header>
                <Toast.Body>{bodyText}</Toast.Body>
            </StyledFailureToast>
        }
        </>
    )
}

const StyledFailureToast = styled(Toast)`
    position:relative;
    z-index:2;
    height:100%;
    width:100%;
    margin-right:5%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color:rgba(255, 204, 204, 0.95);
`