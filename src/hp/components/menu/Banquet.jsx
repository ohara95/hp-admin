import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebese";

const Banquet = () => {
  const [banquetMenu, setBanquetMenu] = useState([]);

  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setBanquetMenu(data);
    });
  }, []);

  return banquetMenu.map((menu) => {
    return (
      <>
        <div>
          <h3 className="categoryItem">{menu.title}</h3>
          <p>{menu.detail}</p>
        </div>
      </>
    );
  });
};

export default Banquet;
