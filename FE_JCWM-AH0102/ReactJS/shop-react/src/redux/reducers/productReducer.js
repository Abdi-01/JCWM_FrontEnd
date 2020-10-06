// INITIAL_STATE dibuat jika, terdapat banyak jenis property data yang mau disimpan ke reducer
// const INITIAL_STATE = {
//     productList: [],
//     product_form: {
//         name: "",
//         image: ""
//     }
// }

export const productReducers = (state = [], action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            console.log("Reducer products", action.payload)
            return action.payload
        default:
            return state
    }
}