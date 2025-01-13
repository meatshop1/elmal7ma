import { Trash2 } from "lucide-react";
import Counter from "./Counter";

const CartCard = ({ product }) => {
  return (
    <div className="w-full h-32 font-poppins bg-slate-900 flex gap-2 rounded-lg p-2 my-2 relative">
      <button className="w-8 h-8 hover:bg-slate-800 transition-all grid place-content-center rounded-full absolute top-2 right-2">
        <Trash2 />
      </button>
      <img
        src={product.url}
        alt={product.name}
        className="w-1/3 h-full object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col border-l-2 border-gray-700 pl-2">
        <p className="text-white text-2xl">{product.name}</p>
        <p className="text-gray-500 text-sm">{product.description}</p>
        <p className="text-white text-2xl font-light mt-auto">
          {product.price}SR
        </p>
        <Counter className="absloute bottom-2 right-2 text-xl" />
      </div>
    </div>
  );
};

export default CartCard;
