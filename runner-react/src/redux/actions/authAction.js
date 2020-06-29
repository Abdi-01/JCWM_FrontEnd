export const login = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}

export const logout = (data) => {
    return {
        type: "LOGOUT"
    }
}