import { motion, AnimatePresence, animate } from "framer-motion";
import { MoveRight, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import CartCard from "./CartCard";
import CheckoutForm from "./CheckoutForm";
import Login from "./Login";
import Register from "./Register";

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
        // <CheckoutForm
        //   setIsCheckoutOpen={setIsCheckoutOpen}
        //   onClick={(e) => e.stopPropagation()}
        //   className="w-[40%] h-[90%] bg-white rounded-lg flex flex-col p-5 z-50 relative"
        // />
        <Login />
        // <Register />
      ) : (
        <Cart setIsCheckoutOpen={setIsCheckoutOpen} />
      )}
    </motion.div>
  );
};

const Cart = ({setIsCheckoutOpen}) => {
  const { toggleCart } = useStore();
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const { cart, Total } = useStore();
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, transition: { duration: 0.1 } }}
      onClick={(e) => e.stopPropagation()}
      className="w-[40%] h-[90%] bg-accent overflow-hidden rounded-lg flex flex-col p-5 z-20 relative"
    >
      <p className="text-custom font-poppins">Your Shopping Cart</p>
      <hr className="border border-gray-200 my-2" />
      <button
        onClick={() => {
          document.body.style.overflow = "auto";
          toggleCart(false);
        }}
        className="absolute w-8 h-8 bg-red-800 grid place-content-center rounded-full top-4 right-4"
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
          className="text-primary text-9xl font-poppins flex items-center justify-center rounded-lg px-2 h-[35rem] scrollbar-hide overflow-y-auto opacity-20"
        >
          <span className="text-custom">Your cart is empty.</span>
        </motion.p>
      )}
      {cart.length ? (
        <div className="w-full flex flex-col">
          <div className="flex mt-2">
            <p className="text-custom font-poppins p-2 text-2xl">Total :</p>
            <p className="text-custom font-poppins text-2xl p-2 px-0 rounded-lg ">
              {Total}SR
            </p>
          </div>
          <motion.button
            disabled={!cart.length}
            onHoverStart={() => setIsCheckoutHovered(true)}
            onHoverEnd={() => setIsCheckoutHovered(false)}
            onClick={() => setIsCheckoutOpen(true)}
            className="text-accent  font-poppins border text-xl flex items-center justify-center gap-4 m-2 p-2 bg-custom rounded-lg"
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
          className=" rounded-lg w-fit p-5 ml-auto shadow-lg border font-poppins text-5xl flex font-light items-center justify-center"
        >
          <span className="text-custom">Add Some</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default CartModal;
