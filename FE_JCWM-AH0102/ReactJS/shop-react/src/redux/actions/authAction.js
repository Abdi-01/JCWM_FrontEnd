// fungsi yng mengarahkan data dari component ke reducer 
export const login = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}