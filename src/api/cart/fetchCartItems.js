export const fetchCartItems = async (cart_id) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(SERVER_URL + `/carts/${cart_id}/items`);
    const cartItems = await response.json();
    return cartItems;
}