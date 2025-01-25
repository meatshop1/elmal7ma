import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import elmanzla from "../assets/elmanzla-removebg-preview.png";

const Hero = () => {
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const subHeading = "the best quality meat in the market";

  return (
    <div className="h-[100vh] relative w-full overflow-hidden">
      <img
        src="https://www.woodwardmeats.com/static/img/steak-feature/woodward-meats-steak-feature-600x450.cda43ce454b3.jpg"
        alt=""
        className="w-full h-full object-cover 0"
      />
      <div
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
        className="absolute w-full h-full bg-black opacity-50 "
      ></div>
      <div className="absolute z-10 top-[4rem] pl-5 flex flex-col gap-3 md:top-[6rem] md:pl-10 lg:top-[6rem]">
        <h1 className="font-poppins text-5xl h-fit w-[60%] z-10 md:text-7xl lg:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Freshness You Can Taste
          </motion.span>
          ,
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {" "}
            Quality You Can Trust
          </motion.span>
        </h1>
        <p className="font-poppins text-lg font-thin z-10 md:text-2xl lg:text-3xl">
          {subHeading.split("").map((word, index) =>
            word === " " ? (
              <span key={index}>&nbsp;</span>
            ) : (
              <motion.span
                key={word + index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.01 * index + 0.5 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            )
          )}
        </p>
      </div>
      <motion.button
        onHoverStart={() => setIsCheckoutHovered(true)}
        onHoverEnd={() => setIsCheckoutHovered(false)}
        initial={{ opacity: 0, y: 200, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.2, delay: 0.8 }}
        className=" font-poppins text-sm flex flex-col items-center rounded-full justify-center h-24 w-24 gap-1 m-2 p-2 border absolute bottom-[1rem] left-1/2 transition -translate-x-[50%] z-10 md:text-lg lg:text-xl md:h-28 md:w-28 md:bottom-1 lg:h-32 lg:w-32"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="mt-2">Shop now</span>{" "}
        <motion.span
          initial={{ y: 0 }}
          animate={{ y: isCheckoutHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown />
        </motion.span>
      </motion.button>

      <motion.img
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
        src={elmanzla}
        className="w-[5rem] h-[5rem] absolute top-24 object-cover border-red-800 rounded-full right-5 z-10 md:w-[8rem] md:h-[8rem] md:top-28 md:right-10 lg:w-[12rem] lg:h-[12rem] lg:top-32 lg:right-20"
      />
    </div>
  );
};

export default Hero;
