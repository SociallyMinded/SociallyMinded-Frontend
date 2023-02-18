import axios from "axios";
import { useState } from "react";
import { getAuth, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { getAllCustomersUrl } from "../../routes/routes";
import { 
    PASSWORD_INSUFFICIENT_LEN_ERROR, 
    newCustomerRecord,
} from "./signupConstants";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const useSignupHooks = () => {
    const { createUser, signInWithGmailPopup, sendPasswordResetEmailToUser } = UserAuth() 
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [passwordError, setPasswordError] = useState("")
    const [serverError, setServerError] = useState("")
  
    const handleUsernameChange = (event) => {
        setServerError("")
        const { value } = event.target
        setUsername(value)
    }

    const handleEmailChange = (event) => {
        setServerError("")
        const { value } = event.target
        setEmail(value)
    }

    const handlePasswordChange = (event) => {
        setServerError("")
        const { value } = event.target
        setPassword(value)

        if (value.length < 6) {
            setPasswordError(PASSWORD_INSUFFICIENT_LEN_ERROR)
        } else {
            setPasswordError("")
        }
    }

    const sendPasswordResetEmail = async (event) => {
        await sendPasswordResetEmailToUser(email)
    }

    const signInViaGoogle = async (event) => {
        await signInWithGmailPopup(auth, provider)
        navigate("/home")
    }
    
    const handleFormSignup = async (event) => {
        event.preventDefault()
        try {
            if (passwordError == "") {
                await createUser(email, password)
                await updateProfile(auth.currentUser, {
                        displayName: username
                })
    
                const newRecord = newCustomerRecord(username, email, password)
    
                await axios.post(getAllCustomersUrl, newRecord)
                    .then(response => {
                        navigate('/Home')
                    })
                    .catch(error => {
                        console.log(error)
                        setServerError(error)
                    })
                }
        } catch (e) {
            setServerError(e.message)
        }   
    }

    const state = { 
        username, 
        email,
        password, 
        passwordError, 
        serverError
    }

    const setState = { 
        handleUsernameChange, 
        handleEmailChange,
        handlePasswordChange,  
        handleFormSignup,
        signInViaGoogle,
        sendPasswordResetEmail
    }

    return { state, setState }

}

export default useSignupHooks