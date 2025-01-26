import { Trash2 } from "lucide-react";
import Counter from "./Counter";
import { motion } from "framer-motion";
import { useStore } from "../store";

const CartCard = ({ product }) => {
  const { removeFromCart, increment, decrement } = useStore();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 2000 }}
      transition={{ duration: 0.2 }}
      layout
      className="w-full h-24 md:h-32 font-poppins bg-custom flex gap-2 rounded-lg p-2 my-2 relative "
    >
      <button
        onClick={() => removeFromCart(product)}
        className="w-6 h-6 hover:bg-secondary bg-primary transition-all grid place-content-center rounded-full absolute top-2 right-2"
      >
        <Trash2 className="size-5 md:size:7"/>
      </button>
      <img
        src={product.url}
        alt={product.name}
        className="w-1/3 h-full object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col border-l-2 border-gray-700 pl-2">
        <p className="text-white text-[1rem] md:text-2xl leading-none mb-1">{product.name}</p>
        <p className="text-gray-500 text-xs md:text-sm">{product.description}</p>
        <p className="text-white text-lg md:text-2xl font-light mt-auto">
          {product.price}<span className="text-sm font-thin">SR</span>
        </p>
        <Counter
          initCount={product.count}
          className="absloute bottom-2 right-2 text-xl"
          increment={increment.bind(null, product)}
          decrement={decrement.bind(null, product)}
        />
      </div>
    </motion.div>
  );
};

export default CartCard;
