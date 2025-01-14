import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import CartModal from "./components/CartModal";
import { useStore } from "./store";

function App() {
  const { cartOpen } = useStore();
  return (
    <div className="font-mono flex flex-col items-center text-white text-3xl bg-slate-800">
      <Navbar />
      <AnimatePresence>{cartOpen && <CartModal />}</AnimatePresence>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
