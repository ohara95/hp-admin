import { db } from "../../config/firebese";

const editMenuDb = (
  item,
  price,
  selectMethod,
  selectCategory,
  name,
  id,
  clearItem,
  clearPrice
) => {
  const Ref = db
    .collection("menu")
    .doc("ya3NEbDICuOTwfUWcHQs")
    .collection(name);

  if (selectMethod === "add") {
    if (!item || !price) {
      return alert("入力漏れがあります");
    }
    Ref.add({
      item,
      price: parseInt(price),
      category: selectCategory,
    }).then(() => {
      clearItem("");
      clearPrice("");
    });
  } else if (selectMethod === "edit") {
    Ref.doc(id)
      .get()
      .then((res) => {
        if (!item && !price) {
          return alert("入力してください");
        } else if (!price) {
          res.ref.update({
            item,
          });
        } else if (!item) {
          res.ref.update({
            price: parseInt(price),
          });
        }
      })
      .then(() => {
        clearItem("");
        clearPrice("");
      });
  } else if (selectMethod === "delete") {
    Ref.doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      })
      .then(() => {
        clearItem("");
        clearPrice("");
      });
  }
};

export default editMenuDb;
