import React from "react";
import SiteLogo from "../common/SiteLogo/SiteLogo";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    return (
        <PageTemplate>
            <SiteLogo></SiteLogo>
            <ResetPasswordPageTemplate>
             <h1>Reset Password</h1>
            <Form>
                <FormInputContainer>
                    <FormDescription>
                        An email will be sent to the email address you have provided.
                        Follow the instructions in the email to reset your password.
                    </FormDescription>
                    <FormLabel>Account Email</FormLabel>
                    <FormInput 
                        required 
                        type="text" 
                        // value={state.username} 
                        // onChange={setState.handleUsernameChange}
                    />
                </FormInputContainer>
                <FormButton type="submit" variant="primary">Sign Up</FormButton>
            </Form>
        </ResetPasswordPageTemplate>
        </PageTemplate>
    )

}


const ResetPasswordPageTemplate = styled.div`
    display: flex;
    margin-top:5%;
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

const LogoImage = styled.img`
    width:1.2em;
    height:1.2em;
    margin-right:0.5em;
`

const HomeLink = styled(Link)`
    margin-top:1.5em;
    text-decoration:none;
`


export default ResetPassword