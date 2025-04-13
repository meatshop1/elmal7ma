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
import { loadConfig } from "./api/config";

//TODO: you should use optimistically update the cart when adding or removing items
//TODO: you should switch the modal open animation depending on the device refresh rate cause it's laggy on 60hz screens
//TODO: Mixed content error on the backend when trying to fetch 
//TODO: Mixed content error when trying to fetch the images from the s3 bucket

function App() {
  const {
    cartOpen,
    lng,
    setLng,
  } = useStore();

  // Load the config file
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        await loadConfig();
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };
    fetchConfig();
  }, []);

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
