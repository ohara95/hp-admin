import React, { useEffect, FC } from "react";
import { db } from "../../../config/firebese";
import { MenuData } from "../../../types";

type Props = {
  menuItem: string;
  state: MenuData[];
  setState: (param: MenuData[]) => void;
  item: string;
};

const MenuCatalog: FC<Props> = ({ menuItem, state, setState, item }) => {
  useEffect(() => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection(item)
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => doc.data());
        setState(menu as MenuData[]);
      });
  }, []);
  return (
    <>
      {state
        .filter((el) => el.category === menuItem)
        .map((el) => {
          return (
            <option key={el.item}>
              {el.item} ¥{el.price}
            </option>
          );
        })}
    </>
  );
};

export default MenuCatalog;
