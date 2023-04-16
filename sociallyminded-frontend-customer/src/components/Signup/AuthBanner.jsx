import React from "react";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

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