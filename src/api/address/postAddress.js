import { getConfig } from "../config";

export const postAddress = async (address) => {
    const token = localStorage.getItem("token");
    const config = getConfig();
    const SERVER_URL = config?.SERVER_URL || import.meta.env.VITE_SERVER_URL;

    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const response = await fetch(SERVER_URL + "/address/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`,
            },
            body: JSON.stringify(address),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        localStorage.setItem("address_id", data.id);
        return data;
    } catch (error) {
        console.error("Error posting address:", error);
        throw error;
    }
};