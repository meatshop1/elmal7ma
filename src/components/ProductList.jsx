import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";
import { fetchCartItems } from "../api/cart/fetchCartItems";
import { useStore } from "../store";
import { convertEnglishToArabic } from "../utils/helpers";
import ItemCard from "./ItemCard";

const ProductList = ({ products, className }) => {
  // here you should fetch the cart with the key ["cart"]
  const { lng, setItemsCount, setTotal } = useStore();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = (page - 1) * itemsPerPage;
  const currentPage = products.slice(offset, offset + itemsPerPage);

  const [counterIds, setCounterIds] = useState(new Map());
  const { data: cartItems } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
  });

  useEffect(() => {
    let map = new Map();
    if (cartItems) {
      for (let item of cartItems.items) {
        map.set(item.product.id, item.quantity);
      }
    }
    setItemsCount(cartItems?.items.length || 0);
    setTotal(cartItems?.total_price || 0);
    setCounterIds(map);
  }, [cartItems]); 


  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  const pageBuilder = (page) => {
    return lng === "en" ? page : convertEnglishToArabic(page);
  };


  return (
    <>
      <div
        className={twMerge(
          "h-fit md:mt-10 w-full lg:w-[60%] grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]  md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]",
          className
        )}
      >
        {currentPage.map((item) => (
          <ItemCard
            key={item.id}
            product={item}
            hasCounter={counterIds.get(item.id)}
            className={"col-span-1 row-span-1 place-self-center m-2"}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel={t("PreviousBtn")}
        nextLabel={t("NextBtn")}
        nextClassName={`bg-custom text-accent text-sm  m-1 rounded-md ${
          page === pageCount || pageCount === 0 ? "hidden" : ""
        }`}
        nextLinkClassName={`${
          lng === "ar" ? "font-kufam" : "font-poppins"
        } grid place-content-center p-2 w-full`}
        previousClassName={`bg-custom text-accent text-sm  m-1 rounded-md ${
          page === 1 ? "hidden" : ""
        }`}
        previousLinkClassName={`${
          lng === "ar" ? "font-kufam" : "font-poppins"
        } grid place-content-center p-2 w-full`}
        breakLabel={"..."}
        breakClassName={""}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={
          "flex justify-evenly md:justify-center mt-5 w-full px-5"
        }
        pageClassName={`bg-custom grid place-content-center w-[2rem] text-accent text-sm  m-1 rounded-md `}
        pageLinkClassName={`${
          lng === "ar" ? "font-kufam" : "font-poppins"
        } w-[2rem] h-[2rem] p-2 grid place-content-center `}
        pageLabelBuilder={pageBuilder}
        disabledClassName="text-gray-300"
        activeClassName={"border-2 border-accent bg-secondary rounded-md"}
      />
    </>
  );
};

export default ProductList;
