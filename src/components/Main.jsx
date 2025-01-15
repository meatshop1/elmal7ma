import ItemCard from "./ItemCard";

const items = [
  {
    id: 1,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Farha ibrahiem",
    price: 100,
    count: 0,
    description: "Description 1",
  },
  {
    id: 2,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 2",
    price: 200,
    count: 0,
    description: "Description 2",
  },
  {
    id: 3,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 3",
    price: 300,
    count: 0,
    description: "Description 3",
  },
  {
    id: 4,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 4",
    price: 400,
    count: 0,
    description: "Description 4",
  },
  {
    id: 5,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 5",
    price: 500,
    count: 0,
    description: "Description 5",
  },
  {
    id: 6,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 3",
    price: 300,
    count: 0,
    description: "Description 3",
  },
  {
    id: 7,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 4",
    price: 400,
    count: 0,
    description: "Description 4",
  },
  {
    id: 8,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 5",
    price: 500,
    count: 0,
    description: "Description 5",
  },
];

const Main = () => {
  
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto z-10 mb-10">
      <div className="m-auto h-fit mt-10 w-[60%] grid grid-rows-* grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            product={item}
            className={"col-span-1 row-span-1 place-self-center m-2"}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
