export const addPhone = async (phone) => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    const response = await fetch(SERVER_URL + '/customers/me/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        },
        body: JSON.stringify({ phone })
    })
    if(response.status === 401){
        throw new Error("Unauthorized");
    }
    const data = await response.json();
    return data;
}