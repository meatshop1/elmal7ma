import { login } from "./login";
import { getConfig } from "../config";
export const register = async (data) => {
    console.log(data)
    const config = getConfig();
    const SERVER_URL = config?.AUTH_URL || import.meta.env.VITE_AUTH_URL;
    console.log(SERVER_URL + "/users/")
    const response = await fetch(SERVER_URL + "/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const loginData = {
        username: data.username,
        password: data.password,
    };
    const loginResponse = await login(loginData);
    localStorage.setItem("token", loginResponse.access);
    localStorage.setItem("refreshToken", loginResponse.refresh);
    return loginResponse;
};