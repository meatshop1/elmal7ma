import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const LocationCard = ({locationSrc, address, time, phoneNum}) => {
  return (
    <div className="w-fit bg-custom m-2 col-span-1 row-span-1 p-2 rounded-lg place-self-center">
      {locationSrc}
      <div className="mt-3">
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className="mx-2 border-r pr-2 h-[5rem] flex items-center justify-center ">
            <MapPin />
          </span>
          <div className="text-xl max-w-[17rem]">
            <p className="text-lg font-kufam">{address.neighborhood}</p>
            <p className="text-lg font-kufam">{address.street}</p>
            <p className="text-lg font-kufam">{address.nearTo}</p>
          </div>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className="mx-2 border-r pr-2">
            <Clock />
          </span>
          <span className="text-xl max-w-[17rem]">{time}</span>
        </div>
        <div className="text-2xl w-full m-2 mx-auto flex items-center">
          <span className="mx-2 border-r pr-2">
            <Phone />
          </span>
          <span className="text-xl">{phoneNum}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
