import React from "react";
import { useStore } from "../store";
import { useTranslation } from "react-i18next";

const Bill = () => {
  const { Total } = useStore();
  const { t } = useTranslation();

  const Delivery = 20;
  return (
    <div className="flex flex-col w-full h-full text-3xl border-t-2 pl-0 border-b-2 border-gray-200 mt-2">
      <p className="text-black text-xl m-1 font-poppins mt-3">{t("Bill.subTotal")}: <span className="text-custom">{Total}SR</span></p>
      <p className="text-black text-xl m-1 font-poppins">{t("Bill.delivery")}: <span className="text-custom">{Delivery} SR</span></p>
      <p className="text-black font-semibold text-xl m-1 font-poppins mb-3">{t("Bill.total")}: <span className="text-custom">{Total + Delivery}SR</span></p>
    </div>
  );
};

export default Bill;
