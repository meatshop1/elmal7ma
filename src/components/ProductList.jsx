import React from "react";
import ItemCard from "./ItemCard";
import { twMerge } from "tailwind-merge";

const ProductList = ({ products, className }) => {
  return (
    <div
      className={twMerge(
        "m-auto h-fit mt-10 w-[60%] grid grid-rows-* grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]",
        className
      )}
    >
      {products.map((item) => (
        <ItemCard
          key={item.id}
          product={item}
          className={"col-span-1 row-span-1 place-self-center m-2"}
        />
      ))}
    </div>
  );
};

export default ProductList;
