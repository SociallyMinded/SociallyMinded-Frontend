import React from "react";
import styled from "styled-components";
import { Toast } from "react-bootstrap";

export const ProductSuccessToast = ({
    showSuccessToast,
    handleCloseSuccessToast,
    headerText,
    bodyText
}) => {
    return (
        <>
         {
            showSuccessToast && 
            <StyledToast onClose={handleCloseSuccessToast}>
                <Toast.Header>
                    <strong className="me-auto">{headerText}</strong>
                </Toast.Header>
                <Toast.Body>{bodyText}</Toast.Body>
            </StyledToast>
        }
        </>
    )
}

const StyledToast = styled(Toast)`
    height:100%;
    box-shadow: 0px 1px 5px rgba(248, 175, 175, 0.1) !important;
    background-color: rgba(219, 242, 206, 0.95);
`
