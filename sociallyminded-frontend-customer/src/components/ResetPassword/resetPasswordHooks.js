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

    const handleShowErrorWarning = (event) => {
        setShowErrorWarning(!showErrorWarning)
    }

    const handleEmailChange = (event) => {
        setServerError("")
        setEmail(event.target.value)
    }

    const sendPasswordResetEmail = async (event) => {
        setShowErrorWarning(false)
        event.preventDefault()

        try {
            setShowPageLoadSpinner(true)
            await sendPasswordResetEmailToUser(email)
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
        showPageLoadSpinner
    }

    const setState = { 
        handleEmailChange,
        sendPasswordResetEmail,
        handleShowErrorWarning
    }

    return { state, setState }

}

export default useResetPasswordHooks