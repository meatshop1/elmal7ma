import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Counter from "./Counter";
import { AnimatePresence, useAnimate, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const ItemCard = ({ url, name, description, price, className }) => {
  const [showCounter, setShowCounter] = useState(false);

  const [scobe, animate] = useAnimate();

  const handleAdd = () => {
    setShowCounter((prev) => !prev);
    animate("button", { y: showCounter ? 0 : -40});
  };

  const hideCounter = () => {
    setShowCounter(false);
    animate("button", { y: 0 });
  };

  return (
    <motion.div ref={scobe}>
      <div className={twMerge(
        "bg-slate-900 w-[16rem] h-80 rounded-lg shadow-lg flex flex-col items-start",
        className
      )}>
        <img
          src={url}
          alt="placeholder"
          className="w-[93%] h-1/2 mx-auto rounded-lg mt-3"
        />
        <h2 className="text-xl font-semibold ml-4 mt-3">{name}</h2>
        <p className="text-sm text-gray-400 ml-4 mt-1">{description}</p>
        <div className="flex items-center justify-between w-full px-4 mt-auto py-2 relative">
          <p className="text-lg font-semibold">
            <span className="font-thin text-2xl">{price}</span> SR
          </p>
          <AnimatePresence>
            {showCounter && <Counter hideCounter={hideCounter} />}
          </AnimatePresence>
          <button
            className="bg-slate-800 text-white w-10 h-10 rounded-full grid place-items-center"
            onClick={handleAdd}
          >
            {showCounter ? <Trash2 /> : <Plus />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
