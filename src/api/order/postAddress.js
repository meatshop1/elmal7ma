export const postAddress = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/address/`, {
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