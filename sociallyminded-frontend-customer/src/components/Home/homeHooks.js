import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { LogoutToastContext } from "../../App";

export const useHomeHooks = () => {
    
    // Handle logout toast popup
    const { showLogoutToast, setShowLogoutToast } = useContext(LogoutToastContext);
    const closeLogoutToast = () => setShowLogoutToast(false)

    // Display customer review 
    const [customerReview, setCustomerReview] = useState(0);
    const handleShowCustomerReview = () => {
        const newReview = (customerReview+1) % 5
        setCustomerReview(newReview)
    }

    const state = { 
        showLogoutToast,
        customerReview
    }

    const action = { 
        closeLogoutToast,
        handleShowCustomerReview
    }

    return { state, action }
}