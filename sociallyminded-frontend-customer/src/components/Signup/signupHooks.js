import axios from "axios";
import { useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { getAllCustomersUrl } from "../../routes/routes";
import { 
    PASSWORD_INSUFFICIENT_LEN_ERROR, 
    newCustomerRecord,
    GENERIC_EMAIL_ERROR,
    EMAIL_ALREADY_EXISTS
} from "./signupConstants";

import { GoogleAuthProvider } from "firebase/auth";

const useSignupHooks = () => {
    const { createUser, setCurrentUserDetail, signInWithGmailPopup, sendPasswordResetEmailToUser } = UserAuth() 
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")

    const[showErrorWarning, setShowErrorWarning] = useState(false)
    const [showPageLoadSpinner, setShowPageLoadSpinner] = useState(false)

    const handleShowErrorWarning = (event) => {
        setShowErrorWarning(!showErrorWarning)
    }
  
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)

        if (event.target.value.length < 6) {
            setPasswordError(PASSWORD_INSUFFICIENT_LEN_ERROR)
        } else {
            setPasswordError("")
        }
    }

    const signInViaGoogle = async () => {
        await signInWithGmailPopup()
        .then((result) => {
            console.log("Signed in via Google")
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user
        
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            setServerError(error)
            setShowErrorWarning(true)
        })

        navigate("/home")
    }
    
    const handleFormSignup = async (event) => {
        setShowErrorWarning(false)
        event.preventDefault()
        try {
            setShowPageLoadSpinner(true)
            await createUser(email, password)
            await setCurrentUserDetail(username)

            const newRecord = newCustomerRecord(username, email, password)

            await axios.post(getAllCustomersUrl, newRecord)
                .then(response => {
                    navigate('/Home')
                })
                .catch(error => {
                    console.log(error)
                })
                
        } catch (error) {
            setShowErrorWarning(true)
            if (error.code == "auth/email-already-in-use") {
                setServerError(EMAIL_ALREADY_EXISTS)
            } else {
                setServerError(GENERIC_EMAIL_ERROR)
            }
        } finally {
            setShowPageLoadSpinner(false)
        }   
    }

    const state = { 
        username, 
        email,
        password, 
        passwordError, 
        serverError,
        showErrorWarning,
        showPageLoadSpinner
    }

    const setState = { 
        handleUsernameChange, 
        handleEmailChange,
        handlePasswordChange,  
        handleFormSignup,
        signInViaGoogle,
        handleShowErrorWarning
    }

    return { state, setState }

}

export default useSignupHooks