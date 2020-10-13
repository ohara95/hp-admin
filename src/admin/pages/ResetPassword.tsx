import React, { useState } from "react";
import { auth } from "../../config/firebese";
type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ResetPassword = () => {
  const useInput = (initialValue: string): InputProps => {
    const [value, set] = useState(initialValue);
    return {
      value,
      onChange: (e) => {
        set(e.target.value);
      },
    };
  };

  const email = useInput("");
  const password = useInput("");

  const onFromSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.value) {
      return alert("メールアドレスを入力してください");
    } else if (!password.value) {
      return alert("パスワードを入力してください");
    } else {
      auth
        .sendPasswordResetEmail(email.value)
        .then()
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">パスワード再設定</h3>
          <p className="text-gray-600 pt-2 text-sm">
            ※確認の為メールアドレスもご記入下さい
            <br />
            ※ご記入いただいたアドレスへ確認メールを送信致します
          </p>
        </section>

        <section className="mt-10">
          <form onSubmit={onFromSubmit} className="flex flex-col" action="#">
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                メールアドレス
              </label>
              <input
                value={email.value}
                onChange={email.onChange}
                type="text"
                id="email"
                className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                新パスワード
              </label>
              <input
                value={password.value}
                onChange={password.onChange}
                type="password"
                id="password"
                className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <button
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              送信
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
