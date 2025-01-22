export const items = [
    {
        id: 1,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Farha ibrahiem",
        category: "Category 1",
        price: 100,
        count: 0,
        description: "Description 1",
    },
    {
        id: 2,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 2",
        category: "Category 2",
        price: 200,
        count: 0,
        description: "Description 2",
    },
    {
        id: 3,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 3",
        category: "Category 3",
        price: 300,
        count: 0,
        description: "Description 3",
    },
    {
        id: 4,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 4",
        category: "Category 4",
        price: 400,
        count: 0,
        description: "Description 4",
    },
    {
        id: 5,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 5",
        category: "Category 5",
        price: 500,
        count: 0,
        description: "Description 5",
    },
    {
        id: 6,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 3",
        category: "Category 3",
        price: 300,
        count: 0,
        description: "Description 3",
    },
    {
        id: 7,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 4",
        category: "Category 4",
        price: 400,
        count: 0,
        description: "Description 4",
    },
    {
        id: 8,
        url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
        name: "Item 5",
        category: "Category 5",
        price: 500,
        count: 0,
        description: "Description 5",
    },
];

export const fetchProducts = async (options) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: replace the proudcts below with products1
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(SERVER_URL + "/products");
    const products1 = await response.json();

    let products = items;
    if (options?.search) {
        products = products.filter((product) =>
            product.name.toLowerCase().includes(options.search.toLowerCase())
        );
    }
    if (options?.category?.length) {
        if(options.category.includes("All")) return products;
        products = products.filter((product) =>
            options.category.includes(product.category)
        );
    }

    return products
};