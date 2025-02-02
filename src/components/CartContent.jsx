import { useState } from "react";
import { useStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, X } from "lucide-react";
import CartCard from "./CartCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../api/cart/fetchCartItems";

const CartContent = ({ setIsCheckoutOpen }) => {
  const { toggleCart, setTotal, setItemsCount } = useStore();
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const { Total, lng } = useStore();
  const { t } = useTranslation();

    const { data: cart, isLoading } = useQuery({
      queryKey: ["cart"],
      queryFn: fetchCartItems,
    });

   console.log("Cart items" ,cart)

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, transition: { duration: 0.1 } }}
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] xl:w-[40%] md:w-[70%] h-[80%] md:h-[90%] bg-accent overflow-hidden rounded-lg flex flex-col md:p-5 z-20 relative"
    >
      <p className={`text-custom font-poppins text-2xl md:text-4xl font-semibold pt-3  md:p-0 ${lng === "en" ? "pl-3" : "pr-3"}`}>
        <span className={`hidden md:inline-block text-custom ${lng === "en" ? "" : "font-kufam"}`}>{t("Cart.lgTitle")}</span>
        <span className={`md:hidden text-custom ${lng === "en" ? "" : "font-kufam"}`}>{t("Cart.smTitle")}</span>
      </p>
      <hr className="border border-gray-200 my-2" />
      <button
        onClick={() => {
          document.body.style.overflow = "auto";
          toggleCart(false);
        }}
        className={`absolute w-6 h-6 bg-red-800 grid place-content-center rounded-full top-3 ${lng === "en" ? "right-3" : "left-3"}`}
      >
        <X />
      </button>
      {cart?.items && cart.items.length ? (
        <>
          <div className="border border-gray-200 rounded-lg px-2 h-[35rem] scrollbar-hide overflow-y-scroll overflow-x-hidden w-[100%]">
            <AnimatePresence>
              {cart.items.map((item) => (
                <CartCard key={item.id} product={item} />
              ))}
            </AnimatePresence>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex mt-2">
              <p className={`text-custom p-2 text-2xl ${lng === "en" ? "font-poppins text-2xl" : "font-kufam text-xl"}`}>{t("Cart.total")} :</p>
              <p className="text-custom font-poppins font-semibold text-2xl p-2 px-0 rounded-lg ">
                {Total}<span className={`text-sm font-light text-custom ${lng === "en" ? "pl-1" : "pr-1 font-kufam"}`}>{t("Currency")}</span>
              </p>
            </div>
            <motion.button
              disabled={!cart.length}
              onHoverStart={() => setIsCheckoutHovered(true)}
              onHoverEnd={() => setIsCheckoutHovered(false)}
              onClick={() => setIsCheckoutOpen(true)}
              className="text-accent  font-poppins border text-xl flex items-center justify-center gap-4 m-2 p-2 bg-custom rounded-lg"
            >
              <motion.span animate={{ x: isCheckoutHovered ? 10 : 0 }}>
                <MoveRight />
              </motion.span>
              <span className={`${lng === "en" ? "" : "font-kufam"}`}>{t("Cart.checkout")}</span>{" "}
              
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            layout
            className="text-primary p-5 md:p-0 text-7xl md:text-8xl lg:text-9xl font-poppins md:flex md:items-center md:justify-center rounded-lg md:px-2 h-[35rem] scrollbar-hide overflow-y-auto opacity-20"
          >
            <span className={`text-custom ${lng === "en" ? "font-poppins" : "font-kufam text-6xl"}`}>{t("Cart.emptyCart")}</span>
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            onClick={() => {
              document.body.style.overflow = "auto";
              toggleCart(false);
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
            className=" rounded-lg w-fit md:p-5 m-3 ml-auto shadow-lg border font-poppins text-2xl p-3 md:text-5xl flex font-light items-center justify-center"
          >
            <span className={`text-custom ${lng === "en" ? "" : "font-kufam pt-2"}`}>{t("Cart.emptyCta")}</span>
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default CartContent;
