import { useEffect, useState } from "react";
import "../utils/i18n";
import { useStore } from "../store";
import i18n from "i18next";
import { Languages, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lng, setLng } = useStore();


  const changeLanguage = (lng) => {
    setIsOpen(false);
    window.location.reload();
    setLng(lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    window.document.dir = i18n.dir();
    
  }, [lng]);

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        style={{ border: `1px solid ${isOpen ? "#fff" : "transparent"}` }}
        className={`p-1 border-1 border-primary rounded-lg flex items-center gap-1`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Languages className="size-5" />
        {isOpen ? <ChevronUp className="size-4"/> : <ChevronDown className="size-4"/>}
      </motion.button>

      {isOpen && (<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-9 ${lng == "en" ? "right-0" : "left-0"} w-24 md:w-32 bg-white text-black rounded-md overflow-hidden shadow-lg z-50`}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => changeLanguage("en")}
          className="w-full grid place-content-center p-1 text-center font-poppins text-sm md:text-xl"
        >
          English
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => changeLanguage("ar")}
          className="w-full grid place-content-center p-1 border text-center font-kufam text-sm md:text-xl"
        >
          العربية
        </motion.button>
      </motion.div>)}
    </div>
  );
};

export default LanguageDropdown;
