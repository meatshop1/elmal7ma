import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { Search } from "lucide-react";
import { fetchCollections } from "../api/collections/fetchCollections";
import { useQuery } from "@tanstack/react-query";

const taps = [
  { id: 1, name: "All" },
  { id: 2, name: "Category 1" },
  { id: 3, name: "Shower" },
  { id: 4, name: "Sink" },
  { id: 5, name: "Toilet" },
];

const ProductListFilter = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const debouncedSearch = useDebounce(search);

  // TODO: should be named tabs instead of collections then make sure to replace .name with .title
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollections(),
  });

  useEffect(() => {
    onChange({ search: debouncedSearch, category });
  }, [category, debouncedSearch]);

  return (
    <div className="flex flex-col items-center justify-center w-1/4 ">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-white text-xl rounded-md p-2 mt-10 focus:outline-none w-full h-9 bg-secondary"
      />
      <div className="flex flex-wrap justify-center mt-2 w-full ">
        {taps.map((tap) => (
          <button
            key={tap.id}
            onClick={() => {
              if (category.includes(tap.name)) {
                setCategory(category.filter((item) => item !== tap.name));
              } else if (tap.name === "All") {
                setCategory(["All"]);
              } else {
                category.includes("All")
                  ? setCategory([tap.name])
                  : setCategory([...category, tap.name]);
              }
            }}
            className={`${
              !category.length && tap.name === "All"
                ? " border-white bg-secondary"
                : ""
            }
            ${
              category.includes(tap.name)
                ? " border-2 border-accent bg-secondary"
                : "bg-custom border-2 border-transparent"
            }  text-lg rounded-md px-2 m-1  focus:outline-none`}
          >
            {tap.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListFilter;
