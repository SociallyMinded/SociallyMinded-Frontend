import axios from "axios";
import { useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { EMAIL_DOES_NOT_EXIST } from "./resetEmailConstants";


const useResetPasswordHooks = () => {
    const { sendPasswordResetEmailToUser } = UserAuth() 
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [serverError, setServerError] = useState("")

    const[showErrorWarning, setShowErrorWarning] = useState(false)
    const [showPageLoadSpinner, setShowPageLoadSpinner] = useState(false)
    const [showEmailSentNotification, setShowEmailSentNotification] = useState(false)

    const handleShowEmailSentNotification = (event) => {
        setShowEmailSentNotification(!showEmailSentNotification)

    }

    const handleShowErrorWarning = (event) => {
        setShowErrorWarning(!showErrorWarning)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const sendPasswordResetEmail = async (event) => {
        setServerError("")
        setShowErrorWarning(false)
        setShowEmailSentNotification(false)
        event.preventDefault()

        try {
            setShowPageLoadSpinner(true)
            await sendPasswordResetEmailToUser(email)
            .then((result) => {
                setShowEmailSentNotification(true)
            })
        }
        catch(error) {
            setShowErrorWarning(true)
            setServerError(EMAIL_DOES_NOT_EXIST)
        }
        finally {
            setShowPageLoadSpinner(false)            
        }

    }

    const state = { 
        email,
        serverError,
        showErrorWarning,
        showPageLoadSpinner,
        showEmailSentNotification
    }

    const setState = { 
        handleEmailChange,
        sendPasswordResetEmail,
        handleShowErrorWarning,
        handleShowEmailSentNotification
    }

    return { state, setState }

}

export default useResetPasswordHooks