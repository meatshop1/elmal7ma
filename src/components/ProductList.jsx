import React from "react";
import ItemCard from "./ItemCard";
import { twMerge } from "tailwind-merge";

const ProductList = ({ products, className }) => {
  return (
    <div
      className={twMerge(
        "h-fit md:mt-10 w-full lg:w-[60%] grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]",
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
