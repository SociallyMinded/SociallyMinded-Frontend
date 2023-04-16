import useSignupHooks from './signupHooks';
import styled from 'styled-components';
import { PageTemplate } from '../common/styles';
import SiteLogo from '../common/SiteLogo/SiteLogo';
import { SignupForm } from './SignupForm';
import React from 'react';
import { AuthBanner } from './AuthBanner';
import { Links } from './Links';

const Signup = () => {

    const { state, action } = useSignupHooks();
   
    return (
        <PageTemplate>
            <SiteLogo></SiteLogo>
            <SignupPageTemplate>

                <FormResultTemplate>
                    <AuthBanner 
                        showPageLoadSpinner={state.showPageLoadSpinner}
                        showErrorWarning={state.showErrorWarning}
                        handleShowErrorWarning={action.handleShowErrorWarning}
                        serverError={state.serverError}
                    />
                </FormResultTemplate>

                <SignupForm
                    username={state.username}
                    email={state.email}
                    password={state.password}
                    passwordError={state.passwordError}
                    handleFormSignup={action.handleFormSignup}
                    handleUsernameChange={action.handleUsernameChange}
                    handleEmailChange={action.handleEmailChange}
                    handlePasswordChange={action.handlePasswordChange}
                    signInViaGoogle={action.signInViaGoogle}
                />

                <LinkContainer>
                    <Links></Links>
                </LinkContainer>

            </SignupPageTemplate>
        </PageTemplate>
    )
}

const LinkContainer = styled.div`
    margin-top:3vh;
`

const FormResultTemplate = styled.div`
    height:13vh;
`

const SignupPageTemplate = styled.div`
    display: flex;
    margin-bottom:15%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

export default Signup;