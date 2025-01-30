import { getCartOrCreate } from "../cart/getCartOrCreate";
import { verify } from "../users/verify";


export const postOrder = async () => {
    const token = localStorage.getItem("token");
    const cart_id = localStorage.getItem("cart_id");
    const address_id = localStorage.getItem("address_id");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    //check if the user is logged in 
    const user = await verify();

    
    if (!token || !cart_id || !address_id || !user) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(SERVER_URL + "/orders/", {
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