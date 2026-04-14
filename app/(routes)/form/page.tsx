"use client";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
type formType = {
  firstName: string;
  lastName: string;
};

//define schema
const schema = z.object({
  firstName: z.string().trim().min(1, "First Name is Required"),
  lastName: z.string().trim().min(3, "Last Name is required"),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string().trim().min(1, "Tags are required.."),
    })
  ),
});
type SchemaTypa = z.infer<typeof schema>;

const FormComponent = () => {
  //state management by react-hook-form(Less re-rendering and Controller and Uncontrolled)
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaTypa>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  //   const lastName = watch("lastName"); // for tracking the onchange of certain events

  const { fields, append, remove } = useFieldArray<SchemaTypa>({
    control,
    name: "tags",
  });

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
          {...register("lastName")}
          className="border-2 border-black"
          //   onChange={handleChange}
        />
      </div>
      {/* {errors.firstName && errors.firstName.message}
      {errors.lastName && errors.lastName.message} */}

      <div>
        {/* Add Tag Button */}
        <button
          type="button"
          onClick={() =>
            append({
              id: fields.length + 1,
              name: `Tag ${fields.length + 1}`,
            })
          }
        >
          Add Tag
        </button>

        {fields?.map((field, i) => (
          <div key={field.id}>
            <input placeholder="Enter tag" {...register(`tags.${i}.name`)} />
            <button
              type="button"
              onClick={() => remove(i)} // ✅ correct usage
            >
              x
            </button>
          </div>
        ))}
      </div>
      {errors.tags && errors.tags.message}
      <button type="submit" onClick={handleSubmit(submitForm)}>
        Submit
      </button>
    </form>
  );
};
export default FormComponent;
