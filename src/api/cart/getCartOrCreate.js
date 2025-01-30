export const getCartOrCreate = async () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    let cart_id = localStorage.getItem("cart_id");
    if (cart_id) return cart_id;
    const response = await fetch(SERVER_URL + "/carts/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    });
    const cart = await response.json();
    localStorage.setItem("cart_id", cart.id);
    return cart.id;
}