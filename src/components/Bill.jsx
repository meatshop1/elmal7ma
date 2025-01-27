import React from "react";
import { useStore } from "../store";
import { useTranslation } from "react-i18next";

const Bill = () => {
  const { Total, lng } = useStore();
  const { t } = useTranslation();


  const Delivery = 20;
  return (
    <div className="flex flex-col w-full h-full text-3xl border-t-2 pl-0 border-b-2 border-gray-200 mt-2">
      <p className={`text-black  m-1 mt-3 ${lng === "en" ? "font-poppins text-xl" : "font-kufam text-lg"}`}>{t("Bill.subTotal")}: <span className="text-custom">{Total}SR</span></p>
      <p className={`text-black  m-1 ${lng === "en" ? "font-poppins text-xl" : "font-kufam text-lg"}`}>{t("Bill.delivery")}: <span className="text-custom">{Delivery} SR</span></p>
      <p className={`text-black font-semibold text-xl m-1 mb-3 ${lng === "en" ? "font-poppins" : "font-kufam"}`}>{t("Bill.total")}: <span className="text-custom">{Total + Delivery}SR</span></p>
    </div>
  );
};

export default Bill;
