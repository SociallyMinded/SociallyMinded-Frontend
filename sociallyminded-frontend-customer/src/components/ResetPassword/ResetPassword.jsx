import React from "react";
import SiteLogo from "../common/SiteLogo/SiteLogo";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import useResetPasswordHooks from "./resetPasswordHooks";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { HOME_LINK, LOGIN_PAGE_LINK, SIGNUP_PAGE_LINK } from "../../routes/routes";

const ResetPassword = () => {
    const {state, setState} = useResetPasswordHooks();
    return (
        <PageTemplate>
            <SiteLogo></SiteLogo>
            <ResetPasswordPageTemplate>
            <FormResultTemplate>
                {state.showPageLoadSpinner && <Spinner animation="border" />}
                {
                    state.showErrorWarning && 
                    <Alert variant={"danger"} onClose={setState.handleShowErrorWarning} dismissible>
                    {state.serverError}
                    </Alert>
                }
                {
                    state.showEmailSentNotification &&
                    <Alert variant={"success"} onClose={setState.handleShowEmailSentNotification} dismissible>
                    Email is sent! 
                    </Alert>
                }
            </FormResultTemplate>
             
            <h1>Reset Password</h1>

            <Form onSubmit={setState.sendPasswordResetEmail}>
                <FormInputContainer>
                    <FormDescription>
                        An email will be sent to the email address you have provided.
                        Follow the instructions in the email to reset your password.
                    </FormDescription>
                    <FormLabel>Account Email</FormLabel>
                    <FormInput 
                        required 
                        type="text" 
                        value={state.email} 
                        onChange={setState.handleEmailChange}
                    />
                </FormInputContainer>
                {
                    state.email.length == 0 &&                 
                    <FormButton disabled type="submit" variant="primary">Reset Password</FormButton>
                }
                {
                    state.email.length != 0 &&                 
                    <FormButton type="submit" variant="primary">Reset Password</FormButton>
                }
            </Form>
            <LoginPageLink to={LOGIN_PAGE_LINK}>Back to Log in Page</LoginPageLink>
        </ResetPasswordPageTemplate>
        </PageTemplate>
    )

}


const FormResultTemplate = styled.div`
    height:13vh;
`

const ResetPasswordPageTemplate = styled.div`
    display: flex;
    margin-bottom:15%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width:30%;
`
const FormInputContainer = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:10px;
    border-width:0px;
    margin-top: 7%;
    margin-bottom:5%;
`

const FormLabel = styled.label`
    font-size:0.9em;
`

const FormInput = styled.input`
    border-radius:5px;
    padding: 0.5em;
    outline:none;
    outline:none;
    box-shadow:none;
    border:1px solid #c9c9c9;
`

const FormDescription = styled.p`
    margin-top:3%;
    margin-bottom:7%;
`

const FormButton = styled(Button)`
    margin-top:5%;    
`

const LoginPageLink = styled(Link)`
    margin-top:1.5em;
    text-decoration:none;
`

export default ResetPassword