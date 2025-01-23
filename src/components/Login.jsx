import { FormField } from "./CheckoutForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/users/login";

const schema = z.object({
  username: z.string().nonempty("username is required"),
  password: z.string().nonempty("password is required"),
});

const fields = [
  {
    type: "text",
    placeholder: "Username",
    name: "username",
    className: "col-span-6",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
    className: "col-span-6",
  },
];
const Login = () => {
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
    mutationFn: login,
    onSuccess: (data) => {
      console.log("SUCCESS From mutation", data);
    },
    onError: (error) => {
        console.log("ERROR", error);
        }
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
    //TODO: navigate to order page    
  };



  return (
    <div 
    onClick={(e) => e.stopPropagation()}
    className="w-[25%] h-fit bg-white rounded-lg flex flex-col p-7 z-50 relative">
      <div className="flex flex-col items-center h-full overflow-hidden">
        <h1 className="text-5xl font-bold text-custom mb-4">Login</h1>
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
            Login
          </button>
          <button
            type="button"
            onClick={() => console.log("Register")} //TODO: navigate to register page
            className="col-span-6 bg-secondary text-2xl  text-white p-2 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
