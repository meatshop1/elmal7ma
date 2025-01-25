export const verify = async (token) => {
    const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/jwt/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
}