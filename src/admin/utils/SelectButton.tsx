import React, { FC } from "react";
import { SwitchButton } from "../../atoms";

type Props = {
  setState: (param: string) => void;
  select: string;
};

const SelectButton: FC<Props> = ({ setState, select }) => (
  <div className="md:w-2/3">
    <div
      className="pt-8"
      onClick={(e) => {
        setState((e.target as HTMLInputElement).value);
      }}
    >
      <SwitchButton value="add" text="追加" select={select} />
      <SwitchButton value="edit" text="変更" select={select} />
      <SwitchButton value="delete" text="削除" select={select} />
    </div>
  </div>
);

export default SelectButton;
