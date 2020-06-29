const INITIAL_STATE = {
    id: null,
    username: null,
    email: null,
    role: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}