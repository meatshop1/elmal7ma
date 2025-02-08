import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, LocateFixed, MapPinHouse, Phone, Check } from "lucide-react";
import { useState , useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import Bill from "./Bill";
import { useTranslation } from "react-i18next";
import { useStore } from "../store"
import { postAddress } from "../api/address/postAddress";
import { postOrder } from "../api/order/postOrder";
import { addPhone } from "../api/order/addPhone"
import FeedbackModal from "./FeedbackModal";

const CheckoutForm = ({ onClick, className, setIsCheckoutOpen }) => {
  const [showFeedback, setShowFeedback] = useState(null);
  const handleFeedback = (val) => {
    console.log("handle clicked")
    setShowFeedback(val);
  }
  useEffect(() => {
    if (showFeedback !== null) {
      setTimeout(() => {
        setShowFeedback(null);
        setIsCheckoutOpen(false);
      }, 3000);
    }
  }, [showFeedback]);
  return (
    <motion.div
      initial={{ opacity: 0 }} // initial animation
      animate={{ opacity: 1 }} // animate to this state
      exit={{ opacity: 0 }} // exit animation
      layout
      onClick={onClick}
      className={className}
    >
      {showFeedback === null && <Form handleFeedback={handleFeedback} setIsCheckoutOpen={setIsCheckoutOpen} />}
      {showFeedback !== null && <FeedbackModal
        type={"success"}
        logo={<Check />}
        onClick={handleFeedback}
      />}
    </motion.div>
  );
};



export const FormField = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  icon
}) => {
  const { lng } = useStore();
  return (
  <div className={twMerge("w-[98%] flex flex-col mb-2 h-16 relative", className)}>
    <span className={`text-black text-lg ${lng === "en" ? "font-poppins" : "font-kufam"}`}>{placeholder}</span>
    <input
      type={type}
      placeholder={placeholder}
      className={`p-1 text-sm border-2 border-black text-black relative ${lng === "en" ? "pl-8 font-poppins" : "pr-8 font-kufam"}`}
      {...register(name, { valueAsNumber })}
    />
    <span className={`absolute ${lng == "en" ? "left-2  bottom-[0.55rem]" : "right-2 bottom-3"}`}>{icon}</span>
    <div className="text-red-800 font-poppins h-4 flex items-center justify-start">
      {error && (
        <span className="error-message h-full text-xs text-primary">
          {error.message}
        </span>
      )}
    </div>
  </div>
)};

function Form({ handleFeedback, setIsCheckoutOpen }) {
  const [isCurrentLocationChecked, setIsCurrentLocationChecked] =
    useState(false);
  const { t } = useTranslation();
  const [location, setLocation] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const Fields = [
    [
      {
        type: "text",
        placeholder: t("Checkout.phone"),
        icon: <Phone className="size-5 stroke-black"/>,
        name: "phone",
        className: "col-span-8",
      },
    ],
    [
      {
        type: "text",
        placeholder: t("Checkout.neighborhood"),
        icon: <MapPinHouse className="size-5 stroke-black" />,
        name: "neighborhood",
        className: "col-span-10",
      },
      {
        type: "text",
        placeholder: t("Checkout.firstStreet"),
        icon: <MapPinHouse className="size-5 stroke-black" />,
        name: "first_street",
        className: "col-span-10",
      },
      {
        type: "text",
        placeholder: t("Checkout.secondStreet"),
        icon: <MapPinHouse className="size-5 stroke-black" />,
        name: "second_street",
        className: "col-span-10",
      },
    ],
  ];


  const schema = z
    .object({
      phone: z
        .string()
        .nonempty(t("PhoneErrors.required"))
        .length(10, t("PhoneErrors.invalid")),
      neighborhood: z.string().max(50),
      first_street: z.string().max(50),
      second_street: z.string().max(50),
    })
    .refine(
      (data) =>
        isCurrentLocationChecked ||
        (data.neighborhood && data.first_street && data.second_street), // At least one field must be present
      {
        message: t("PersonalInfoErrors.noLocationSelected"), // Custom error message
        path: ["second_street"], // Attach the error to a specific field
      }
    ).refine(
      data => data.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
      {
        message: t("PhoneErrors.invalid"),
      }
    )

  const [href, setHref] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid, isLoading },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { lng } = useStore();

  const onSubmit = async (data) => {
    const response = await postAddress({...data, ...location });
    const orderResponse = await postOrder();
    const phoneResponse = await addPhone(data.phone);
    console.log(response, orderResponse, phoneResponse); 
    if (response && orderResponse && phoneResponse) {
      handleFeedback(true);
    }else {
      handleFeedback(false);
    }
      
    reset();
  };

  const getLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    setHref(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    );
  };

  const handleLocationError = () => {
    console.log("Error getting location");
  };

  const handleCurrentLocation = () => {
    setIsCurrentLocationChecked((prev) => !prev);
    setHref(null);
    if (isCurrentLocationChecked) return;
    navigator.geolocation.getCurrentPosition(getLocation, handleLocationError);
  };


  return (
    <div className="h-full gap-2 overflow-auto scrollbar-hide  ">
      <button
        onClick={() => setIsCheckoutOpen((prev) => !prev)}
        className="absolute w-10 h-10 rounded-full bg-black grid place-content-center -top-4 -left-4"
      >
        <ArrowLeft />
      </button>
      <form className="h-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className={` font-semibold mb-4 text-black border-b-2 pb-2 ${lng === "en" ? "font-poppins text-3xl" : "font-kufam text-2xl"}`}>
          {t("Checkout.title")}
        </h1>
        <div className="flex flex-col h-[100%] mb-2">
          <div className="grid grid-cols-8">
            {Fields[0].map((field) => (
              <FormField
                key={field.name}
                register={register}
                error={errors[field.name]}
                {...field}
              />
            ))}
          </div>
          <div className="grid gap-y-2 grid-cols-10">
            {Fields[1].map((field) => (
              <FormField
                key={field.name}
                register={register}
                error={errors[field.name]}
                {...field}
              />
            ))}
           
          </div>
          <div className="flex w-full items-center gap-4 mt-2">
            <input
              type="checkbox"
              checked={isCurrentLocationChecked}
              onChange={handleCurrentLocation}
              className="h-5 w-5"
            />
            <label className="flex items-center gap-2">
              <span className={`text-custom text-lg ${lng === "en" ? "font-poppins" : "font-kufam text-sm font-semibold" }`}>{t("Checkout.useCurrentLocation")}</span>
              <LocateFixed className="size-5 stroke-black" />
            </label>
          </div>
        </div>
        <Bill />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button text-black mt-auto border disabled:opacity-50 border-black ${lng === "en" ? "font-poppins" : "font-kufam text-xl leading-10 font-semibold" }`}
        >
          {isLoading ? <Loader /> : t("Checkout.submit")}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
