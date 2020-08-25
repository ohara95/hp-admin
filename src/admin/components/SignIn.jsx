import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { auth } from "../../config/firebese";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(<Redirect to="/management" />);
  };
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
      <button>ログイン</button>
    </form>
  );
};

export default SignIn;
