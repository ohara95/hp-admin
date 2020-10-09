import React, { useEffect, useState } from "react";
import { db } from "../../../../config/firebese";

const Drink = ({ drinkItem }) => {
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("drink")
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setDrink(menu);
      });
  }, []);

  const category = drink.filter((el) => el.category === drinkItem);
  return category.map((el) => {
    return (
      <option>
        {el.item}¥{el.amount}
      </option>
    );
  });
};

export default Drink;
