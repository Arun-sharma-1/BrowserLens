"use client";
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type formType = {
  firstName: string;
  lastName: string;
};
const FormComponent = () => {
  //state management by react-hook-form(Less re-rendering and Controller and Uncontrolled)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>();
  const lastName = watch("lastName"); // for tracking the onchange of certain events

  // console.log("Lastname ", lastName)
  //state management by useState(reduntant method because of component re-rendering on each event , CONTROLLED)

  //   const [formState, setFormState] = useState({
  //     firstName: "",
  //     lastName: "",
  //   });
  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;

  //     setFormState((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };
  const submitForm = (data: formType) => {
    console.log("Form State : ", data, errors);
  };
  return (
    <form className="p-10 flex flex-col gap-5">
      <div>
        <label htmlFor="firstName">FirstName: </label>
        <input
          type="text"
          id="firstName"
          //   name="firstName"
          className="border-2 border-black"
          //   onChange={handleChange}
          {...register("firstName")}
        />
      </div>

      <div>
        <label htmlFor="lastName">LastName: </label>
        <input
          type="text"
          id="lastName"
          //   name="lastName"
          {...register("lastName", {
            required: "Last Name is also required.....",
          })}
          className="border-2 border-black"
          //   onChange={handleChange}
        />
      </div>
      {errors.lastName && errors.lastName.message}
      <div onClick={handleSubmit(submitForm)}>Submit</div>
    </form>
  );
};
export default FormComponent;
