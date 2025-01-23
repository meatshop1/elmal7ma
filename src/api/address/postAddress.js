export const postAddress = async (address) => {
    const token = localStorage.getItem("token");
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    if (!token) {
        throw new Error("Unauthorized");
    }
    const response = await fetch(SERVER_URL + "/address", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(address),
    });
    const data = await response.json();
    return data;
};