import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const LocationCard = ({locationSrc, address, time, phoneNum}) => {
  return (
    <div className="w-[95vw] xl:w-fit bg-custom xl:m-2 mx-auto xl:col-span-1 xl:row-span-1 p-2 rounded-lg xl:place-self-center flex items-center xl:block">
      {locationSrc}
      <div className="md:mt-3">
        <div className="text-2xl w-full m-2 mx-auto hidden bg-red xl:flex">
          <span className="mx-2 border-r pr-2 h-[5rem] flex items-center justify-center ">
            <MapPin />
          </span>
          <div className="text-xl max-w-[17rem] flex xl:block">
            <p className="text-sm md:text-lg font-kufam">{address.nearTo}</p>
            <p className="text-sm md:text-lg font-kufam">{address.street}</p>
            <p className="text-sm md:text-lg font-kufam">{address.neighborhood}</p>
          </div>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className="mx-2 border-r pr-2">
            <Clock />
          </span>
          <span className="text-sm md:text-xl max-w-[17rem]">{time}</span>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className="mx-2 border-r pr-2">
            <Phone />
          </span>
          <span className="text-sm md:text-xl">{phoneNum}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
