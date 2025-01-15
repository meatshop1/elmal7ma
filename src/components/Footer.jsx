import React from "react";

const Footer = () => {
  return (
    <div
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="relative h-[30rem] w-full"
    >
      <div className="h-[calc(100vh+30rem)] bg-black text-white relative -top-[100vh]">
        <div className="h-[30rem] w-full top-[calc(100vh-30rem)] sticky flex justify-center items-center">
          <div>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
