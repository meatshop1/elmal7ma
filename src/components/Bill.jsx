import React from "react";
import { useStore } from "../store";

const Bill = () => {
  const { Total } = useStore();
  const Delivery = 20;
  return (
    <div className="flex flex-col w-full h-full text-3xl border-t-2 pl-0 border-b-2 border-gray-200 mt-2">
      <p className="text-black text-xl m-1 font-poppins mt-3">Subtotal: <span className="text-custom">{Total}SR</span></p>
      <p className="text-black text-xl m-1 font-poppins">Delivery: <span className="text-custom">{Delivery} SR</span></p>
      <p className="text-black font-semibold text-xl m-1 font-poppins mb-3">Total: <span className="text-custom">{Total + Delivery}SR</span></p>
    </div>
  );
};

export default Bill;
