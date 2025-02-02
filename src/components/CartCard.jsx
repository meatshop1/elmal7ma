import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { removeFromCart } from "../api/cart/removeFromCart";
import { useStore } from "../store";
import Counter from "./Counter";
import Notes from "./Notes";

const CartCard = ({ product }) => {
  const { lng } = useStore();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart");
    },
  });

  const handleRemoveMutation = () => {
    removeMutation.mutate({ product_id: null, item_id: product.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0.7, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{ duration: 0.3 }}
      layout
      className="w-full h-40 md:h-44 font-poppins bg-custom flex gap-2 rounded-lg p-2 my-2 relative "
    >
      <button
        onClick={() => handleRemoveMutation()}
        className={`w-6 h-6 md:w-8 md:h-8 hover:bg-secondary bg-primary transition-all grid place-content-center rounded-full absolute top-2 ${
          lng === "en" ? "right-2" : "left-2"
        }`}
      >
        <Trash2 className="size-5 md:size-7" />
      </button>
      <img
        src={product.url}
        alt={product.name}
        className="w-1/3 h-full object-cover rounded-lg"
      />
      <div
        className={`flex-1 flex flex-col  border-gray-700  ${
          lng === "en" ? "border-l-2 pl-2" : "border-r-2 pr-2"
        }`}
      >
        <p
          className={`text-white text-[0.9rem] pt-1 md:text-2xl leading-none mb-1 ${
            lng === "en" ? "" : "font-kufam"
          }`}
        >
          {lng === "en" ? product.product.name : product.product.name_ar}
        </p>
        <p
          className={`text-gray-500 text-xs md:text-sm ${
            lng === "en" ? "" : "font-kufam"
          }`}
        >
          {lng === "en"
            ? product.product.category_title
            : product.product.category_title_ar}
        </p>

        <Notes
          quantity={product.quantity}
          initialValue={product.notes}
          animal={product.animal}
          item_id={product.id}
        />

        <p className="text-white text-lg md:text-2xl font-light mt-auto">
          {product.product.price}
          <span
            className={`text-sm font-thin ${
              lng === "en" ? "pl-1" : "pr-1 font-kufam"
            }`}
          >
            {t("Currency")}
          </span>
        </p>
        <Counter
          initCount={product.quantity}
          className={`absloute bottom-2 text-xl ${
            lng !== "en" ? "left-2" : "right-2"
          }`}
          product_id={product.product.id}
          hideCounter={() => {}}
        />
      </div>
    </motion.div>
  );
};

export default CartCard;
