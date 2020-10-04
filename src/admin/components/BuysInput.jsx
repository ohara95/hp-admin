import React from "react";

const BuysInput = ({
  setBuysPrice,
  buysDetail,
  setBuysDetail,
  buysDate,
  setBuysDate,
  buysPrice,
  minusSubmit,
}) => (
  <div>
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={minusSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          出費日
        </label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          type="date"
          date="date"
          value={buysDate}
          onChange={(e) => setBuysDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          出費額
        </label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          type="number"
          date="buys"
          value={buysPrice}
          onChange={(e) => setBuysPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          出費明細
        </label>
        <input
          className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
          type="text"
          date="detail"
          value={buysDetail}
          onChange={(e) => setBuysDetail(e.target.value)}
        />
      </div>
      <div>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
          計上
        </button>
      </div>
    </form>
  </div>
);

export default BuysInput;
