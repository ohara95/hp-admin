import React, { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebese";

//画像
import store from "../../assets/img/inStore.jpg";
import counter from "../../assets/img/counter.jpg";
import takokara from "../../assets/img/takokara.jpeg";
import beel from "../../assets/img/beel.jpeg";
import sarada from "../../assets/img/images.jpeg";
import enkai from "../../assets/img/enkai.jpeg";
import ice from "../../assets/img/ice.jpg";
import otyaduke from "../../assets/img/otyaduke.jpg";
import yasai from "../../assets/img/yasai.jpg";
import cocktail from "../../assets/img/cocktail.jpg";
import edamame from "../../assets/img/edamame.jpeg";

const Menu = () => {
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
    <div style={{ width: "100%" }}>
      <div style={{ width: "80%", margin: "10px auto" }}>
        <div>
          <h2 className="itemLineYellow">本日のおすすめ</h2>
          <h3 className="categoryItem">food</h3>
          <h4>{recommendMenu("cuisine")}</h4>
          <h3 className="categoryItem">drink</h3>
          <h4>{recommendMenu("drink")}</h4>
        </div>

        <div>
          <h2 className="itemLineYellow">FOOD</h2>
          <div className="rowItem" style={{ marginTop: 20 }}>
            <img src={edamame} className="menuImage" />
            <div style={{ width: "50%" }}>
              <h3 className="categoryItem">おつまみ</h3>
              {cuisineMenu("snack")}
            </div>
          </div>
          <img src={sarada} className="menuImage" />
          <h3 className="categoryItem">サラダ</h3>
          {cuisineMenu("salad")}
          <img src={takokara} className="menuImage" />
          <h3 className="categoryItem">揚げ物</h3>
          {cuisineMenu("fried")}
          <img src={yasai} className="menuImage" />
          <h3 className="categoryItem">焼き物</h3>
          {cuisineMenu("grill")}
          <img src={otyaduke} className="menuImage" />
          <h3 className="categoryItem">〆</h3>
          {cuisineMenu("main")}
          <img src={ice} className="menuImage" />
          <h3 className="categoryItem">デザート</h3>
          {cuisineMenu("dessert")}
        </div>

        <div>
          <h2 className="itemLineYellow">DRINK</h2>
          <img src={beel} className="menuImage" />
          <h3 className="categoryItem">ビール</h3>
          {drinkMenu("beer")}
          <h3 className="categoryItem">サワー</h3>
          {drinkMenu("sour")}
          <h3 className="categoryItem">ウィスキー</h3>
          {drinkMenu("whisky")}
          <h3 className="categoryItem">焼酎</h3>
          {drinkMenu("shochu")}
          <img src={cocktail} className="menuImage" />
          <h3 className="categoryItem">カクテル</h3>
          {drinkMenu("cocktail")}
          <h3 className="categoryItem">ワイン</h3>
          {drinkMenu("wine")}
          <h3 className="categoryItem">ノンアル</h3>
          {drinkMenu("non-al")}
        </div>

        <div className="rowItem">
          <div style={{ width: "50%" }}>
            <h2 className="itemLineYellow">COURSE</h2>
            {banquet()}
          </div>
          <img src={enkai} className="menuImage" />
        </div>
      </div>
    </div>
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
