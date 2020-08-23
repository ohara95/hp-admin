import React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>メールアドレス</label>
      <input name="email" ref={register} />
      <label>パスワード</label>
      <input name="password" ref={register} />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default SignIn;
