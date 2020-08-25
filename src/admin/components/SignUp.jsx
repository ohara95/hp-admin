import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../config/firebese";

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    if (password !== confirmPassword) {
      alert("パスワード不一致");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("登録できました！");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>メールアドレス</label>
      <input
        type="email"
        name="email"
        value={email}
        ref={register({
          required: "※必須です",
        })}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* errors.nameにする */}
      {errors.email && <span>{errors.email.message}</span>}
      <label>パスワード</label>
      <input
        type="password"
        name="password"
        value={password}
        ref={register({
          required: "※必須です",
        })}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <label>パスワード確認用</label>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        ref={register({
          required: "※必須です",
        })}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">登録</button>
    </form>
  );
};

export default SignUp;
