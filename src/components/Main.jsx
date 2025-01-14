import ItemCard from "./ItemCard";

const items = [
  {
    id: 1,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Farha ibrahiem",
    price: 100,
    description: "Description 1",
  },
  {
    id: 2,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 2",
    price: 200,
    description: "Description 2",
  },
  {
    id: 3,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 3",
    price: 300,
    description: "Description 3",
  },
  {
    id: 4,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 4",
    price: 400,
    description: "Description 4",
  },
  {
    id: 5,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 5",
    price: 500,

    description: "Description 5",
  },
  {
    id: 6,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 3",
    price: 300,
    description: "Description 3",
  },
  {
    id: 7,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 4",
    price: 400,
    description: "Description 4",
  },
  {
    id: 8,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 5",
    price: 500,
    description: "Description 5",
  },
];

const Main = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="m-auto h-fit mt-10 w-[60%] grid grid-rows-* grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            url={item.url}
            name={item.name}
            description={item.description}
            price={item.price}
            className={"col-span-1 row-span-1 place-self-center m-2"}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
