import { db } from "../../config/firebese";

export const editBanquetDb = (
  select,
  title,
  price,
  detail,
  id,
  clearTitle,
  clearPrice,
  clearDetail
) => {
  const banquetRef = db.collection("banquetMenu");

  if (select === "add") {
    if (!title || !price || !detail) {
      return alert("入力漏れがあります");
    }
    banquetRef
      .add({
        title: title,
        price: parseInt(price),
        detail,
      })
      .then(() => {
        clearTitle("");
        clearPrice("");
        clearDetail("");
      });
  } else if (select === "edit") {
    banquetRef
      .doc(id)
      .get()
      .then((res) => {
        if (!title && !price && !detail) {
          return alert("入力してください");
        } else if (title) {
          res.ref
            .update({
              title,
            })
            .then(() => clearTitle(""));
        } else if (price) {
          res.ref
            .update({
              price: parseInt(price),
            })
            .then(() => clearPrice(""));
        } else if (detail) {
          res.ref
            .update({
              detail,
            })
            .then(() => clearDetail(""));
        }
      });
  } else if (select === "delete") {
    banquetRef.doc(id).delete();
  }
};
