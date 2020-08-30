import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../config/firebese";
import { AuthContext } from "../../AuthProvider";
import { Redirect } from "react-router-dom";

const SignIn = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/management");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user) {
    return <Redirect to="/management" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>メールアドレス</label>
      <input
        type="email"
        name="email"
        autoComplete="on"
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
        autoComplete="on"
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
