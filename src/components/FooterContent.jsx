import React from "react";
import elmanzla from "../assets/elmanzla-removebg-preview.png";
import { Facebook, Instagram, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FooterContent = () => {
  const phone = "+20553097953";
  const whatsupLink = `https://wa.me/${phone}?text=Hello%2C%20I%20have%20a%20question%20about%20your%20products.`
  
  return (
    <div className=" grid grid-cols-1 grid-rows-5 h-full w-full bg-custom ">
      <div className="row-span-4 grid grid-cols-4 grid-rows-* mt-3">
        <div className="flex flex-col justify-center items-center p-4  border-opacity-30 border-accent">
          <img
            src={elmanzla}
            alt=""
            className="rounded-full w-[15rem] h-[15rem] object-cover "
          />
          <h1 className="text-5xl text-center pt-4 text-accent font-kufam  font-bold">
            ملحمة المنزلة
          </h1>
        </div>
        <div className=" border-opacity-30 border-accent p-3 overflow-hidden col-span-2 col-start-2">
          <div className=" text-4xl font-bold mb-4">About Us</div>
          <div className="section border-b-2 p-2 border-accent border-opacity-10 ">
            <h2 className="text-xl mb-2 ">Our Story</h2>
            <p className="text-[1rem] font-thin leading-5">
              At <strong>Elmanzla Meatshop</strong>, we’ve been serving the
              finest quality meats since 1995. What started as a small
              family-owned butcher shop has grown into a trusted name in the
              community. Our passion for quality and tradition drives everything
              we do.
            </p>
          </div>
          <div className="section border-b-2 p-2 border-accent border-opacity-10">
            <h2 className="text-xl mb-2 ">Our Mission</h2>
            <p className="text-[1rem] font-thin leading-5">
              Our mission is simple: to provide our customers with the freshest,
              highest-quality meats while upholding sustainable and ethical
              practices.
            </p>
          </div>
          <div className="section p-2">
            <h2 className="text-xl mb-2 ">Quality You Can Trust</h2>
            <p className="text-[1rem] font-thin leading-5">
              All our products are carefully inspected and hand-cut by our
              expert butchers to ensure the highest standards.
            </p>
          </div>
        </div>

        <div className="p-3 ">
          <div className="text-4xl font-bold mb-4">Contact Us</div>
          <button className="border border-accent w-full border-opacity-30 px-4 p-2 mb-4 rounded-md">
            <a href="tel:+1234567890" className="flex items-center justify-center gap-3">
              <Phone />
              <p className="text-[1rem] leading-5">
                <span className="font-semibold">Manager</span> : Mohammed Farag
              </p>
            </a>
          </button>
          <button className="border border-accent w-full border-opacity-30 px-4 p-2 mb-4 rounded-md">
            <a
              href={whatsupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3"
            >
              <FaWhatsapp />
              <span className="text-[1rem] leading-5 ">Contact us on WhatsApp</span>
            </a>
          </button>
        </div>
      </div>

      <div className="row-span-1 row-start-5">
        <hr className="w-full mx-auto h-0.2 bg-accent rounded-full opacity-10" />
        <div className="flex justify-center items-center space-x-4 pt-4">
          <button className=" text-accent w-10 h-10 rounded-full grid place-content-center">
            <Facebook />
          </button>

          <button className=" text-accent w-10 h-10 rounded-full grid place-content-center">
            <Instagram />
          </button>
        </div>
        <p className="text-center text-sm text-accent pt-1">
          © 2025 Elmanzla Meatshop. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default FooterContent;
