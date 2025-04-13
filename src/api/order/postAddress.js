import { getConfig } from "../config";
export const postAddress = async (data) => {
    const config = getConfig();
    const SERVER_URL = config?.SERVER_URL || import.meta.env.VITE_SERVER_URL;
    const response = await fetch(SERVER_URL + '/address/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if(!response.ok) {
        throw new Error(responseData[Object.keys(responseData)[0]]);
    }
    return responseData;
}