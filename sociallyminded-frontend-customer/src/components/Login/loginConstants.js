export const WRONG_PASSWORD = "Your password is incorrect"
export const USER_NOT_FOUND = "You do not have an account under this email"
export const GENERIC_EMAIL_ERROR = "Invalid Email"
export const GENERIC_LOGIN_ERROR = "Login credentials are incorrect"

export const newCustomerRecord = (username, email, firebaseUid) => {
    return {
        "username": username,
        "email" : email,
        "firebaseUid": firebaseUid
    }
}
