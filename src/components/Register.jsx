import { FormField } from "./CheckoutForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { register as registerFn } from "../api/users/register"; 

import { Key, Mail, UserRound } from "lucide-react";

const schema = z.object({
  first_name: z
    .string()
    .nonempty("this field required")
    .min(3, "name is too short")
    .max(20),
  last_name: z
    .string()
    .nonempty("this field required")
    .min(3, "name is too short")
    .max(20),
  email: z.string().nonempty("email is required").email("invalid email"),
  username: z.string().nonempty("username is required"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password is too short")
    .refine((data) => /[A-Z]/.test(data), {
      message: "password must contain at least one uppercase letter",
    })
    .refine((data) => /[a-z]/.test(data), {
      message: "password must contain at least one lowercase letter",
    })
    .refine((data) => /[0-9]/.test(data),  {
       message: "password must contain at least one number"
    }),
});

const fields = [
  {
    type: "text",
    placeholder: "First Name",
    icon: <UserRound className="size-5 stroke-black" />,
    name: "first_name",
    className: "col-span-3",
  },
  {
    type: "text",
    placeholder: "Last Name",
    icon: <UserRound className="size-5 stroke-black" />,
    name: "last_name",
    className: "col-span-3",
  },
  {
    type: "text",
    placeholder: "Username",
    icon: <UserRound className="size-5 stroke-black" />,
    name: "username",
    className: "col-span-6",
  },
  {
    type: "text",
    placeholder: "Email",
    icon: <Mail className="size-5 stroke-black"/>,
    name: "email",
    className: "col-span-6",
  },
  {
    type: "password",
    placeholder: "Password",
    icon: <Key className="size-5 stroke-black"/>,
    name: "password",
    className: "col-span-6",
  },
];

const Register = ({setLoginState ,setIsCheckoutOpen}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      setIsCheckoutOpen(false);
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      for (const key in errorData) {
        setError(key, {
          type: "manual",
          message: errorData[key][0],
        });
      }
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
    //TODO: navigate to order page
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[90%] md:w-[30%] h-fit bg-white rounded-lg flex flex-col p-7 z-50 relative"
    >
      <div className="flex flex-col items-center h-full overflow-hidden">
        <h1 className="text-5xl font-bold text-custom mb-4">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 w-full bg-white"
        >
          {fields.map((field, index) => (
            <FormField
              key={index}
              {...field}
              register={register}
              error={errors[field.name]}
            />
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="col-span-6 bg-primary text-2xl text-white p-2 rounded-md"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setLoginState(true)} //TODO: navigate to Login page
            className="col-span-6 bg-secondary text-2xl  text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
