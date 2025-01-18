import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useStore } from "../store";
import Counter from "./Counter";

const ItemCard = ({ product, className }) => {
  const [showCounter, setShowCounter] = useState(false);
  const { addToCart, removeFromCart, increment, decrement, cart } = useStore();

  const [scobe, animate] = useAnimate();

  const handleAdd = () => {
    console.log("Trash Clicked");
    console.log(product);
    setShowCounter((prev) => !prev);
    showCounter ? removeFromCart(product) : addToCart(product);
    animate("button", { y: showCounter ? 0 : -40 });
  };

  // this function should be called when the user deletes the item from the cart
  const hideCounter = () => {
    setShowCounter(false);
    animate("button", { y: 0 });
  };

  useEffect(() => {
    if(cart.filter((p) => p.id === product.id).length < 1){
      hideCounter();
    } 
  }, [cart]);

  return (
    <motion.div ref={scobe}>
      <div
        className={twMerge(
          "bg-custom w-[16rem] h-80 rounded-lg shadow-lg flex flex-col items-start",
          className
        )}
      >
        <img
          src={product.url}
          alt="placeholder"
          className="w-[93%] h-1/2 mx-auto rounded-lg mt-3"
        />
        <h2 className="text-xl font-semibold ml-4 mt-3">{product.name}</h2>
        <p className="text-sm text-gray-400 ml-4 mt-1">{product.description}</p>
        <div className="flex items-center justify-between w-full px-4 mt-auto py-2 relative">
          <p className="text-lg font-semibold">
            <span className="text-2xl">{product.price}</span><span className="pl-1 font-thin">SR</span>
          </p>
          <AnimatePresence>
            {showCounter && (
              <Counter
                hideCounter={hideCounter}
                className={""}
                increment={increment.bind(null, product)}
                decrement={decrement.bind(null, product)}
                initCount={product.count}
              />
            )}
          </AnimatePresence>
          <button
            className="bg-primary text-white w-10 h-10 rounded-full grid place-items-center"
            onClick={() => handleAdd()}
          >
            {showCounter ? <Trash2 /> : <Plus />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
