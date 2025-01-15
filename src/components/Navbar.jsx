import { useRef, useState } from "react";

import { ShoppingCart, Search, X } from "lucide-react";
import { motion, useAnimate } from "framer-motion";
import { useStore } from "../store";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart } = useStore();
  
  const [scobe, animate] = useAnimate();
  const searchRef = useRef(null);

  const handleOpenSearch = () => {
    setSearchOpen(true);
    animate(
      "input",
      { display: "block", width: "20rem" },
      {
        duration: 0.2,
        ease: "easeInOut",
        type: "spring",
        onComplete: () => {
          searchRef.current.focus();
        },
      }
    );
    animate("#searchbtn", { rotate: 180 }, { duration: 0.2 });
  };
  const handleCloseSearch = () => {
    setSearchOpen(false);
    animate(
      "input",
      { width: "2rem", display: "none" },
      { duration: 0.3, ease: "easeInOut", stiffness: 0.5 }
    );
    animate("#searchbtn", { rotate: 0 }, { duration: 0.2 });
  };

  const handleUserInput = (e) => {
    // console.log(e.target.value);
    console.log(searchRef.current.value);
  };

  const handleCartOpen = () => {
    toggleCart(true);
    console.log("Cart Opened");
  };

  const handleCartClose = () => {
    toggleCart(false);
  };

  return (
    <motion.div
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 1 }}
      ref={scobe}
      className=" w-full h-16 flex items-center justify-between px-4 absolute top-0 bg-red-800 z-50"
    >
      <p className="font-kufam font-semibold w-fit px-3">ملحمة المنزلة</p>
      <div className="z-40">
        <motion.button id="searchbtn" onClick={handleOpenSearch}>
          {searchOpen ? <X /> : <Search />}
        </motion.button>
        <button
          onClick={handleCartOpen}
          className="font-kufam font-semibold w-fit px-3 relative"
        >
          <div className="absolute bg-slate-700 text-xs -top-2 right-1 rounded-full w-5 h-5 flex items-center justify-center">
            1
          </div>
          <ShoppingCart />
        </button>
      </div>
      <motion.input
        ref={searchRef}
        onBlur={handleCloseSearch}
        onChange={handleUserInput}
        className="focus:outline-none text-lg top-[0.9rem] overflow-hidden absolute right-[3.7rem] rounded-3xl hidden w-[2rem] h-8 bg-slate-700 px-2"
        type="text"
        placeholder="Search.."
      />
    </motion.div>
  );
};

export default Navbar;
