import React, { Children, useState } from "react";
import { auth, db } from "../../config/firebese";
import BuysTodo from "../components/buysTodo";
import { Alert } from "../../atoms/Alert";
import { useEffect } from "react";
import { format } from "date-fns";
import ManagementGraph from "../components/ManagementGraph";
import SalesList from "../components/SalesList";
import BuysList from "../components/BuysList";
import SalesInput from "../components/SalesInput";
import BuysInput from "../components/BuysInput";
import CustomLabel from "../../atoms/CustomLabel";
import IconPop from "../../atoms/IconPop";

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
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
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
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
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
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
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
    db.collection("management")
      .doc("NcmaRejmRabdytHQfbKU")
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

  /** 同じ日付の金額足し算 */
  const sumData = (selectData) => {
    const res = [];
    for (const key of selectData) {
      const item = res.find((item) => key.date.seconds === item.date.seconds);
      if (item) {
        // resで作った配列にpush
        if (item.detail && key.detail) {
          item.detail.push(key.detail);
        }
        if (item.buysPrice && key.buysPrice) {
          item.buysPrice.push(key.buysPrice);
        }
        if (item.salesPrice && key.salesPrice) {
          item.salesPrice.push(key.salesPrice);
        }
        continue;
      }
      if (key.detail && key.buysPrice) {
        if (key.salesPrice) {
          res.push({
            ...key,
            buysPrice: [key.buysPrice],
            salesPrice: [key.salesPrice],
            detail: [key.detail],
          });
        } else {
          res.push({
            ...key,
            buysPrice: [key.buysPrice],
            salesPrice: [],
            detail: [key.detail],
          });
        }
      } else if (key.salesPrice) {
        res.push({
          ...key,
          buysPrice: [],
          salesPrice: [key.salesPrice],
          detail: [],
        });
      }
    }
    return res;
  };

  /** 配列内の合算 */
  const sumPrice = (price) => {
    if (price) {
      let sum = 0;
      for (let i = 0; i < price.length; i++) {
        sum += price[i];
      }
      return sum;
    }
  };

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
    .filter((data) => Number(format(data.date.toDate(), "MM")) === toMonth)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice[0]),
        経費: sumPrice(data.buysPrice[0]),
      };
    });

  /** 表用のデータ(選択) */
  const chooseGraphData = sumData(setData)
    .filter((data) => format(data.date.toDate(), "MM") == chooseBtn)
    .map((data) => {
      return {
        日付: format(data.date.toDate(), "MM/dd"),
        売上: sumPrice(data.salesPrice),
        経費: sumPrice(data.buysPrice),
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

  // 12ヶ月
  // const months = () => {
  //   let monthArr = [];
  //   for (let i = 1; i <= 12; i++) {
  //     monthArr.push(<option value={i}>{i}月</option>);
  //   }
  //   return monthArr;
  // };

  return (
    <>
      {inputErr && <Alert title="注意！" text="入力してください" />}
      <button
        class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
        onClick={() => {
          history.push("/edit");
        }}
      >
        ホームページ編集
      </button>
      <h1 class="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
        管理画面
      </h1>

      <div>
        <div
          onClick={(e) => {
            setToggleTable(e.target.value);
          }}
          style={{ margin: "10px auto", width: "20%" }}
        >
          <button
            value="months"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white py-3 px-5 rounded-l "
          >
            月間
          </button>
          <button
            value="year"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white py-3 px-5 "
          >
            年間
          </button>
          <button
            value="chooseMonth"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white py-3 px-5 rounded-r"
          >
            月別
            <select
              onChange={(e) => {
                setChooseBtn(e.target.value);
              }}
              class="bg-teal-500 hover:bg-teal-700 text-white"
            >
              <option value="01">1月</option>
              <option value="02">2月</option>
              <option value="03">3月</option>
              <option value="04">4月</option>
              <option value="05">5月</option>
              <option value="06">6月</option>
              <option value="07">7月</option>
              <option value="08">8月</option>
              <option value="09">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
            </select>
          </button>
        </div>
        <ManagementGraph chooseGraph={chooseGraph} />
      </div>

      <div
        style={{ display: "flex", width: "90%", margin: "0 auto" }}
        class="bg-white shadow-md rounded "
      >
        <SalesInput
          setSalesDate={setSalesDate}
          salesPrice={salesPrice}
          setSalesPrice={setSalesPrice}
          plusSubmit={plusSubmit}
          salesDate={salesDate}
        />
        <BuysInput
          setBuysPrice={setBuysPrice}
          buysDetail={buysDetail}
          setBuysDetail={setBuysDetail}
          buysDate={buysDate}
          setBuysDate={setBuysDate}
          buysPrice={buysPrice}
          minusSubmit={minusSubmit}
        />
        <div class="md:w-1/2 p-3">
          <IconPop text="売上計" color="blue" icon="fas fa-plus">
            {totalSales() !== 0 && `${totalSales().toLocaleString()}円`}
          </IconPop>
          <IconPop text="経費計" color="red" icon="fas fa-minus">
            {totalBuys() !== 0 && `${totalBuys().toLocaleString()}円`}
          </IconPop>
          <IconPop text="差額" color="green" icon="fas fa-hand-holding-usd">
            {difference.toLocaleString()}
          </IconPop>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          margin: "30px auto",
        }}
        class="bg-white shadow-md rounded "
      >
        <div
          class="px-8 pt-6 pb-8 mb-4 "
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          <CustomLabel text="売上表" />
          <SalesList
            dbSales={dbSales}
            edit={edit}
            setEdit={setEdit}
            editId={editId}
            setEditId={setEditId}
            editSalesPrice={editSalesPrice}
            setEditSalesPrice={setEditSalesPrice}
          />
        </div>
        <div
          class="px-8 pt-6 pb-8 mb-4"
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          <CustomLabel text="経費表" />
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
          />
        </div>
        <div
          class="px-8 pt-6 pb-8 mb-4"
          style={{ height: 400, width: "30%", overflow: "scroll" }}
        >
          <CustomLabel text="買い物リスト" />
          <BuysTodo />
        </div>
      </div>

      <button
        class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
        onClick={() => auth.signOut()}
      >
        ログアウト
      </button>
    </>
  );
};
export default Management;
