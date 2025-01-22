export const addToCart = async (cart_id, product_id, quantity) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(SERVER_URL + `/carts/${cart_id}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id, quantity }),
    });
    const data = await response.json();
    return data;
};