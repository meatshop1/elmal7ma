import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Locations from "./components/Locations";
import CartModal from "./components/CartModal";
import { useStore } from "./store";
import Hero from "./components/Hero";



// TODO: color scheme
// TODO: footer fill

function App() {
  const { cartOpen } = useStore();
  return (
    <div 
    className="font-mono flex flex-col items-center text-white text-3xl bg-primary">
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
