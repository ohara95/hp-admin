import React, { useState, useEffect } from "react";
import { db } from "../../../../config/firebese";

const Cuisine = ({ menuItem }) => {
  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("cuisine")
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setCuisine(menu);
      });
  }, []);

  const category = cuisine.filter((el) => el.category === menuItem);
  return category.map((el) => {
    return (
      <option>
        {el.item}¥{el.amount}
      </option>
    );
  });
};

export default Cuisine;
