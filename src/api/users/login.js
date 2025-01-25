export const login = async (data) => {
    const SERVER_URL = import.meta.env.VITE_AUTH_URL;
    const response = await fetch(SERVER_URL + "/jwt/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(JSON.stringify(responseData));
    }
    localStorage.setItem("token", responseData.access);
    localStorage.setItem("refreshToken", responseData.refresh);
    return responseData;
};