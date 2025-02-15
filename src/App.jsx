import { AnimatePresence } from "framer-motion";
import cookies from "js-cookie";
import { useEffect } from "react";
import { getCartOrCreate } from "./api/cart/getCartOrCreate";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Locations from "./components/Locations";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { useStore } from "./store";

//TODO: you should use optimistically update the cart when adding or removing items


function App() {
  const {
    cartOpen,
    lng,
    setLng,
  } = useStore();

  useEffect(() => {
    const curLng = cookies.get("i18next");
    if (curLng === "en-US" || !curLng) {
      cookies.set("i18next", "en");
      setLng("en");
    }
    getCartOrCreate();
  }, [lng]);

  return (
    <div className="font-mono flex flex-col items-center text-white text-3xl bg-primary">
      <Navbar />
      <Hero />
      <AnimatePresence>{cartOpen && <CartModal />}</AnimatePresence>
      <Main />
      <Locations />
      <Footer />
    </div>
  );
}

export default App;
