export const fetchCartItems = async () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const cart_id = localStorage.getItem("cart_id");
    const response = await fetch(SERVER_URL + `/carts/${cart_id}`);
    const cartItems = await response.json();
    return cartItems;
}