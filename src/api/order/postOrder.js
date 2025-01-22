export const postOrder = async () => {
    const token = localStorage.getItem("token");
    const cart_id = localStorage.getItem("cart_id");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(SERVER_URL + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ cart_id }),
    });
    const data = await response.json();
    return data;
};