import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Locations from "./components/Locations";
import CartModal from "./components/CartModal";
import { useStore } from "./store";
import Hero from "./components/Hero";


// TODO: center the cart modal
// TODO: Cart functionality 
//BUG: when item is removed from the cart, the itemCard itseld should close the counter
function App() {
  const { cartOpen } = useStore();
  return (
    <div className="font-mono flex flex-col items-center text-white text-3xl bg-red-800">
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
