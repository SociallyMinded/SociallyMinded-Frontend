import React from "react";
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router";
import { useState } from "react";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { GENERIC_EMAIL_ERROR, USER_NOT_FOUND, WRONG_PASSWORD, GENERIC_LOGIN_ERROR } from "./loginConstants";
import { newCustomerRecord } from "./loginConstants";
import axios from "axios";
import { handleLoginViaGmail, ABSOLUTE_HOME_LINK } from "../../routes/routes";
import { LOGIN_SIGNUP_REDIRECT_LINK } from "../../routes/routes";

const useLoginHooks = () => {

    const { 
        user, createUser, 
        setCurrentUserDetail, logout, 
        signIn, signInWithGmailPopup, 
        sendPasswordResetEmailToUser
    } = UserAuth() 

    console.log(user)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const[serverError, setServerError] = useState("")

    const[showErrorWarning, setShowErrorWarning] = useState(false)
    const [showPageLoadSpinner, setShowPageLoadSpinner] = useState(false)

    const [showLogoutToast, setShowLogoutToast] = useState(true)
    const handleShowLogoutToast = () => setShowLogoutToast(true);
    const handleCloseLogoutToast = () => setShowLogoutToast(false);

    const [userSignedIn, setUserSignedIn] = useState(false)

    const handleShowErrorWarning = (event) => {
        setShowErrorWarning(!showErrorWarning)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginToAccount = async (event) => {
        setShowErrorWarning(false)
        event.preventDefault();
        try {
            setShowPageLoadSpinner(true)
            await signIn(email, password)
            .then((result) => {
                console.log(result)
                navigate(LOGIN_SIGNUP_REDIRECT_LINK)
            })
        } 
        
        catch (error) {
            setShowErrorWarning(true)
            if (error.code == "auth/wrong-password") {
                setServerError(WRONG_PASSWORD)
            } else if (error.code == "auth/invalid-email") {
                setServerError(GENERIC_EMAIL_ERROR)
            } else if (error.code == "auth/user-not-found") {
                setServerError(USER_NOT_FOUND)
            } else {
                setServerError(GENERIC_LOGIN_ERROR)
            }
        } 

        finally {
            setShowPageLoadSpinner(false)
            console.log("Done")
        }
    }

    const signInViaGoogle = async () => {
        try {
            await signInWithGmailPopup()
            .then((result) => {
                const user = result.user
                const newRecord = newCustomerRecord(user.displayName, user.email, user.uid)
                return axios.put(handleLoginViaGmail, newRecord)
            })
            .then((result) => {
                console.log(result)
                navigate(LOGIN_SIGNUP_REDIRECT_LINK)    
            })
        }
        catch (error) {
            setServerError(error.response.data.message)
            setShowErrorWarning(true)
        } 
        finally {
            console.log("Done")
        }
    }

    const signOutFromAccount = async () => {
        try {
            await logout()
            setShowLogoutToast(true)
            console.log('You are logged out')
        } catch (err) {
            console.log(err.message)
        }
    }

    const state = { 
        user,
        email,
        password, 
        serverError,
        showErrorWarning,
        showPageLoadSpinner,
        showLogoutToast,
        userSignedIn
    }

    const setState = { 
        handleEmailChange,
        handlePasswordChange, 
        handleShowErrorWarning, 
        loginToAccount,
        signInViaGoogle,
        signOutFromAccount,
        handleCloseLogoutToast,
        handleShowLogoutToast
    }

    return { state, setState }

}

export default useLoginHooks