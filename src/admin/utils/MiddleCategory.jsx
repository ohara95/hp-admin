import React from "react";
import { CustomSelect } from "../../atoms";

const MiddleCategory = ({ setState, optionData }) => (
  <CustomSelect
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
  </CustomSelect>
);

export default MiddleCategory;
