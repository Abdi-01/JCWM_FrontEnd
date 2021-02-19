const INITIAL_STATE = {
    iduser: null,
    username: "",
    email: "",
    phone: "",
    role: "",
    cart: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                iduser: action.payload.iduser,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                role: action.payload.role
            }
        case "GET_CART":
            return {
                ...state,
                cart: action.payload
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}