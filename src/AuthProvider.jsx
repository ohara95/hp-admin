import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebese";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbMenu, setDbMenu] = useState([]);
  const [selectCuisine, setSelectCuisine] = useState("snack");
  const [selectDrink, setSelectDrink] = useState("beer");
  const [selectRecommend, setSelectRecommend] = useState("cuisine");
  const [selectClassifying, setSelectClassifying] = useState("cuisine");

  useEffect(() => {
    // 現在ログインしているユーザーを取得
    // ユーザーの切替を監視
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  /** メニュー取得*/
  useEffect(() => {
    let category = "";
    let categoryId = "";
    let collectionName = "";

    switch (selectClassifying) {
      case "cuisine":
        category = "cuisine";
        categoryId = "HcRIBsb7BXCTB27kZ4Nz";
        switch (selectCuisine) {
          case "snack":
            collectionName = "snack";
            break;
          case "salad":
            collectionName = "salad";
            break;
          case "grill":
            collectionName = "grill";
            break;
          case "fried":
            collectionName = "fried";
            break;
          case "main":
            collectionName = "main";
            break;
          case "dessert":
            collectionName = "dessert";
            break;
          default:
        }
        break;
      case "drink":
        category = "drink";
        categoryId = "nI1ZsGE1mZEDquwrXRew";
        switch (selectDrink) {
          case "beer":
            collectionName = "beer";
            break;
          case "sour":
            collectionName = "sour";
            break;
          case "whisky":
            collectionName = "whisky";
            break;
          case "shochu":
            collectionName = "shochu";
            break;
          case "cocktail":
            collectionName = "cocktail";
            break;
          case "wine":
            collectionName = "wine";
            break;
          case "non-al":
            collectionName = "non-al";
            break;
          default:
        }
        break;
      case "recommend":
        category = "recommend";
        categoryId = "W0sxjPHcXrJ2iP3huqua";
        switch (selectRecommend) {
          case "cuisine":
            collectionName = "cuisine";
            break;
          case "drink":
            collectionName = "drink";
            break;
          default:
        }
        break;
      default:
    }

    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection(category)
      .doc(categoryId)
      .collection(collectionName)
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setDbMenu(menu);
      });
  }, [selectCuisine, selectDrink, selectRecommend, selectClassifying]);

  return (
    <AuthContext.Provider
      value={{
        user,
        dbMenu,
        selectCuisine,
        setSelectCuisine,
        selectDrink,
        setSelectDrink,
        selectRecommend,
        setSelectRecommend,
        selectClassifying,
        setSelectClassifying,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
