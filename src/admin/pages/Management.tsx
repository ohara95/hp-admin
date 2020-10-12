import React, { FC, useState, useEffect } from "react";
import * as H from "history";
import { Sales, Buys } from "../../types";

import { auth, db } from "../../config/firebese";
import BuysTodo from "../components/buysTodo";
import ManagementGraph from "../components/ManagementGraph";
import SalesList from "../template/SalesList";
import BuysList from "../template/BuysList";
import SalesInput from "../template/SalesInput";
import BuysInput from "../template/BuysInput";
import { Label, IconPop, Alert } from "../atoms";
import {
  month,
  dbSumCalc,
  graphData,
  allMonthData,
  chooseGraphData,
  sort,
} from "../utils";

type Props = {
  history: H.History;
};

type ToggleTable = "chooseMonth" | "months" | "year" | "";

const Management: FC<Props> = ({ history }) => {
  const [salesDate, setSalesDate] = useState("");
  const [buysDate, setBuysDate] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [buysPrice, setBuysPrice] = useState("");
  const [buysDetail, setBuysDetail] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editSalesPrice, setEditSalesPrice] = useState("");
  const [buysEdit, setBuysEdit] = useState(false);
  const [buysEditId, setBuysEditId] = useState("");
  const [editBuysPrice, setEditBuysPrice] = useState("");
  const [editBuysDetail, setEditBuysDetail] = useState("");
  const [toggleTable, setToggleTable] = useState<ToggleTable>("months");
  const [chooseBtn, setChooseBtn] = useState("");
  const [inputErr, setInputErr] = useState(false);

  const [dbSales, setDbSales] = useState<Sales[]>([]);
  const [dbBuys, setDbBuys] = useState<Buys[]>([]);

  const setData = [...dbSales, ...dbBuys];
  const salesPriceArr = dbSales.map((data) => {
    return {
      date: data.date,
      price: data.salesPrice,
    };
  });
  const buysPriceArr = dbBuys.map((data) => {
    return {
      date: data.date,
      price: data.buysPrice,
    };
  });

  const managementRef = db.collection("management").doc("NcmaRejmRabdytHQfbKU");

  /** 売上計上 */
  const plusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!salesDate || !salesPrice) {
      setInputErr(true);
      return;
    } else {
      setSalesPrice("");
      setSalesDate("");
      salesDB(salesDate, salesPrice);
      setInputErr(false);
    }
  };

  /** 経費計上 */
  const minusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!buysPrice || !buysDate || !buysDetail) {
      alert("入力してください");
      return;
    } else {
      setBuysPrice("");
      setBuysDate("");
      setBuysDetail("");
      buysDB(buysDate, buysPrice, buysDetail);
    }
  };

  /** 売上をDBに登録 */
  const salesDB = (date: string, price: string) => {
    managementRef
      .collection("sales")
      .doc()
      .set({
        date: new Date(date),
        salesPrice: parseInt(price),
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** 経費をDBに登録 */
  const buysDB = (date: string, price: string, detail: string) => {
    managementRef
      .collection("buys")
      .doc()
      .set({
        date: new Date(date),
        buysPrice: parseInt(price),
        detail,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /** salesData取得 */
    managementRef
      .collection("sales")
      .orderBy("date")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setDbSales(data as Sales[]);
      });

    /** buysData取得 */
    managementRef
      .collection("buys")
      .orderBy("date")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setDbBuys(data as Buys[]);
      });
  }, []);

  /** 差額表示 */
  const difference =
    dbSumCalc(toggleTable, salesPriceArr, chooseBtn) -
    dbSumCalc(toggleTable, buysPriceArr, chooseBtn);

  /** グラフ種類選択 */
  const chooseGraph = () => {
    switch (toggleTable) {
      case "months":
        //@ts-ignore
        return graphData(sort(setData));
      case "year":
        return allMonthData(setData);
      case "chooseMonth":
        //@ts-ignore
        return chooseGraphData(sort(setData), chooseBtn);
      default:
        return;
    }
  };

  return (
    <>
      {inputErr && (
        <Alert
          title="注意！"
          text="入力してください"
          icon="fas fa-exclamation-circle"
        />
      )}
      <button
        className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
        onClick={() => {
          history.push("/edit");
        }}
      >
        ホームページ編集
      </button>
      <h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
        管理画面
      </h1>
      <div>
        <div
          onClick={(e) => {
            setToggleTable((e.target as HTMLInputElement).value as ToggleTable);
          }}
          className="mx-auto my-2 w-2/12"
        >
          <button
            value="months"
            className="bg-teal-500 text-white py-1 px-3 rounded-l"
          >
            月間
          </button>
          <button value="year" className="bg-teal-500 text-white py-1 px-3">
            年間
          </button>
          <select
            onChange={(e) => {
              setChooseBtn(e.target.value);
            }}
          >
            {/** memo  他のボタン選択時に未選択に変えたい */}
            <option
              value="none"
              // selected={() => {
              //   (toggleTable === "months" || "year") && setChooseBtn("none");
              // }}
            >
              未選択
            </option>
            {month()}
          </select>
          <button
            className="bg-teal-500 text-white py-1 px-3 rounded-r"
            value="chooseMonth"
          >
            表示
          </button>
        </div>
        <ManagementGraph chooseGraph={chooseGraph} />
      </div>

      <div className="flex w-11/12 my-0 mx-auto bg-white shadow-md rounded">
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={plusSubmit}>
          <SalesInput
            {...{ setSalesDate, salesPrice, setSalesPrice, salesDate }}
          />
        </form>
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
          <BuysInput
            {...{
              setBuysPrice,
              buysDetail,
              setBuysDetail,
              buysDate,
              setBuysDate,
              buysPrice,
            }}
          />
        </form>

        <div className="md:w-1/2 p-3">
          <IconPop text="売上計" color="blue" icon="fas fa-plus">
            {`${dbSumCalc(
              toggleTable,
              salesPriceArr,
              chooseBtn
            ).toLocaleString()}円`}
          </IconPop>
          <IconPop text="経費計" color="red" icon="fas fa-minus">
            {`${dbSumCalc(
              toggleTable,
              buysPriceArr,
              chooseBtn
            ).toLocaleString()}円`}
          </IconPop>
          <IconPop text="差額" color="green" icon="fas fa-hand-holding-usd">
            {`${difference.toLocaleString()}円`}
          </IconPop>
        </div>
      </div>

      <div className="flex justify-around mx-auto w-11/12 my-5 bg-white px-8 mt-10">
        <div className="w-2/6">
          <Label text="売上表" />
          <div className="h-64 overflow-y-scroll">
            <SalesList
              {...{
                dbSales,
                edit,
                setEdit,
                editId,
                setEditId,
                editSalesPrice,
                setEditSalesPrice,
                toggleTable,
                chooseBtn,
              }}
            />
          </div>
        </div>
        <div className="w-2/6">
          <Label text="経費表" />
          <div className="h-64 overflow-y-scroll">
            <BuysList
              {...{
                dbBuys,
                buysEdit,
                setBuysEditId,
                setEditBuysPrice,
                editBuysDetail,
                setEditBuysDetail,
                setBuysEdit,
                editBuysPrice,
                buysEditId,
                toggleTable,
                chooseBtn,
              }}
            />
          </div>
        </div>
        <div className="w-2/6">
          <Label text="買い物リスト" />
          <div className="h-64 overflow-y-scroll">
            <BuysTodo />
          </div>
        </div>
      </div>
      <button
        className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
        onClick={() => auth.signOut()}
      >
        ログアウト
      </button>
    </>
  );
};
export default Management;
