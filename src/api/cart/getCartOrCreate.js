export const getCartOrCreate = async () => {
    // first check if there is a cart_id in the local storage
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    let cart_id = localStorage.getItem("cart_id");
    if (cart_id) {
        // if there is a cart_id, fetch the cart
        const response = await fetch(SERVER_URL + `/carts/${cart_id}`);
        const cart = await response.json();
        return cart;
    }
    // if there is no cart_id, create a new cart
    const response = await fetch(SERVER_URL + "/carts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    const cart = await response.json();
    localStorage.setItem("cart_id", cart.id);
    return cart;
}