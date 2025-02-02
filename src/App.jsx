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
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "./api/cart/fetchCartItems";
import { use } from "react";

// TODO: hero image takes a lot of time to load
// TODO: Checkout on submit should give a feedback to the user and if the button is clicked and the fields are empty it should show an error message
// TODO: API integration

function App() {
  const {
    cartOpen,
    lng,
    setLng,
    setOpenedCounters,
    openedCounters,
    setItemsCount,
    deleteOpenedCounter,
  } = useStore();

  // const {
  //   data: cart,
  //   isLoading,
  //   isFetched,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["cart"],
  //   queryFn: fetchCartItems,
  // });

  // if (cart) {
  //   for (let item of cart.items) {
  //     setOpenedCounters(item.product.id, item.quantity);
  //   }
  //   setItemsCount(cart.items.length);
  // }

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
