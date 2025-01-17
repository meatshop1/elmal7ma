import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

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

  useEffect(() => {
    onChange({ search: debouncedSearch, category });
  }, [category, debouncedSearch]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-black text-2xl rounded-md p-2 mt-10 focus:outline-none"
      />
      <div>
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
              category.includes(tap.name) ? "bg-blue-500" : "bg-blue-300"
            } ${
              !category.length && tap.name === "All" ? "bg-blue-500" : ""
            } text-white text-lg rounded-md px-2 m-2 focus:outline-none`}
          >
            {tap.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListFilter;
