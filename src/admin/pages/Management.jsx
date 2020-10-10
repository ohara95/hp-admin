import React, { useState } from "react";
import { auth, db } from "../../config/firebese";
import BuysTodo from "../components/buysTodo";
import Alert from "../../atoms/Alert";
import { useEffect } from "react";
import { format } from "date-fns";
import ManagementGraph from "../components/ManagementGraph";
import SalesList from "../components/SalesList";
import BuysList from "../components/BuysList";
import SalesInput from "../components/SalesInput";
import BuysInput from "../components/BuysInput";
import CustomLabel from "../../atoms/CustomLabel";
import IconPop from "../../atoms/IconPop";
import sumData from "../utils/sameDaysCalc";
import { month } from "../utils/month";
import { sumPrice } from "../utils/arrCalc";
// import * as H from "history";

// type Props = {
//   history: H.History;
// };

const Management = ({ history }) => {
  const [salesDate, setSalesDate] = useState(null);
  const [buysDate, setBuysDate] = useState(null);
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
  const [toggleTable, setToggleTable] = useState("months");
  const [chooseBtn, setChooseBtn] = useState("");
  const [dbSales, setDbSales] = useState([]);
  const [dbBuys, setDbBuys] = useState([]);
  const [inputErr, setInputErr] = useState(false);

  const setData = dbSales.concat(dbBuys);

  // const today = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const toMonth = today.getMonth() + 1;

  const managementRef = db.collection("management").doc("NcmaRejmRabdytHQfbKU");

  /** 売上計上 */
  const plusSubmit = (e) => {
    e.preventDefault();
    if (!salesDate || !salesPrice) {
      setInputErr(true);
      return;
    } else {
      setSalesPrice("");
      setSalesDate("");
      salesDB(salesDate, salesPrice, "sales");
      setInputErr(false);
    }
  };

  /** 売上をDBに登録 */
  const salesDB = (date, price, type) => {
    managementRef
      .collection("sales")
      .doc()
      .set({
        date: new Date(date),
        salesPrice: parseInt(price),
        type,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** 経費計上 */
  const minusSubmit = (e) => {
    e.preventDefault();
    if (!buysPrice || !buysDate || !buysDetail) {
      alert("入力してください");
      return;
    } else {
      setBuysPrice("");
      setBuysDate("");
      setBuysDetail("");
      buysDB(buysDate, buysPrice, buysDetail, "buys");
    }
  };

  /** 経費をDBに登録 */
  const buysDB = (date, price, detail, type) => {
    managementRef
      .collection("buys")
      .doc()
      .set({
        date: new Date(date),
        buysPrice: parseInt(price),
        detail,
        type,
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  /** 売上計算 */
  const totalSales = () => {
    let total;
    if (toggleTable === "chooseMonth") {
      total = dbSales
        .filter((sales) => format(sales.date.toDate(), "MM") == chooseBtn)
        .reduce((cumulative, current) => cumulative + current.salesPrice, 0);
    } else if (toggleTable === "months") {
      total = dbSales
        .filter(
          (sales) => format(sales.date.toDate(), "MM") == toMonth.toString()
        )
        .reduce((cumulative, current) => cumulative + current.salesPrice, 0);
    } else {
      total = dbSales.reduce(
        (cumulative, current) => cumulative + current.salesPrice,
        0
      );
    }
    return total;
  };

  /** 経費計算 */
  const totalBuys = () => {
    let total;
    if (toggleTable === "chooseMonth") {
      total = dbBuys
        .filter((sales) => format(sales.date.toDate(), "MM") == chooseBtn)
        .reduce((cumulative, current) => cumulative + current.buysPrice, 0);
    } else if (toggleTable === "months") {
      total = dbBuys
        .filter(
          (sales) => format(sales.date.toDate(), "MM") == toMonth.toString()
        )
        .reduce((cumulative, current) => cumulative + current.buysPrice, 0);
    } else {
      total = dbBuys.reduce(
        (cumulative, current) => cumulative + current.buysPrice,
        0
      );
    }

    return total;
  };

  /** salesData取得 */
  useEffect(() => {
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
        setDbSales(data);
      });
  }, []);

  /** buysData取得 */
  useEffect(() => {
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
        setDbBuys(data);
      });
  }, []);

  /** 差額表示 */
  const difference = totalSales(dbSales) - totalBuys(dbBuys);

  /** 日付順にソート */
  const sortSetData = sumData(setData).sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  /** 表用のデータ(今月) */
  const graphData = sumData(sortSetData)
    .filter((data) => parseInt(format(data.date.toDate(), "MM")) === toMonth)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice[0]),
        経費: sumPrice(data.buysPrice[0]),
      };
    });

  /** 表用のデータ(選択) */
  const chooseGraphData = sumData(sortSetData)
    .filter((data) => format(data.date.toDate(), "MM") == chooseBtn)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice[0]),
        経費: sumPrice(data.buysPrice[0]),
      };
    });

  /** 表用のデータ(月計) */
  const allMonthData = () => {
    let arr = [];
    const totalData = sumData(setData);

    for (const key of totalData) {
      const item = arr.find(
        (data) =>
          format(data.date.toDate(), "MM") === format(key.date.toDate(), "MM")
      );
      if (item) {
        if (item.buysPrice) {
          Object.assign(item.buysPrice, key.buysPrice);
        }
        if (item.salesPrice) {
          Object.assign(item.salesPrice, key.salesPrice);
        }
        continue;
      }
      arr.push({
        ...key,
      });
    }
    const newArr = arr.map((data) => {
      return {
        日付: `${format(data.date.toDate(), "MM")}月`,
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
      };
    });
    return newArr;
  };

  /** グラフ種類選択 */
  const chooseGraph = () => {
    switch (toggleTable) {
      case "months":
        return graphData;
      case "year":
        return allMonthData();
      case "chooseMonth":
        return chooseGraphData;
      default:
        return;
    }
  };

  // 選択毎に売上一覧の表示を切替
  const changeSalesDB = () => {
    switch (toggleTable) {
      case "months":
        return dbSales.filter(
          (sales) => format(sales.date.toDate(), "MM") == toMonth
        );
      case "year":
        return dbSales;
      case "chooseMonth":
        return dbSales.filter(
          (sales) => format(sales.date.toDate(), "MM") == chooseBtn
        );
      default:
        return dbSales;
    }
  };

  const changeBuysDB = () => {
    switch (toggleTable) {
      case "months":
        return dbBuys.filter(
          (sales) => format(sales.date.toDate(), "MM") == toMonth
        );
      case "year":
        return dbBuys;
      case "chooseMonth":
        return dbBuys.filter(
          (sales) => format(sales.date.toDate(), "MM") == chooseBtn
        );
      default:
        return dbBuys;
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
            setToggleTable(e.target.value);
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
              selected={() => {
                (toggleTable === "months" || "year") && setChooseBtn("none");
              }}
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
            setSalesDate={setSalesDate}
            salesPrice={salesPrice}
            setSalesPrice={setSalesPrice}
            salesDate={salesDate}
          />
        </form>
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
          <BuysInput
            setBuysPrice={setBuysPrice}
            buysDetail={buysDetail}
            setBuysDetail={setBuysDetail}
            buysDate={buysDate}
            setBuysDate={setBuysDate}
            buysPrice={buysPrice}
          />
        </form>
        <div className="md:w-1/2 p-3">
          <IconPop text="売上計" color="blue" icon="fas fa-plus">
            {`${totalSales().toLocaleString()}円`}
          </IconPop>
          <IconPop text="経費計" color="red" icon="fas fa-minus">
            {`${totalBuys().toLocaleString()}円`}
          </IconPop>
          <IconPop text="差額" color="green" icon="fas fa-hand-holding-usd">
            {`${difference.toLocaleString()}円`}
          </IconPop>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-11/12 my-5 bg-white px-8 mt-10">
        <div className="w-2/6">
          <CustomLabel text="売上表" />
          <div className="h-64 overflow-y-scroll">
            <SalesList
              dbSales={dbSales}
              edit={edit}
              setEdit={setEdit}
              editId={editId}
              setEditId={setEditId}
              editSalesPrice={editSalesPrice}
              setEditSalesPrice={setEditSalesPrice}
              changeSalesDB={changeSalesDB}
            />
          </div>
        </div>
        <div className="w-2/6">
          <CustomLabel text="経費表" />
          <div className="h-64 overflow-y-scroll">
            <BuysList
              dbBuys={dbBuys}
              buysEdit={buysEdit}
              setBuysEditId={setBuysEditId}
              setEditBuysPrice={setEditBuysPrice}
              editBuysDetail={editBuysDetail}
              setEditBuysDetail={setEditBuysDetail}
              setBuysEdit={setBuysEdit}
              editBuysPrice={editBuysPrice}
              setBuysEdit={setBuysEdit}
              buysEditId={buysEditId}
              changeBuysDB={changeBuysDB}
            />
          </div>
        </div>
        <div className="w-2/6">
          <CustomLabel text="買い物リスト" />
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
