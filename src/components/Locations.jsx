import React from "react";
import LocationCard from "./LocationCard";
import { useTranslation } from "react-i18next";
import { useStore } from "../store"

const locations = [
  {
    name: "BGC",
    address: {
      neighborhood: "حي الصفا",
      street: "شارع الشربتلي",
      nearTo: "بجوار جمعية نفع الخيرية",
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.5144843650011!2d39.2156240305102!3d21.58366144583185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d12e7b7fda29%3A0x54a999ec4741eba7!2z2YXZhNit2YXYqSDYp9mE2YXZhtiy2YTYqQ!5e0!3m2!1sar!2seg!4v1736881570369!5m2!1sar!2seg"
        // style={{ width: "20rem", height: "20rem" }}
        className="xl:w-[20rem] xl:h-[20rem] w-1/3 h-[8rem]"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    id: "1"
  },
  {
    name: "Makati",
    address: {
      neighborhood: "حي الفيصلية",
      street: "شارع المعهد الصناعي",
      nearTo: "خلف مستشفى عرفان",
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d532.7469623114117!2d39.179431324915825!3d21.575579980314338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1737113254639!5m2!1sar!2seg"
        // style={{ width: "20rem", height: "20rem" }}
        className="xl:w-[20rem] xl:h-[20rem] w-1/3 h-[7rem]"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    id: "2"
  },
  {
    name: "Ortigas",
    address: {
      neighborhood: "حي البوادي",
      street: "شارع ابو الحسن الهمذاني",
      nearTo: "أمام مدرسة الحكماء العالمية",
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d532.6676599555966!2d39.17058849607014!3d21.59713785784452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d093fd1d6f25%3A0xf79ce408206b58ce!2z2KfYqNmIINin2YTYrdiz2YYg2KfZhNmH2YXYsNin2YbZitiMINin2YTYqNmI2KfYr9mK2Iwg2KzYr9ipIDIzNDQz2Iwg2KfZhNiz2LnZiNiv2YrYqQ!5e0!3m2!1sar!2seg!4v1737113393990!5m2!1sar!2seg"
        // style={{ width: "20rem", height: "20rem" }}
        className="xl:w-[20rem] xl:h-[20rem] w-1/3 h-[7rem]"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    id: "3"
  },
];

const Locations = () => {
  return (
    <div
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="relative h-[45rem] w-full"
    >
      <div className="h-[calc(100vh+45rem)] bg-black text-white relative -top-[calc(100vh)]">
        <div className="h-[45rem] w-full top-[calc(100vh-45rem)] sticky flex justify-center items-center">
          <LocationContent />
        </div>
      </div>
    </div>
  );
};

const LocationContent = () => {
  const { t } = useTranslation();
  const { lng } = useStore()
  return (
    <div className="bg-secondary w-full py-5 pb-10 h-[45rem]">
      <h1 className={`text-6xl text-center my-8 ${lng === "en" ? "font-poppins" : "font-kufam"} w-full`}>
        {t("Locations.title")}
      </h1>
      <div className=" xl:grid xl:grid-rows-* xl:grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] xl:w-[70%] m-auto flex flex-col gap-4">
        {locations.map((location) => (
          <LocationCard
            key={location.name}
            locationSrc={location.location}
            id={location.id}
            address={location.address}
          />
        ))}
      </div>
    </div>
  );
};

export default Locations;
