import { getCartOrCreate } from "../cart/getCartOrCreate";

export const postOrder = async (address_id) => {
    const token = localStorage.getItem("token");
    const cart_id = localStorage.getItem("cart_id");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    //TODO: get the address id from the user
    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(SERVER_URL + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ cart_id, address_id }),
    });
    const data = await response.json();
    localStorage.removeItem("cart_id");
    await getCartOrCreate();
    return data;
};