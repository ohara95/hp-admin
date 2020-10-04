import React, { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebese";

//画像
import store from "../../assets/img/inStore.jpg";
import counter from "../../assets/img/counter.jpg";
import takokara from "../../assets/img/takokara.jpeg";
import beel from "../../assets/img/beel.jpeg";
import sarada from "../../assets/img/images.jpeg";

const Menu = ({ history, selectItem }) => {
  const [cuisine, setCuisine] = useState([]);
  const [drink, setDrink] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [banquetMenu, setBanquetMenu] = useState([]);

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

  const banquet = () => {
    return banquetMenu.map((menu) => {
      return (
        <>
          <div>
            <h3>・{menu.title}</h3>
            <p>{menu.detail}</p>
            <p>{menu.price}円</p>
          </div>
        </>
      );
    });
  };

  const cuisineMenu = (item) => {
    const category = cuisine.filter((el) => el.category === item);
    return category.map((el) => {
      return (
        <option>
          {el.item}¥{el.amount}
        </option>
      );
    });
  };

  const drinkMenu = (item) => {
    const category = drink.filter((el) => el.category === item);
    return category.map((el) => {
      return (
        <option>
          {el.item}¥{el.amount}
        </option>
      );
    });
  };

  const recommendMenu = (item) => {
    const category = recommend.filter((el) => el.category === item);
    return category.map((el) => {
      return (
        <option>
          {el.item}¥{el.amount}
        </option>
      );
    });
  };

  return (
    <>
      <div>
        <h2>！！！！本日のおすすめ！！！！</h2>
        <h3>food</h3>
        <h4>{recommendMenu("cuisine")}</h4>
        <h3>drink</h3>
        <h4>{recommendMenu("drink")}</h4>

        <h2>food</h2>
        <img src={takokara} />
        <img src={sarada} />

        <h3>おつまみ</h3>
        {cuisineMenu("snack")}
        <h3>サラダ</h3>
        {cuisineMenu("salad")}
        <h3>揚げ物</h3>
        {cuisineMenu("fried")}
        <h3>焼き物</h3>
        {cuisineMenu("grill")}
        <h3>〆</h3>
        {cuisineMenu("main")}
        <h3>デザート</h3>
        {cuisineMenu("dessert")}

        <h2>drink</h2>
        <h3>ビール</h3>
        {drinkMenu("beer")}
        <h3>サワー</h3>
        {drinkMenu("sour")}
        <h3>ウィスキー</h3>
        {drinkMenu("whisky")}
        <h3>焼酎</h3>
        {drinkMenu("shochu")}
        <h3>カクテル</h3>
        {drinkMenu("cocktail")}
        <h3>ワイン</h3>
        {drinkMenu("wine")}
        <h3>ノンアル</h3>
        {drinkMenu("non-al")}
        <img src={beel} />
        <h2>宴会コース</h2>
        {banquet()}
      </div>
    </>
  );
};

export default Menu;
{
  /* <div style={{ width: "100%" }}> */
}
{
  /* <img src={store} style={{ width: "50%", height: 400 }} />
        <img src={counter} style={{ width: "50%", height: 415 }} /> */
}
{
  /* </div> */
}
