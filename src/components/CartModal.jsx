import { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, X } from "lucide-react";
import { useStore } from "../store";
import CartCard from "./CartCard";

const items = [
  {
    id: 1,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Farha ibrahiem",
    price: 100,
    description: "Description 1",
  },
  {
    id: 2,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 2",
    price: 200,
    description: "Description 2",
  },
  {
    id: 3,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 3",
    price: 300,
    description: "Description 3",
  },
  {
    id: 4,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 4",
    price: 400,
    description: "Description 4",
  },
  {
    id: 5,
    url: "https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg",
    name: "Item 5",
    price: 500,

    description: "Description 5",
  },
];
const CartModal = () => {
  const { toggleCart } = useStore();
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onClick={() => toggleCart(false)}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 grid place-items-center z-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, transition: { duration: 0.1 } }}
        onClick={(e) => e.stopPropagation()}
        className="w-[50%] h-[75%] bg-white rounded-lg flex flex-col p-5 z-20 relative"
      >
        <p className="text-black font-poppins">Your Shopping Cart</p>
        <hr className="border border-gray-200 my-2" />
        <button
          onClick={() => toggleCart(false)}
          className="absolute w-8 h-8 bg-black grid place-content-center rounded-full -top-4 right-0"
        >
          <X />
        </button>
        <div className="border border-gray-200 rounded-lg px-2 h-3/4 scrollbar-hide overflow-y-auto">
          {items.map((item) => (
            <CartCard key={item.id} product={item} />
          ))}
        </div>
        <div className="flex mt-2">
          <p className="text-black font-poppins p-2 text-2xl">Total :</p>
          <p className="text-black font-poppins text-2xl p-2 px-0 rounded-lg ">
            1500SR
          </p>
        </div>
        <motion.button 
        onHoverStart={() => setIsCheckoutHovered(true)}
        onHoverEnd={() => setIsCheckoutHovered(false)}
        className="text-black font-poppins border text-xl flex items-center justify-center gap-4 m-2 p-2 border-gray-500">
          <span>Checkout</span>{" "}
          <motion.span 
            animate={{ x: isCheckoutHovered ? 10 : 0 }}
          >
            <MoveRight />
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CartModal;
