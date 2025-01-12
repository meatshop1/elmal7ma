import {useState} from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const Counter = ({hideCounter}) => {
    const [count, setCount] = useState(1);
    const handleIncrement = () => {
        setCount((prev) => prev + 1);
    };
    const handleDecrement = () => {
        if (count === 1) {
            hideCounter();
            return;
        }
        setCount((prev) => prev - 1);
    };
  return (
    <motion.div
      className="absolute w-28 h-8 bg-slate-700 rounded-lg flex items-center justify-between right-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ height: 0, y: 20, opacity: 0, width: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        exit={{ height: 0 }}
        transition={{duration: 0.1}}
        className="w-8 h-full bg-slate-800 rounded-lg grid place-items-center"
        onClick={handleDecrement}
      >
        <motion.span exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
          <Minus />
        </motion.span>
      </motion.button>

      <motion.p
        className="text-white"
        exit={{ height: 0 }}
        transition={{ duration: 0.1}}
      >
        <motion.p exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
            {count}
        </motion.p>
      </motion.p>

      <motion.button
        exit={{ height: 0 }}
        transition={{ duration: 0.1 }}
        className="w-8 h-full bg-slate-800 rounded-lg grid place-items-center"
        onClick={handleIncrement}
      >
        <motion.p exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
          <Plus />
        </motion.p>
      </motion.button>
    </motion.div>
  );
};

export default Counter;
