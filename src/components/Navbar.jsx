import { useState } from "react";
import LanguageDropdown from "./LanguageDropdown";

import {
  motion,
  useMotionValueEvent,
  useScroll
} from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../store";

const Navbar = () => {
  const [hide, setHide] = useState(false);
  const { toggleCart, itemsCount, lng } = useStore();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > window.innerHeight - 200 ? setHide(true) : setHide(false);
  });

  const handleCartOpen = () => {
    document.body.style.overflow = "hidden";
    toggleCart(true);
  };
  // there was overflow-hidden before language dropdown
  const classesWithoutScroll =
    "w-full h-12 flex items-center justify-between px-1 bg-red-800 z-30 fixed top-0 md:px-4 md:h-16";
  const classesWithScroll =
    `w-12 h-12 flex items-center justify-center rounded-full transition-all px-1 bg-red-800 z-30 fixed ${lng === "en" ? "right-4" : "left-4"} top-4`;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      exit={{ y: -100 }}
      className={`${hide ? classesWithScroll : classesWithoutScroll}`}
    >
      
      {!hide && (
        <p className="font-kufam font-semibold w-fit px-3 text-xl md:text-3xl">ملحمة المنزلة</p>
      )}
      <div className="z-40 flex items-center">
        {!hide && <LanguageDropdown />}
        <button
          onClick={handleCartOpen}
          className={` grid place-content-center font-kufam font-semibold px-3 relative ${
            hide ? "text-white mt-1 mr-1  w-[8rem] h-[8rem]" : "text-black"
          }`}
        >
          {itemsCount !== 0 && (
            <div className={`absolute bg-primary text-xs ${hide ? "top-10 right-11" : "-top-2 right-1"} rounded-full w-5 h-5 flex items-center justify-center`}>
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
