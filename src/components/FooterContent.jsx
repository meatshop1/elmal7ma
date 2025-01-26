import { useState } from "react";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import elmanzla from "../assets/elmanzla-removebg-preview.png";
import { Facebook, Instagram, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FooterContent = () => {
  const phone = import.meta.env.VITE_PHONE_NUMBER;
  const whatsupNumber = import.meta.env.VITE_WHATSUP_NUMBER;
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
  const whatsupLink = `https://wa.me/${whatsupNumber}?text=Hello%2C%20I%20have%20a%20question%20about%20your%20products.`;

  const tabs = ["Our Story", "Our Mission", "Quality You Can Trust"];
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const toggleTab = (index) =>
    activeTabIndex === index
      ? setActiveTabIndex(null)
      : setActiveTabIndex(index);

  const variants = {
    clicked: {
      scale: 0.9,
      rotate: 360,
      transition: {
        duration: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="lg:grid lg:grid-cols-1 lg:grid-rows-5 h-full w-full bg-custom overflow-x-hidden flex flex-col items-center justify-center">
      <div className="lg:row-span-4 lg:grid lg:grid-cols-4 lg:grid-rows-* lg:mt-3">
        <div className="flex flex-col justify-center items-center p-4  border-opacity-30 border-accent">
          <img
            src={elmanzla}
            alt=""
            className="rounded-full xl:w-[15rem] xl:h-[15rem] object-cover w-20 h-20 lg:mt-0"
          />
          <h1 className="text-lg xl:text-5xl text-center pt-4 text-accent font-kufam font-bold">
            ملحمة المنزلة
          </h1>
        </div>
        <AnimatePresence>
          <div className=" border-opacity-30 border-accent p-3 overflow-hidden col-span-2 col-start-2 h-64 lg:h-72">
            <div className="text-xl lg:text-4xl font-bold lg:mb-4">
              About Us
            </div>
            <div className="section border-b-2 p-2 border-accent border-opacity-10 relative">
              <h2 className="text-lg lg:text-xl lg:mb-2 ">Our Story</h2>
              <motion.button
                variants={variants}
                whileTap={"clicked"}
                className="absolute right-2 top-2"
                onClick={() => toggleTab(0)}
              >
                {activeTabIndex !== 0 ? <CircleArrowDown /> : <CircleArrowUp />}
              </motion.button>
              <AnimatePresence>
                {activeTabIndex === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    layout
                    key={0}
                    className="text-xs lg:text-[1rem] font-thin lg:leading-5"
                  >
                    At <strong>Elmanzla Meatshop</strong>, we’ve been serving
                    the finest quality meats since 1995. What started as a small
                    family-owned butcher shop has grown into a trusted name in
                    the community. Our passion for quality and tradition drives
                    everything we do.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="section border-b-2 p-2 border-accent border-opacity-10 relative">
              <h2 className="text-lg lg:text-xl lg:mb-2">Our Mission</h2>
              <motion.button
                variants={variants}
                whileTap={"clicked"}
                className="absolute right-2 top-2"
                onClick={() => toggleTab(1)}
              >
                {activeTabIndex !== 1 ? <CircleArrowDown /> : <CircleArrowUp />}
              </motion.button>
              <AnimatePresence>
                {activeTabIndex == 1 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    layout
                    key={1}
                    className="text-xs lg:text-[1rem] font-thin lg:leading-5"
                    
                  >
                    Our mission is simple: to provide our customers with the
                    freshest, highest-quality meats while upholding sustainable
                    and ethical practices.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="section p-2 relative">
              <h2 className="text-lg lg:text-xl lg:mb-2 ">
                Quality You Can Trust
              </h2>
              <motion.button
                variants={variants}
                whileTap={"clicked"}
                className="absolute right-2 top-2"
                onClick={() => toggleTab(2)}
              >
                {activeTabIndex !== 2 ? <CircleArrowDown /> : <CircleArrowUp />}
              </motion.button>
              <AnimatePresence>
                {activeTabIndex === 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    layout
                    key={2}
                    className="text-xs lg:text-[1rem] font-thin lg:leading-5"
                  >
                    All our products are carefully inspected and hand-cut by our
                    expert butchers to ensure the highest standards.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatePresence>

        <div className="p-3 ">
          <div className="text-xl lg:text-4xl font-bold lg:mb-4 mb-2">
            Contact Us
          </div>
          <button className="border border-accent w-full border-opacity-30 px-4 p-2 lg:mb-4 mb-2 rounded-md">
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center gap-3"
            >
              <Phone className="size-5 lg:size-7" />
              <p className="text-sm lg:text-[1rem] lg:leading-5">
                <span className="font-semibold">Manager</span> : Mohammed Farag
              </p>
            </a>
          </button>
          <button className="border border-accent w-full border-opacity-30 px-4 p-2 lg:mb-4 rounded-md">
            <a
              href={whatsupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3"
            >
              <FaWhatsapp className="size-5 lg:size-7" />
              <span className="text-sm lg:text-[1rem] lg:leading-5 ">
                Contact us on WhatsApp
              </span>
            </a>
          </button>
        </div>
      </div>

      <div className="lg:row-span-1 lg:row-start-5">
        <hr className="w-full mx-auto h-0.2 bg-accent rounded-full opacity-10" />
        <div className="flex justify-center items-center space-x-4 mt-1 lg:pt-4">
          <button 
          onClick={() => window.open(facebookUrl, "_blank")}
          className=" text-accent w-10 h-10 rounded-full grid place-content-center">
            <Facebook />
          </button>

          <button 
          onClick={() => window.open(instagramUrl, "_blank")}
          className=" text-accent w-10 h-10 rounded-full grid place-content-center">
            <Instagram />
          </button>
        </div>
        <p className="text-center text-xs text-accent pt-1 pb-2">
          © 2025 Elmanzla Meatshop. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default FooterContent;
