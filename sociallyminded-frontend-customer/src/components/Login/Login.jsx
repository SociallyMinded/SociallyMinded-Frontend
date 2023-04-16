import React from "react";
import { PageTemplate } from "../common/styles";
import useLoginHooks from "./loginHooks";
import SiteLogo from '../common/SiteLogo/SiteLogo';
import styled from "styled-components";
import { AuthBanner } from "./AuthBanner";
import { Links } from "./Links";
import { LoginForm } from "./LoginForm";

const Login = () => {

    const { state, action } = useLoginHooks()

    return (
        <PageTemplate>
            <SiteLogo></SiteLogo>
            <ResetPasswordPageTemplate>

                <FormResultTemplate>
                    <AuthBanner 
                        showPageLoadSpinner={state.showPageLoadSpinner}
                        showErrorWarning={state.showErrorWarning}
                        handleShowErrorWarning={action.handleShowErrorWarning}
                        serverError={state.serverError}
                    />
                </FormResultTemplate>

                <LoginForm
                    email={state.email}
                    password={state.password}
                    loginToAccount={action.loginToAccount}
                    handleEmailChange={action.handleEmailChange}
                    handlePasswordChange={action.handlePasswordChange}
                    signInViaGoogle={action.signInViaGoogle}
                />
                <Links/>
            </ResetPasswordPageTemplate>
        </PageTemplate>
    )
}

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

export default Login