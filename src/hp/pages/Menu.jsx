import React, { useState } from "react";
import Banquet from "../components/menu/Banquet";
import MenuCatalog from "../components/menu/MenuCatalog";

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

const Menu = () => {
  const [cuisine, setCuisine] = useState([]);
  const [drink, setDrink] = useState([]);
  const [recommend, setRecommend] = useState([]);
  console.log(cuisine);
  return (
    <div className="w-full">
      <div className="w-11/12 sm:w-8/12 sm:my-4 mx-auto ">
        <div>
          <h2 className="itemLineWhite">本日のおすすめ</h2>
          <div>
            <h3 className="categoryItem">food</h3>
            <MenuCatalog
              state={recommend}
              setState={setRecommend}
              item="recommend"
              menuItem="cuisine"
            />
            <h3 className="categoryItem">drink</h3>
            <MenuCatalog
              state={recommend}
              setState={setRecommend}
              item="recommend"
              menuItem="drink"
            />
          </div>
        </div>

        <div>
          <h2 className="itemLineWhite">FOOD</h2>
          <div className="rowItem mt-10">
            <img src={edamame} className="menuImage" />
            <div className="w-3/6">
              <h3 className="categoryItem">おつまみ</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="snack"
              />
            </div>
          </div>

          <div className="rowItem mt-10">
            <div className="w-3/6">
              <h3 className="categoryItem">サラダ</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="salad"
              />
            </div>
            <img src={sarada} className="menuImage" />
          </div>

          <div className="rowItem mt-10">
            <img src={takokara} className="menuImage" />
            <div className="w-3/6">
              <h3 className="categoryItem">揚げ物</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="fried"
              />
            </div>
          </div>

          <div className="rowItem mt-10">
            <div className="w-3/6">
              <h3 className="categoryItem">焼き物</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="grill"
              />
            </div>
            <img src={yasai} className="menuImage" />
          </div>

          <div className="rowItem mt-10">
            <img src={otyaduke} className="menuImage" />
            <div className="w-3/6">
              <h3 className="categoryItem">〆</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="main"
              />
            </div>
          </div>

          <div className="rowItem mt-10">
            <div className="w-3/6">
              <h3 className="categoryItem">デザート</h3>
              <MenuCatalog
                state={cuisine}
                setState={setCuisine}
                item="cuisine"
                menuItem="dessert"
              />
            </div>
            <img src={ice} className="menuImage" />
          </div>
        </div>

        <div>
          <h2 className="itemLineWhite">DRINK</h2>
          <div className="rowItem mt-10">
            <img src={beer} className="menuImage" />
            <div className="w-3/6">
              <h3 className="categoryItem">ビール</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="beer"
              />
              <h3 className="categoryItem">サワー</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="sour"
              />
              <h3 className="categoryItem">ウィスキー</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="whisky"
              />
              <h3 className="categoryItem">焼酎</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="shochu"
              />
            </div>
          </div>

          <div className="rowItem mt-8">
            <div className="w-3/6">
              <h3 className="categoryItem">カクテル</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="cocktail"
              />
              <h3 className="categoryItem">ワイン</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="wine"
              />
              <h3 className="categoryItem">ノンアル</h3>
              <MenuCatalog
                state={drink}
                setState={setDrink}
                item="drink"
                menuItem="non-al"
              />
            </div>
            <img src={cocktail} className="menuImage" />
          </div>
        </div>

        <h2 className="itemLineWhite">COURSE</h2>
        <div className="rowItem mt-8">
          <img src={enkai} className="menuImage" />
          <div className="w-3/6">
            <Banquet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
