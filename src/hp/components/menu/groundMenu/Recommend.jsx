import React, { useState, useEffect } from "react";
import { db } from "../../../../config/firebese";

const Recommend = ({ menuItem }) => {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection("recommend")
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setRecommend(menu);
      });
  }, []);

  const category = recommend.filter((el) => el.category === menuItem);
  return category.map((el) => {
    return (
      <option>
        {el.item}¥{el.amount}
      </option>
    );
  });
};

export default Recommend;
