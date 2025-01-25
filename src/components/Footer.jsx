import React from "react";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <div
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="relative h-[40rem] w-full"
    >
      <div className="h-[calc(100vh+40rem)] bg-black text-white relative -top-[100vh]">
        <div className="h-[40rem] w-full top-[calc(100vh-40rem)] sticky flex justify-center items-center">
          <FooterContent />
        </div>
      </div>
    </div>
  );
};

export default Footer;
