import React from "react";
import { Select } from "../atoms";

const MiddleCategory = ({ setState, optionData }) => (
  <Select
    onChange={(e) => {
      setState(e.target.value);
    }}
  >
    {optionData.map((category) => {
      return (
        <option key={category.value} value={category.value}>
          {category.name}
        </option>
      );
    })}
  </Select>
);

export default MiddleCategory;
