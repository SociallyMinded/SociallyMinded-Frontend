import React from "react";
import Header from "../common/Header/Header";
import { PageTemplate } from "../common/styles";
import useLoginHooks from "./loginHooks";

import Button from 'react-bootstrap/Button';
import SiteLogo from '../common/SiteLogo/SiteLogo';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { SIGNUP_PAGE_LINK } from "../../routes/routes";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { RESET_PASSWORD_LINK } from "../../routes/routes";

const Login = () => {

    const {state, setState} = useLoginHooks()

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
        </FormResultTemplate>
        <h1>Log in</h1>

        <Form onSubmit={setState.loginToAccount}>
            <FormInputContainer>
                <FormLabel>Email</FormLabel>
                <FormInput 
                    required 
                    type="text" 
                    value={state.email} 
                    onChange={setState.handleEmailChange}
                />
            </FormInputContainer>

            <FormInputContainer>
                <FormLabel>Password</FormLabel>
                <FormInput 
                    required 
                    type="password" 
                    value={state.password} 
                    onChange={setState.handlePasswordChange}
                />
            </FormInputContainer>
            {
                (state.email.length == 0 ||
                state.password.length == 0) &&                 
                <FormButton disabled type="submit" variant="primary">Log in</FormButton>
            }
            {
                state.email.length != 0 && 
                state.password.length != 0 &&               
                <FormButton type="submit" variant="primary">Log in</FormButton>
            }
            <FormButton variant="outline-secondary" onClick={setState.signInViaGoogle}>
                <LogoImage src={require('./google.png')}></LogoImage>
                Continue with google
            </FormButton>
        </Form>
        <LinkContainer>
            <SignupPageLink to={SIGNUP_PAGE_LINK}>Sign Up</SignupPageLink>
            <HomeLink to={RESET_PASSWORD_LINK}>Reset Password</HomeLink>
        </LinkContainer>
        <HomeLinkTop to={"/"}>Back to Home</HomeLinkTop>

    </ResetPasswordPageTemplate>
    </PageTemplate>
    )
}

const LinkContainer = styled.div`
    margin-top:3vh;
    margin-bottom:2vh;
`

const FormResultTemplate = styled.div`
    height:10vh;
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
    margin-top: 5%;
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


const FormButton = styled(Button)`
    margin-top:5%;    
`

const SignupPageLink = styled(Link)`
    text-decoration:none;
    margin-right:3vw;
`
const HomeLinkTop = styled(Link)`
    text-decoration:none;
    margin-bottom:1em;

`
const LogoImage = styled.img`
    width:1.2em;
    height:1.2em;
    margin-right:0.5em;
`
const HomeLink = styled(Link)`
    margin-top:1.5em;
    text-decoration:none;
`

export default Login