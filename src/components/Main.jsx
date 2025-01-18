import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products/fetchProducts";
import ProductList from "./ProductList";
import ProductListFilter from "./ProductListFilter";
import { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", { search , category }],
    queryFn: () => fetchProducts({ search, category }),
  });

  const onChange = (options) => {
    setSearch(options.search);
    setCategory(options.category);
  };

  return (
    <main className="flex flex-col items-center min-h-full justify-center w-full mx-auto z-10 mb-10">
      <ProductListFilter onChange={onChange} />
      {products && <ProductList products={products} className="" />}
      {isLoading && <p className="h-[100vh]">Loading...</p>}
    </main>
  );
};

export default Main;
