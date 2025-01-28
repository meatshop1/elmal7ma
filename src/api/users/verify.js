export const verify = async () => {
    const token = localStorage.getItem("token");
    if(!token) return false;
    console.log("verifying token", token);
    const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/jwt/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });
    if(response.status === 401) {
        localStorage.removeItem("token");
        return false;
    }
    const data = await response.json();
    return data;
}