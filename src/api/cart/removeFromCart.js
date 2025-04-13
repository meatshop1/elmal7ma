import { fetchCartItems } from "./fetchCartItems";
import { getConfig } from "../config";
export const removeFromCart = async ({ product_id, item_id }) => {
    console.log(product_id, item_id)
    const config = getConfig();
    const SERVER_URL = config?.SERVER_URL || import.meta.env.VITE_SERVER_URL;
    const cart_id = localStorage.getItem("cart_id");

    try {
        if (!item_id) {
            const cartItems = await fetchCartItems(cart_id);
            item_id = cartItems.items.find((item) => item.product.id === product_id).id;
        }
        const response = await fetch(SERVER_URL + `/carts/${cart_id}/items/${item_id}/`, {
            method: "DELETE",
        });
        if (response.status !== 204) {
            const data = await response.json();
            throw new Error(data.detail);
        }
        return { success: true };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, error: error.message };
    }
}

