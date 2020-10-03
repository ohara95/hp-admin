import React, { useState, useCallback } from "react";

const Test = () => {
  const useCounter = () => {
    // setCounterでcounterを上書きできないようにしている
    const [counter, setCounter] = useState(0);
    const increment = useCallback(() => {
      setCounter((c) => c + 1);
    }, []);
    return [counter, increment];
  };
  const [counter, increment] = useCounter();
  return (
    <>
      {counter}
      <button onClick={increment}>おして</button>
    </>
  );
};

const response = {
  data: [
    {
      id: 1,
      name: "Patty Rabbit",
      email: "patty@maple.town",
    },
    {
      id: 2,
      name: "Rolley Cocker",
      email: "rolley@palm.town",
    },
    {
      id: 3,
      name: "Bobby Bear",
      email: "bobby@maple.town",
    },
  ],
};

const createData = (id, img, name, code, price, stock, open, period) => ({
  id,
  img,
  name,
  code,
  price,
  stock,
  open,
  period,
});

const rows = [
  createData(
    34,
    "img",
    "徳用きゅうり",
    "fork-01",
    12000,
    2,
    true,
    "06月29日 08時〜06月29日 08時"
  ),
  createData(
    17,
    "img",
    "徳用トマト",
    "fork-01",
    12000,
    2,
    true,
    "06月29日 08時〜06月29日 08時"
  ),
];

rows.map((el, i) => console.log([el.i]));

// const { data: users = [] } = response;
// console.log(users);
// {
//   /* // const Test = () => { */
// }
//   const num = 123;
//   const str = "123";
//   return <Test2 {...{ num, str }} />;
// };

// const Test2 = ({ num, str }) => {
//   return (
//     <>
//       <p>{num}</p>
//       <p>{str}</p>
//     </>
//   );
// };

// const App2 = () => {
//   const Foo = () => {
//     useEffect(() => {
//       return () => {
//         run1sec();
//         console.log("bye!");
//       };
//     });
//     return <p>I am foo</p>;
//   };

//   function run1sec() {
//     const start = performance.now();
//     while (performance.now() - start < 1000);
//   }
//   return <>{Foo()}</>;
// };

export default Test;
