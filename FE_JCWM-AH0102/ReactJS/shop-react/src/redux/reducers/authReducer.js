const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    phone: "",
    cart: [],
    role: "",
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                cart: action.payload.cart,
                role: action.payload.role
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}