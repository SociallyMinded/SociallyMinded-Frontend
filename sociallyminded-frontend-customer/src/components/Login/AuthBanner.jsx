import React from "react";
import { Spinner, Alert } from "react-bootstrap";

export const AuthBanner = ({
        showPageLoadSpinner, 
        showErrorWarning, 
        handleShowErrorWarning, 
        serverError
    }) => {
    return (
        <>
            {showPageLoadSpinner && <Spinner animation="border" />}
            {
                showErrorWarning && 
                <Alert variant={"danger"} onClose={handleShowErrorWarning} dismissible>
                {serverError}
                </Alert>
            }
        </>
    )
}