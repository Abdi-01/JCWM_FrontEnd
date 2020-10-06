const INITIAL_STATE = {
    slide: []
}

export const slideReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_SLIDE":
            return { ...state, slide: action.payload }
        default:
            return state
    }
}