import { AnimatePresence } from "framer-motion";
import { postAddress } from "./api/order/postAddress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Locations from "./components/Locations";
import CartModal from "./components/CartModal";
import { useStore } from "./store";
import Hero from "./components/Hero";

// TODO: hero image takes a lot of time to load
// TODO: add a loading spinner
// TODO: Checkout on submit should give a feedback to the user and if the button is clicked and the fields are empty it should show an error message
// TODO: Responsive design
// TODO: API integration

// CheckoutForm must be protected by a route

function App() {
  const { cartOpen } = useStore();
  postAddress({
    neighborhood: "",
    first_street: "",
    second_street: "",
    longitude: 0,
    latitude: 0,
  })
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
