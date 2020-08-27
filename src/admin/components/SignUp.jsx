import React, { useState } from "react";
import { auth } from "../../config/firebese";

const SignUp = ({ history }) => {
  const useInput = (initialValue) => {
    const [value, set] = useState(initialValue);
    return { value: value, onChange: (e) => set(e.target.value) };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("パスワード不一致");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        alert("登録できました！");
        history.push("/management");
        email.value("");
        password.value("");
        confirmPassword.value("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  return (
    <form onSubmit={onSubmit}>
      <label>メールアドレス</label>
      <input type="email" value={email.value} onChange={email.onChange} />
      <label>パスワード</label>
      <input
        type="password"
        value={password.value}
        onChange={password.onChange}
      />

      <label>パスワード確認用</label>
      <input
        type="password"
        value={confirmPassword.value}
        onChange={confirmPassword.onChange}
      />

      <button type="submit">登録</button>
    </form>
  );
};

export default SignUp;
