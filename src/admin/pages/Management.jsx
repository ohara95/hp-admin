import React, { useState } from "react";
import shortid from "shortid";

const Management = () => {
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
  const [open, setOpen] = useState(false);

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
    const total = salesData.reduce((x, y) => x + parseInt(y.sales), 0);
    return total;
  };

  const totalBuys = () => {
    const total = buysData.reduce((x, y) => x + parseInt(y.buys), 0);
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
            <button onClick={deleteBuys(data.id)}>削除</button>
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

  const salesOpen = () => {
    setOpen(!open);
  };

  const difference = totalSales() - totalBuys();

  return (
    <>
      <h1>管理画面</h1>
      <div>
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
      <button onClick={salesOpen}>一覧表示</button>
      {open && salesHistory()}
      <h3>経費計</h3>
      {totalBuys() !== 0 && totalBuys()}
      <button onClick={salesOpen}>一覧表示</button>
      {open && buysHistory()}
      <h3>差額</h3>
      {difference}
    </>
  );
};

export default Management;
