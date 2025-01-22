export const patchCartItemQuantity = async (cart_id, product_id, quantity) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const cartItems = await fetchCartItems(cart_id);
    const item_id = cartItems.find((item) => item.product.id === product_id).id;
    const response = await fetch(SERVER_URL + `/carts/${cart_id}/items/${item_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });
    const data = await response.json();
    return data;
};