import { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const Hero = () => {
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const subHeading = "Shop the best quality meat in the market";
  
  return (
    <div className="h-[95vh] relative w-full">
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
      <h1 className="font-poppins absolute text-8xl h-fit top-[5rem] left-10 w-[60%] z-10">
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
      <p className="font-poppins text-4xl font-thin absolute top-[23rem] left-12 z-10">
        {subHeading.split("").map((word, index) => (
          word === " " ? <span>&nbsp;</span> :
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: (0.01 * index) + 0.5 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </p>
      <motion.button
        onHoverStart={() => setIsCheckoutHovered(true)}
        onHoverEnd={() => setIsCheckoutHovered(false)}
        className=" font-poppins text-xl flex items-center justify-center gap-4 m-2 p-2 border w-64 absolute bottom-[2rem] right-10 z-10"
      >
        <span>Shop now</span>{" "}
        <motion.span animate={{ x: isCheckoutHovered ? 10 : 0 }}>
          <MoveRight />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Hero;
