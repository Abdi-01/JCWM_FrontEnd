
export const productReducer = (state = [], action) => {
    console.log("Reducer Product :", action.payload)
    switch (action.type) {
        case "GET_PRODUCTS":
            return action.payload
        default:
            return state
    }
}