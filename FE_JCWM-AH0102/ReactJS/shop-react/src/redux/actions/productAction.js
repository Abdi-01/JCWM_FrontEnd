export const getProducts = (data) => {
    console.log("ACtion products", data)
    return {
        type: "GET_PRODUCTS",
        payload: data
    }
}