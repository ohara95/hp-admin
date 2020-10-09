import React from "react";
import Banquet from "../components/menu/Banquet";
import { Drink, Cuisine, Recommend } from "../components/menu/groundMenu";

//画像
import takokara from "../../assets/img/takokara.jpeg";
import beer from "../../assets/img/beer.jpeg";
import sarada from "../../assets/img/images.jpeg";
import enkai from "../../assets/img/enkai.jpeg";
import ice from "../../assets/img/ice.jpg";
import otyaduke from "../../assets/img/otyaduke.jpg";
import yasai from "../../assets/img/yasai.jpg";
import cocktail from "../../assets/img/cocktail.jpg";
import edamame from "../../assets/img/edamame.jpeg";

const Menu = () => (
  <div style={{ width: "100%" }}>
    <div style={{ width: "80%", margin: "10px auto" }}>
      <div>
        <h2 className="itemLineWhite">本日のおすすめ</h2>
        <div>
          <h3 className="categoryItem">food</h3>
          <Recommend menuItem="cuisine" />
          <h3 className="categoryItem">drink</h3>
          <Recommend menuItem={"drink"} />
        </div>
      </div>

      <div>
        <h2 className="itemLineWhite">FOOD</h2>
        <div className="rowItem" style={{ marginTop: 20 }}>
          <img src={edamame} className="menuImage" />
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">おつまみ</h3>
            <Cuisine menuItem="snack" />
          </div>
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">サラダ</h3>
            <Cuisine menuItem={"salad"} />
          </div>
          <img src={sarada} className="menuImage" />
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <img src={takokara} className="menuImage" />
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">揚げ物</h3>
            <Cuisine menuItem={"fried"} />
          </div>
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">焼き物</h3>
            <Cuisine menuItem={"grill"} />
          </div>
          <img src={yasai} className="menuImage" />
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <img src={otyaduke} className="menuImage" />
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">〆</h3>
            <Cuisine menuItem={"main"} />
          </div>
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">デザート</h3>
            <Cuisine menuItem={"dessert"} />
          </div>
          <img src={ice} className="menuImage" />
        </div>
      </div>

      <div>
        <h2 className="itemLineWhite">DRINK</h2>
        <div className="rowItem" style={{ marginTop: 20 }}>
          <img src={beer} className="menuImage" />
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">ビール</h3>
            <Drink drinkItem={"beer"} />
            <h3 className="categoryItem">サワー</h3>
            <Drink drinkItem={"sour"} />
            <h3 className="categoryItem">ウィスキー</h3>
            <Drink drinkItem={"whisky"} />
            <h3 className="categoryItem">焼酎</h3>
            <Drink drinkItem={"shochu"} />
          </div>
        </div>

        <div className="rowItem" style={{ marginTop: 20 }}>
          <div style={{ width: "50%" }}>
            <h3 className="categoryItem">カクテル</h3>
            <Drink drinkItem={"cocktail"} />
            <h3 className="categoryItem">ワイン</h3>
            <Drink drinkItem={"wine"} />
            <h3 className="categoryItem">ノンアル</h3>
            <Drink drinkItem={"non-al"} />
          </div>
          <img src={cocktail} className="menuImage" />
        </div>
      </div>

      <h2 className="itemLineWhite">COURSE</h2>
      <div className="rowItem" style={{ marginTop: 20 }}>
        <img src={enkai} className="menuImage" />
        <div style={{ width: "50%" }}>
          <Banquet />
        </div>
      </div>
    </div>
  </div>
);

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
