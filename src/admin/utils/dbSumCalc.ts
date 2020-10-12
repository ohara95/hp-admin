import { format } from "date-fns";
import { toMonth } from "./month";
import { sumPrice } from "./arrCalc";
import firebase from "../../config/firebese";

type PriceArr = {
  date: firebase.firestore.Timestamp;
  price: number;
};

export const dbSumCalc = (
  toggleTable: string,
  priceArr: PriceArr[],
  chooseBtn: string
) => {
  if (toggleTable === "chooseMonth") {
    const filterPrice = priceArr.filter(
      (data) => format(data.date.toDate(), "MM") === chooseBtn
    );
    return sumPrice(filterPrice.map((data) => data.price));
  } else if (toggleTable === "months") {
    const filterPrice = priceArr.filter(
      (data) => parseInt(format(data.date.toDate(), "MM")) === toMonth
    );
    return sumPrice(filterPrice.map((data) => data.price));
  } else {
    return sumPrice(priceArr.map((data) => data.price));
  }
};
