import { getConfig } from "../config";

export const verify = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const config = getConfig();
    const SERVER_URL = config?.AUTH_URL || import.meta.env.VITE_AUTH_URL;
    const response = await fetch(SERVER_URL + '/jwt/verify', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
    if (response.status === 401) {
        localStorage.removeItem("token");
        return false;
    }
    const data = await response.json();
    return data;
}