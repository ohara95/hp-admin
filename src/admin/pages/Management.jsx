import React, { useState } from "react";
import shortid from "shortid";
import { auth } from "../../config/firebese";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const Management = ({ history }) => {
  // 初期値とname一緒じゃなきゃダメ
  const [sales, setSales] = useState({
    date: "",
    sales: "",
    id: shortid.generate(),
  });
  const [buys, setBuys] = useState({
    date: "",
    buys: "",
    detail: "",
    id: shortid.generate(),
  });
  const [salesData, setSalesData] = useState([]);
  const [buysData, setBuysData] = useState([]);
  const [salesOpen, setSalesOpen] = useState(false);
  const [buysOpen, setBuysOpen] = useState(false);

  const plusSubmit = (e) => {
    e.preventDefault();
    setSales({ date: "", sales: "" });
    setSalesData([...salesData, sales]);
  };

  const minusSubmit = (e) => {
    e.preventDefault();
    setBuys({ date: "", buys: "", detail: "" });
    setBuysData([...buysData, buys]);
  };

  const plusChange = (e) => {
    setSales({ ...sales, [e.target.name]: e.target.value });
  };
  const minusChange = (e) => {
    setBuys({ ...buys, [e.target.name]: e.target.value });
  };

  const totalSales = () => {
    const total = salesData.reduce(
      (cumulative, current) => cumulative + parseInt(current.sales),
      0
    );
    return total;
  };

  const totalBuys = () => {
    const total = buysData.reduce(
      (cumulative, current) => cumulative + parseInt(current.buys),
      0
    );
    return total;
  };

  const salesHistory = () => {
    return salesData.map((data) => {
      return (
        <div key={data.id}>
          <div>
            {data.date} / {data.sales} 円
            <button
              onClick={() => {
                deleteSales(data.id);
              }}
            >
              削除
            </button>
          </div>
        </div>
      );
    });
  };

  const buysHistory = () => {
    return buysData.map((data) => {
      return (
        <div key={data.id}>
          <div>
            {data.date} / {data.buys} 円 / {data.detail}
            <button
              onClick={() => {
                deleteBuys(data.id);
              }}
            >
              削除
            </button>
          </div>
        </div>
      );
    });
  };

  const deleteSales = (id) => {
    setSalesData(salesData.filter((data) => data.id !== id));
  };
  const deleteBuys = (id) => {
    setBuysData(buysData.filter((data) => data.id !== id));
  };

  const salesOpenBtn = () => {
    setSalesOpen(!salesOpen);
  };
  const buysOpenBtn = () => {
    setBuysOpen(!buysOpen);
  };

  const difference = totalSales() - totalBuys();

  const salesChart = () => {
    return (
      <div style={{ width: 100, height: 100, marginLeft: 50 }}>
        <ResponsiveContainer>
          <AreaChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval={0} />
            <YAxis
              ticks={[0, 5000, 10000, 50000, 100000, 200000, 300000]}
              unit="円"
            />
            <Tooltip />
            <Area />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <>
      <h1>管理画面</h1>
      <button
        onClick={() => {
          history.push("/edit");
        }}
      >
        ホームページ編集
      </button>
      <div>
        {salesChart()}
        <form onSubmit={plusSubmit}>
          <label>売上</label>
          <input
            type="date"
            name="date"
            value={sales.date}
            onChange={plusChange}
          />
          ¥
          <input
            type="number"
            name="sales"
            value={sales.sales}
            onChange={plusChange}
          />
          <button>計上</button>
        </form>
      </div>
      <div>
        <form onSubmit={minusSubmit}>
          <label>経費</label>
          <input
            type="date"
            name="date"
            value={buys.date}
            onChange={minusChange}
          />
          ¥
          <input
            type="number"
            name="buys"
            value={buys.buys}
            onChange={minusChange}
          />
          <input
            type="text"
            name="detail"
            value={buys.detail}
            onChange={minusChange}
          />
          <button>計上</button>
        </form>
      </div>
      <h3>売上計</h3>
      {totalSales() !== 0 && totalSales()}
      <button onClick={salesOpenBtn}>一覧表示</button>
      {salesOpen && salesHistory()}
      <h3>経費計</h3>
      {totalBuys() !== 0 && totalBuys()}
      <button onClick={buysOpenBtn}>一覧表示</button>
      {buysOpen && buysHistory()}
      <h3>差額</h3>
      <p className={difference < 0 && "minus"}>{difference}</p>
      <button onClick={() => auth.signOut()}>ログアウト</button>
    </>
  );
};

export default Management;
