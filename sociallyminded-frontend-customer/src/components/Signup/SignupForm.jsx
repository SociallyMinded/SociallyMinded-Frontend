import React from "react";
import PasswordStrengthBar from 'react-password-strength-bar';
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const SignupForm = ({
    username,
    email,
    password,
    passwordError,
    handleFormSignup,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    signInViaGoogle
}) => {
    return (
        <>
            <h1>Sign up</h1>
            <Form onSubmit={handleFormSignup}>
                <FormInputContainer>
                    <FormLabel>Username</FormLabel>
                    <FormInput 
                        required 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange}
                    />
                </FormInputContainer> 
                <FormInputContainer>
                    <FormLabel>Email</FormLabel>
                    <FormInput 
                        required 
                        type="text"
                        value={email} 
                        onChange={handleEmailChange}
                    />
                </FormInputContainer> 
                <FormInputContainer>
                    <FormLabel>Password</FormLabel>
                    <FormInput 
                        required 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange}
                    />
                    <ErrorText>{passwordError}</ErrorText>
                    <PasswordStrengthBar password={password} />
                </FormInputContainer> 

                {
                    email.length != 0 &&
                    username.length != 0 &&
                    password.length >= 6 &&
                    <FormButton type="submit" variant="primary">Sign Up</FormButton>
                } 
                {
                    (email.length == 0 ||
                    password.length < 6  ||
                    username.length == 0) &&
                    <FormButton disabled type="submit" variant="primary">Sign Up</FormButton>
                }
                <FormButton variant="outline-secondary" onClick={signInViaGoogle}>
                    <LogoImage src={require('./img/google.png')}></LogoImage>
                    Continue with google
                </FormButton>
            </Form>
        </>
    )
}

const ErrorText = styled.p`
    color:red;
    font-size:0.9em;
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
    margin-top: 2%;
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

const LogoImage = styled.img`
    width:1.2em;
    height:1.2em;
    margin-right:0.5em;
`