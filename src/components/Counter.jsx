import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useStore } from "../store";

const Counter = ({ hideCounter, className, increment, decrement, initCount }) => {
  const [count, setCount] = useState(initCount || 1);
  const { lng } = useStore();
  
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    increment();
  };
  const handleDecrement = () => {
    decrement();
    if (count === 1) {
      hideCounter();
      return;
    }
    setCount((prev) => prev - 1);
  };
  return (
    <motion.div
      className={twMerge(
        `absolute w-20 h-6 md:w-28 md:h-8 bg-secondary rounded-lg flex items-center overflow-hidden justify-between ${lng !== "en" ? "left-2 md:left-4" : "right-2 md:right-4"}`,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ height: 0, y: 20, opacity: 0, width: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        exit={{ height: 0 }}
        transition={{ duration: 0.1 }}
        className="w-7 md:w-8 h-full bg-primary rounded-lg grid place-items-center"
        onClick={handleDecrement}
      >
        <motion.span exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
          <Minus className="size-5 md:size-7"/>
        </motion.span>
      </motion.button>

      <motion.p
        className="text-white font-semibold text-xl md:text-2xl"
        exit={{ height: 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.span exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
          {count}
        </motion.span>
      </motion.p>

      <motion.button
        exit={{ height: 0 }}
        transition={{ duration: 0.1 }}
        className="w-7 md:w-8 h-full bg-primary rounded-lg grid place-items-center"
        onClick={handleIncrement}
      >
        <motion.p exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
          <Plus className="size-5 md:size-7"/>
        </motion.p>
      </motion.button>
    </motion.div>
  );
};

export default Counter;
