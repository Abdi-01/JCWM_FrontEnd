import Axios from "axios"
import { API_URL } from "../../support/url"

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

// Versi Redux-Thunk
export const Login = (username, password) => {
    return (dispatch) => {
        Axios.get(API_URL + `/users/login?username=${username}&password=${password}`)
            .then((res) => {

                if (res.data.dataLogin) {
                    localStorage.setItem("token", res.data.dataLogin.token)
                    dispatch({
                        type: "LOGIN",
                        payload: res.data.dataLogin
                    })
                }
                alert(res.data.messages)
            })
            .catch((err) => {

                console.log("Login Error", err)
            })
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {

            const headers = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            let get = await Axios.get(API_URL + `/users/keeplogin`, headers)
            console.log("cek", get.data)
            localStorage.setItem("token", get.data.dataLogin.token)
            dispatch({
                type: "LOGIN",
                payload: get.data.dataLogin
            })
        } catch (error) {
            console.log("KeepLogin Error :", error)
        }
    }
}

export const getCart = () => {
    return async (dispatch) => {
        try {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            let get = await Axios.get(API_URL + `/users/getCart`, headers)
            console.log("get cart :", get.data.dataLogin.token)
            dispatch({
                type: "GET_CART",
                payload: get.data
            })

        } catch (error) {
            console.log("Get Cart Error :", error)
        }
    }
}