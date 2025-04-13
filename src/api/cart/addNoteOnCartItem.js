import { getConfig } from "../config";

export const addNoteOnCartItem = ({item_id, obj}) => {
    // obj contains the note and quantity and animal type
    const cart_id = localStorage.getItem("cart_id");
    const config = getConfig();
    const SERVER_URL = config?.SERVER_URL || import.meta.env.VITE_SERVER_URL;
    try {
        fetch(SERVER_URL + `/carts/${cart_id}/items/${item_id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
    } catch (error) {
        console.error(error);
    }
}