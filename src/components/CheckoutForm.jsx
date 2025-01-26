import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, LocateFixed, MapPinHouse, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import Bill from "./Bill";

const CheckoutForm = ({ onClick, className, setIsCheckoutOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // initial animation
      animate={{ opacity: 1 }} // animate to this state
      exit={{ opacity: 0 }} // exit animation
      layout
      onClick={onClick}
      className={className}
    >
      <Form setIsCheckoutOpen={setIsCheckoutOpen} />
    </motion.div>
  );
};

const Fields = [
  [
    {
      type: "text",
      placeholder: "Phone",
      icon: <Phone className="size-5 stroke-black"/>,
      name: "phone",
      className: "col-span-8",
    },
  ],
  [
    {
      type: "text",
      placeholder: "District",
      icon: <MapPinHouse className="size-5 stroke-black" />,
      name: "neighborhood",
      className: "col-span-10",
    },
    {
      type: "text",
      placeholder: "Street 1",
      icon: <MapPinHouse className="size-5 stroke-black" />,
      name: "first_street",
      className: "col-span-10",
    },
    {
      type: "text",
      placeholder: "Street 2",
      icon: <MapPinHouse className="size-5 stroke-black" />,
      name: "second_street",
      className: "col-span-10",
    },
  ],
];

export const FormField = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  icon
}) => (
  <div className={twMerge("w-[98%] flex flex-col mb-2 h-16 relative", className)}>
    <span className="text-black font-poppins text-lg">{placeholder}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="p-1 text-sm border-2 pl-8 border-black text-black font-poppins relative"
      {...register(name, { valueAsNumber })}
    />
    <span className="absolute left-2 bottom-[0.55rem]">{icon}</span>
    <div className="text-red-800 font-poppins h-4 flex items-center justify-start">
      {error && (
        <span className="error-message h-full text-xs text-primary">
          {error.message}
        </span>
      )}
    </div>
  </div>
);

function Form({ setIsCheckoutOpen }) {
  const [isCurrentLocationChecked, setIsCurrentLocationChecked] =
    useState(false);
  const schema = z
    .object({
      phone: z
        .string()
        .nonempty("this field required")
        .length(11, "invalid phone number"),
      neighborhood: z.string().max(50),
      first_street: z.string().max(50),
      second_street: z.string().max(50),
    })
    .refine(
      (data) =>
        isCurrentLocationChecked ||
        (data.neighborhood && data.first_street && data.second_street), // At least one field must be present
      {
        message: "Either location or current location is required", // Custom error message
        path: ["second_street"], // Attach the error to a specific field
      }
    ).refine(
      data => data.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
      {
        message: "Invalid phone number",
      }
    )

  const [href, setHref] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("SUBMITTING", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("SUCCESS", data);
    reset();
  };

  const getLocation = (position) => {
    const { latitude, longitude } = position.coords;
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
        <h1 className="text-3xl font-semibold mb-4 text-black border-b-2 font-poppins pb-2">
          Checkout
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
              <span className="text-custom text-lg ">Use Current Location</span>
              <LocateFixed className="size-5 stroke-black" />
            </label>
          </div>
        </div>
        <Bill />
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button text-black font-poppins mt-auto border disabled:opacity-50 border-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
