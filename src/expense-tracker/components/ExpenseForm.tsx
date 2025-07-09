import React, { useState } from "react";
import z from "zod";
import categories from "../Categories";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmit: (data: ExpensesFormData) => void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters" })
    .max(50, { message: "Description should be less than 50 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpensesFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpensesFormData>({ resolver: zodResolver(schema) });

  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        setIsSubmitted(true);
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        {isSubmitted && (
          <div className="alert alert-primary alert-dismissable">
            {" "}
            Submitted successfully!
          </div>
        )}
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          onChange={() => setIsSubmitted(false)}
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="categories" className="form-label">
          Categories
        </label>
        <select {...register("category")} className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <div className="mb-3">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
