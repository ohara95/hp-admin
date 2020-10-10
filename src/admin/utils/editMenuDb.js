import { db } from "../../config/firebese";

const editMenuDb = (
  item,
  amount,
  selectMethod,
  selectCategory,
  name,
  id = ""
) => {
  const Ref = db
    .collection("menu")
    .doc("ya3NEbDICuOTwfUWcHQs")
    .collection(name);

  if (selectMethod === "add") {
    if (!item || !amount) {
      return alert("入力漏れがあります");
    }
    Ref.add({
      item,
      amount: parseInt(amount),
      category: selectCategory,
    });
  } else if (selectMethod === "edit") {
    Ref.doc(id)
      .get()
      .then((res) => {
        if (!item && !amount) {
          return alert("入力してください");
        } else if (!amount) {
          res.ref.update({
            item,
          });
        } else if (!item) {
          res.ref.update({
            amount: parseInt(amount),
          });
        }
      });
  } else if (selectMethod === "delete") {
    Ref.doc(id)
      .get()
      .then((res) => {
        res.ref.delete();
      });
  }
};

export default editMenuDb;
