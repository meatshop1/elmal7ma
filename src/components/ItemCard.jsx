import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { addToCart } from "../api/cart/addToCart";
import { removeFromCart } from "../api/cart/removeFromCart";
import { useStore } from "../store";
import Counter from "./Counter";

const ItemCard = ({ product, className, hasCounter }) => {
  const { lng } = useStore();
  const [showCounter, setShowCounter] = useState(false);
  const { t } = useTranslation();
  const [scobe, animate] = useAnimate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setShowCounter(hasCounter || false);
    animate("#add-button", { y: hasCounter ? -35 : 0 });
  }, [hasCounter]);

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart");
    },
  });

  const handleAddMutation = () => {
    addMutation.mutate({
      product_id: product.id,
      quantity: 1,
      notes: "",
      animal: "cow",
    });
  };
  const handleRemoveMutation = () => {
    removeMutation.mutate({ product_id: product.id, item_id: null });
  };

  const handleAdd = () => {
    setShowCounter((prev) => !prev);
    showCounter ? handleRemoveMutation() : handleAddMutation();
    animate("button", { y: showCounter ? 0 : -35 });
  };

  // this function should be called when the user deletes the item from the cart
  const hideCounter = () => {
    setShowCounter(false);
    animate("button", { y: 0 });
  };

  return (
    <motion.div ref={scobe}>
      <div
        className={twMerge(
          "bg-custom w-[10.5rem] h-60 md:w-[16rem] md:h-80 rounded-lg shadow-lg flex flex-col items-start",
          className
        )}
      >
        <img
          src={product.url}
          alt="placeholder"
          className="w-[93%] h-1/2 mx-auto rounded-lg mt-2 md:mt-3"
        />
        <h2
          className={`text-[1rem] font-semibold h-fit leading-5 mt-2 md:text-xl ${
            lng === "en" ? "ml-2 mr-1  md:ml-4" : "mr-2 ml-1 md:mr-4 font-kufam"
          }`}
        >
          {lng === "en" ? product.name : product.name_ar}
        </h2>
        <p
          className={`text-sm text-gray-400 bg-red ${
            lng === "en" ? "ml-2  md:ml-4" : "mr-2 md:mr-4 font-kufam text-xs"
          }`}
        >
          {lng === "en" ? product.collection : product.collection_ar}
        </p>
        <div className="flex items-center justify-between w-full px-2 md:px-4 mt-auto py-2 relative ">
          <p className="text-lg font-semibold ">
            <span className="text-xl md:text-2xl">{product.price}</span>
            <span
              className={`font-thin ${
                lng === "en" ? "pl-1" : "pr-1 text-sm font-kufam"
              }`}
            >
              {t("Currency")}
            </span>
          </p>
          <AnimatePresence>
            {showCounter && (
              <Counter
                hideCounter={hideCounter}
                className={`${
                  lng !== "en" ? "left-2 md:left-4" : "right-2 md:right-4"
                }`}
                initCount={showCounter || 1}
                product_id={product.id}
              />
            )}
          </AnimatePresence>
          <motion.button
            id="add-button"
            initial={{ y: showCounter ? -35 : 0 }}
            className={`bg-primary text-white w-7 h-7 md:w-10 md:h-10 rounded-full grid place-items-center md:mb-2`}
            onClick={() => handleAdd()}
          >
            {showCounter ? <Trash2 className="size-5 md:size-7" /> : <Plus />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
