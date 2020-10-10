export const sumPrice = (price: number[]) => {
  if (price) {
    let sum = 0;
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return sum;
  }
};
