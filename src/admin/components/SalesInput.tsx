import React, { FC } from "react";
import CustomLabel from "../../atoms/CustomLabel";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";

type Props = {
  salesDate: string;
  setSalesDate: (param: string) => void;
  salesPrice: number;
  setSalesPrice: (param: number | string) => void;
};

const SalesInput: FC<Props> = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  salesDate,
}) => (
  <>
    <div className="mb-4">
      <CustomLabel text="売上日" />
      <CustomInput
        type="date"
        value={salesDate}
        onChange={(e) => setSalesDate(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <CustomLabel text="売上額" />
      <CustomInput
        type="number"
        value={salesPrice}
        onChange={(e) => {
          setSalesPrice(e.target.value);
        }}
      />
    </div>
    <div>
      <CustomButton text="計上" />
    </div>
  </>
);

export default SalesInput;
