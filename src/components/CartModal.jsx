import { motion, AnimatePresence, animate } from "framer-motion";
import { MoveRight, X } from "lucide-react";
import { useState } from "react";
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
  const { cart, Total } = useStore();

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onClick={() => {
        document.body.style.overflow = "auto";
        toggleCart(false);
      }}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 grid place-items-center z-30"
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
          onClick={() => {
            document.body.style.overflow = "auto";
            toggleCart(false);
          }}
          className="absolute w-8 h-8 bg-black grid place-content-center rounded-full -top-4 right-0"
        >
          <X />
        </button>
        {cart.length ? (
          <div className="border border-gray-200 rounded-lg px-2 h-[35rem] scrollbar-hide overflow-y-scroll">
            <AnimatePresence>
              {cart.map((item) => (
                <CartCard key={item.id} product={item} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            layout
            className="text-black text-9xl font-poppins flex items-center justify-center rounded-lg px-2 h-[35rem] scrollbar-hide overflow-y-auto opacity-20"
          >
            <span className="">Your cart is empty.</span>
          </motion.p>
        )}
        {cart.length ? (
          <div className="w-full flex flex-col">
            <div className="flex mt-2">
              <p className="text-black font-poppins p-2 text-2xl">Total :</p>
              <p className="text-black font-poppins text-2xl p-2 px-0 rounded-lg ">
                {Total}SR
              </p>
            </div>
            <motion.button
              disabled={!cart.length}
              onHoverStart={() => setIsCheckoutHovered(true)}
              onHoverEnd={() => setIsCheckoutHovered(false)}
              className="text-black font-poppins border text-xl flex items-center justify-center gap-4 m-2 p-2 border-gray-500"
            >
              <span>Checkout</span>{" "}
              <motion.span animate={{ x: isCheckoutHovered ? 10 : 0 }}>
                <MoveRight />
              </motion.span>
            </motion.button>
          </div>
        ) : (
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
          className="text-black rounded-lg w-fit p-5 ml-auto shadow-lg border font-poppins text-5xl flex font-light items-center justify-center">
            <span>Add Some</span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CartModal;
