import React from "react";
import LocationCard from "./LocationCard";

const locations = [
  {
    name: "BGC",
    address: {
      neighborhood: "حي الصفا",
      street: "شارع الشربتلي",
      nearTo: "بجوار جمعية نفع الخيرية"
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.5144843650011!2d39.2156240305102!3d21.58366144583185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d12e7b7fda29%3A0x54a999ec4741eba7!2z2YXZhNit2YXYqSDYp9mE2YXZhtiy2YTYqQ!5e0!3m2!1sar!2seg!4v1736881570369!5m2!1sar!2seg"
        style={{ width: "20rem", height: "20rem" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    hours: "8:00AM - 8:00PM",
    contact: "0501799400",
  },
  {
    name: "Makati",
    address: {
      neighborhood: "حي الفيصلية",
      street: "شارع المعهد الصناعي",
      nearTo: "خلف مستشفى عرفان"
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.5144843650011!2d39.2156240305102!3d21.58366144583185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d12e7b7fda29%3A0x54a999ec4741eba7!2z2YXZhNit2YXYqSDYp9mE2YXZhtiy2YTYqQ!5e0!3m2!1sar!2seg!4v1736881570369!5m2!1sar!2seg"
        style={{ width: "20rem", height: "20rem" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    hours: "8:00AM - 8:00PM",
    contact: "0555327319",
  },
  {
    name: "Ortigas",
    address: {
      neighborhood: "حي البوادي",
      street: "شارع ابو الحسن الهمزاني",
      nearTo: "أمام مدرسة الحكماء العالمية"
    },
    location: (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.5144843650011!2d39.2156240305102!3d21.58366144583185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d12e7b7fda29%3A0x54a999ec4741eba7!2z2YXZhNit2YXYqSDYp9mE2YXZhtiy2YTYqQ!5e0!3m2!1sar!2seg!4v1736881570369!5m2!1sar!2seg"
        style={{ width: "20rem", height: "20rem" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    ),
    hours: "8:00AM - 8:00PM",
    contact: "0555096163",
  },
];

const Locations = () => {
  return (
    <div className="bg-yellow-100 w-full py-5 pb-10">
      <h1 className="text-4xl text-center my-8 font-poppins">Our Locations</h1>
      <div className=" grid grid-rows-* grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] w-[80%] m-auto">
        {locations.map((location) => (
          <LocationCard locationSrc={location.location} address={location.address} time={location.hours} phoneNum={location.contact} />
        ))}
      </div>
    </div>
  );
};

export default Locations;
