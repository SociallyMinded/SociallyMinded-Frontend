import axios from "axios";
import { useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'


const useResetPasswordHooks = () => {
    const { sendPasswordResetEmailToUser } = UserAuth() 
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [serverError, setServerError] = useState("")

    const[showErrorWarning, setShowErrorWarning] = useState(false)

    const handleShowErrorWarning = (event) => {
        setShowErrorWarning(!showErrorWarning)
    }

    const handleEmailChange = (event) => {
        setServerError("")
        setEmail(event.target.value)
    }

    const sendPasswordResetEmail = async (event) => {
        event.preventDefault();
        await sendPasswordResetEmailToUser(email)
        .then(() => {
            console.log("password reset email sent")
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            setServerError(errorMessage)
            setShowErrorWarning(true)
        })
    }

    const state = { 
        email,
        serverError,
        showErrorWarning
    }

    const setState = { 
        handleEmailChange,
        sendPasswordResetEmail,
        handleShowErrorWarning
    }

    return { state, setState }

}

export default useResetPasswordHooks