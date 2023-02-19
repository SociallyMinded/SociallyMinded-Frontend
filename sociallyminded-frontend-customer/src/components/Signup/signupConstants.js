export const PASSWORD_INSUFFICIENT_LEN_ERROR = "Password should be at least 6 characters"
export const EMAIL_ALREADY_EXISTS = "There is already an account with this email"
export const GENERIC_EMAIL_ERROR = "Invalid Email"

export const newCustomerRecord = (username, email, firebaseUid) => {
    return {
        "username": username,
        "email" : email,
        "firebaseUid": firebaseUid
    }
}
