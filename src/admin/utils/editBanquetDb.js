import { db } from "../../config/firebese";

export const editBanquetDb = (select, title, price, detail, id) => {
  const banquetRef = db.collection("banquetMenu");

  if (select === "add") {
    if (!title || !price || !detail) {
      return alert("入力してください");
    }
    banquetRef.doc().set({
      title: title,
      price: parseInt(price),
      detail,
    });
  } else if (select === "edit") {
    if (!title && !price && !detail) {
      return alert("入力漏れがあります");
    }
    if (title) {
      banquetRef.doc(id).update({
        title: title,
      });
    }
    if (price) {
      banquetRef.doc(id).update({
        price: parseInt(price),
      });
    }
    if (detail) {
      banquetRef.doc(id).update({
        detail,
      });
    }
  } else if (select === "delete") {
    banquetRef.doc(id).delete();
  }
};
