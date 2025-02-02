import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { patchCartItemQuantity } from "../api/cart/patchCartItemQuantity";
import { removeFromCart } from "../api/cart/removeFromCart";
import { useStore } from "../store";

const Counter = ({
  hideCounter,
  className,
  initCount,
  product_id,
}) => {
  // console.log(product_id, "initCount is" ,initCount)
  const [count, setCount] = useState(1);
  const { lng, deleteOpenedCounter, openedCounters } = useStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: (data) => {
      setCount(data.quantity);
      queryClient.invalidateQueries("cart");
    },
  });
  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      console.log("Removed from Cart Successfully", data);
      queryClient.invalidateQueries("cart");
      deleteOpenedCounter(product_id);
      console.log(openedCounters)
    },
  });

  useEffect(() => {
    setCount(initCount || 1);
  }, [initCount]);

  const handleIncrement = () => {
    mutation.mutate({ product_id, quantity: count + 1 });
  };
  const handleDecrement = () => {
    if (count === 1) {
      removeMutation.mutate({product_id , item_id: null});
      hideCounter();
      return;
    }
    mutation.mutate({ product_id, quantity: count - 1 });
  };
  return (
    <motion.div
      className={twMerge(
        `absolute w-20 h-6 md:w-28 md:h-8 bg-secondary rounded-lg flex items-center overflow-hidden justify-between`,
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
          <Minus className="size-5 md:size-7" />
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
          <Plus className="size-5 md:size-7" />
        </motion.p>
      </motion.button>
    </motion.div>
  );
};

export default Counter;
