import React from "react";
import categories from "../Categories";
interface Props {
  onSelected: (category: string) => void;
}
const ExpenseFilter = ({ onSelected }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelected(event.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
