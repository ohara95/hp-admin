import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebese";
import { BanquetData } from "../../../types";

const Banquet = () => {
  const [banquetMenu, setBanquetMenu] = useState<BanquetData[]>([]);
  useEffect(() => {
    db.collection("banquetMenu").onSnapshot((snap) => {
      const menu = snap.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setBanquetMenu(menu as BanquetData[]);
    });
  }, []);
  return (
    <>
      {banquetMenu.map((menu) => {
        return (
          <>
            <div>
              <h3 className="categoryItem">{menu.title}</h3>
              <p>
                {menu.detail
                  .split(/\s/g)
                  .reduce((cum: any, x) => [...cum, x, <br />], [])
                  .slice(0, -1)}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Banquet;
