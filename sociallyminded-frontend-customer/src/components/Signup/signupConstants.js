export const PASSWORD_INSUFFICIENT_LEN_ERROR = "Password should be at least 6 characters"

export const newCustomerRecord = (email, password, username) => {
    return {
        "email": email,
        "username" : username,
        "password": password
    }
}
