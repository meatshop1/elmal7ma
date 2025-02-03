export const addToCart = async (obj) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const cart_id = localStorage.getItem("cart_id");
    const response = await fetch(SERVER_URL + `/carts/${cart_id}/items/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });
    const data = await response.json();
    return data;
};