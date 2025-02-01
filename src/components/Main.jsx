import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProducts } from "../api/products/fetchProducts";
import Loader from "./Loader";
import ProductList from "./ProductList";
import ProductListFilter from "./ProductListFilter";
import { useStore } from "../store";
import ReactPaginate from "react-paginate";


const Main = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const { lng } = useStore();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", { search, category, lng }],
    queryFn: () => fetchProducts({ search, category, lng }),
  });


  const onChange = (options) => {
    setSearch(options.search);
    setCategory(options.category);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto z-10 mb-10">
      <ProductListFilter onChange={onChange} />
      {products && <ProductList products={products} className="min-h-[80vh]" />}
      {isLoading && (
        <Loader />
      )}
    </main>
  );
};

export default Main;
