import { motion } from "framer-motion";

import { useState } from "react";
import { verify } from "../api/users/verify";
import { useStore } from "../store";
import CartContent from "./CartContent";
import CheckoutForm from "./CheckoutForm";
import SignModal from "./SignModal";

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
  const { toggleCart, cartOpen } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onClick={() => {
        document.body.style.overflow = "auto";
        toggleCart(false);
      }}
      style={{ pointerEvents: cartOpen ? "auto" : "none" }}
      className="fixed top-0 left-0 w-full h-full bg-custom bg-opacity-50 grid place-items-center z-30"
    >
      {isCheckoutOpen ? (
        token && verify(token)) ? (
        <CheckoutForm
          setIsCheckoutOpen={setIsCheckoutOpen}
          onClick={(e) => e.stopPropagation()}
          className="w-[40%] h-[90%] bg-white rounded-lg flex flex-col p-5 z-50 relative"
        /> ) : (
        <SignModal setIsCheckoutOpen={setIsCheckoutOpen} />
      ) : (
        <CartContent setIsCheckoutOpen={setIsCheckoutOpen} />
      )}
    </motion.div>
  );
};


export default CartModal;
