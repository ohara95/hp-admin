import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { db } from "../../config/firebese";

//画像
import store from "../../assets/img/inStore.jpg";
import counter from "../../assets/img/counter.jpg";
import takokara from "../../assets/img/takokara.jpeg";
import beel from "../../assets/img/beel.jpeg";
import sarada from "../../assets/img/images.jpeg";

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  // const { dbMenu } = useContext(AuthContext);
  // const snack = () => {
  //   return dbMenu.map((cuisine) => {
  //     return <p>{cuisine.item}</p>;
  //   });
  // };
  let category = "";
  let categoryId = "";
  let collectionName = "";
  const choose = (item, itemDetail) => {
    switch (item) {
      case "cuisine":
        category = "cuisine";
        categoryId = "HcRIBsb7BXCTB27kZ4Nz";
        switch (itemDetail) {
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
          default:
        }
        break;
      case "drink":
        category = "drink";
        categoryId = "nI1ZsGE1mZEDquwrXRew";
        switch (itemDetail) {
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
        switch (itemDetail) {
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
  };

  useEffect(() => {
    console.log(category);
    db.collection("menu")
      .doc("ya3NEbDICuOTwfUWcHQs")
      .collection(category)
      .doc(categoryId)
      .collection(collectionName)
      .onSnapshot((snap) => {
        const menu = snap.docs.map((doc) => {
          return doc.data();
        });
        setMenu(menu);
      });
  }, []);

  choose("drink", "beer");
  console.log(menu);

  return (
    <>
      <div style={{ width: "100%" }}>
        <img src={store} style={{ width: "50%", height: 400 }} />
        <img src={counter} style={{ width: "50%", height: 415 }} />
      </div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        ホームへ
      </button>
      <h1>メニュー</h1>
      <h2>グランドメニュー</h2>
      <h3>おつまみ</h3>
      <img src={takokara} />
      <img src={sarada} />
      <h2>ドリンク</h2>
      <img src={beel} />
      <h2>宴会コース</h2>
    </>
  );
};

export default Menu;
