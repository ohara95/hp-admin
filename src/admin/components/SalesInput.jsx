import React from "react";

const SalesInput = ({
  setSalesDate,
  salesPrice,
  setSalesPrice,
  plusSubmit,
  salesDate,
}) => (
  <form class="px-8 pt-6 pb-8 mb-4" onSubmit={plusSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">売上日</label>
      <input
        class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
        type="text"
        type="date"
        date="date"
        value={salesDate}
        onChange={(e) => setSalesDate(e.target.value)}
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">売上額</label>
      <input
        class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none "
        type="number"
        date="sales"
        value={salesPrice}
        onChange={(e) => setSalesPrice(e.target.value)}
      />
    </div>
    <div>
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
        計上
      </button>
    </div>
  </form>
);

export default SalesInput;
