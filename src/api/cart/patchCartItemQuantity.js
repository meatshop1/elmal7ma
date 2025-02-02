import { fetchCartItems } from "./fetchCartItems";

export const patchCartItemQuantity = async ({ product_id, quantity, item_id }) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const cart_id = localStorage.getItem("cart_id");

    try {
        const cartItems = await fetchCartItems(cart_id);
        const { id, notes, animal } = cartItems.items.find((item) => item.product.id === product_id);
        const response = await fetch(SERVER_URL + `/carts/${cart_id}/items/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity, notes, animal }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error patching cart item quantity:', error);
        throw error;
    }
};