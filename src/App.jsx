import { AnimatePresence } from "framer-motion";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Locations from "./components/Locations";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { useStore } from "./store";
import { useEffect } from "react";
import cookies from "js-cookie";
import { getCartOrCreate } from "./api/cart/getCartOrCreate";
import { convertEnglishToArabic } from "./utils/helpers";

// TODO: hero image takes a lot of time to load
// TODO: Checkout on submit should give a feedback to the user and if the button is clicked and the fields are empty it should show an error message
// TODO: API integration

console.log(convertEnglishToArabic(1234567890)); // ١٢٣٤٥٦٧٨٩٠

function App() {
  const { cartOpen, lng, setLng } = useStore();

  useEffect(() => {
    const curLng = cookies.get("i18next")
    if(curLng === "en-US" || !curLng) {
      cookies.set("i18next", "en")
      setLng("en")
    }
    getCartOrCreate()
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
