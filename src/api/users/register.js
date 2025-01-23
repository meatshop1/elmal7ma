import { login } from "./login";
export const register = async (data) => {
    console.log(data)
    const SERVER_URL = import.meta.env.VITE_AUTH_URL;   
    console.log(SERVER_URL + "/users/") 
    const response = await fetch(SERVER_URL + "/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const loginData = {
            email: data.email,
            password: data.password,
        };
        const loginResponse = await login(loginData);
        localStorage.setItem("token", loginResponse.access);
        localStorage.setItem("refreshToken", loginResponse.refresh);
        return loginResponse;
    }
    const responseData = await response.json();
    return responseData;
};