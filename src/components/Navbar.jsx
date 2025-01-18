import { useRef, useState, useEffect } from "react";

import { ShoppingCart, Search, X } from "lucide-react";
import {
  motion,
  useAnimate,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useStore } from "../store";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart, itemsCount } = useStore();
  const [hide, setHide] = useState(false);
  const [scobe, animate] = useAnimate();
  const searchRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > window.innerHeight - 200 ? setHide(true) : setHide(false);
  });

  const handleCartOpen = () => {
    document.body.style.overflow = "hidden";
    console.log("clicked");
    toggleCart(true);
    console.log("Cart Opened");
  };

  const classesWithoutScroll =
    "w-full h-16 flex items-center justify-between px-4 overflow-hidden bg-red-800 z-30 fixed top-0";
  const classesWithScroll =
    "w-16 bg-[#1D1616] h-16 flex items-center justify-center overflow-hidden rounded-full transition-all px-4 bg-red-800 z-30 fixed right-4 top-4";
  // if the page is scrolled down then the navbar will be only showing the cart icon
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      exit={{ y: -100 }}
      ref={scobe}
      className={`${hide ? classesWithScroll : classesWithoutScroll}`}
    >
      {!hide && (
        <p className="font-kufam font-semibold w-fit px-3">ملحمة المنزلة</p>
      )}
      <div className="z-40">
        
        <button
          onClick={handleCartOpen}
          className={` grid place-content-center font-kufam font-semibold px-3 relative ${
            hide ? "text-white mt-1 mr-1  w-[8rem] h-[8rem]" : "text-black"
          }`}
        >
          {itemsCount !== 0 && (
            <div className="absolute bg-primary text-xs top-10 right-11 rounded-full w-5 h-5 flex items-center justify-center">
              {itemsCount}
            </div>
          )}
          <ShoppingCart />
        </button>
        
      </div>
    </motion.div>
  );
};

export default Navbar;
