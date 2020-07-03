export const getProducts = (data) => {
    console.log("Action Product :", data)
    return {
        type: "GET_PRODUCTS",
        payload: data
    }
}