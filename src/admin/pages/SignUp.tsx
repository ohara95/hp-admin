import React, { useState, FC } from "react";
import { auth } from "../../config/firebese";
import * as H from "history";

type Props = {
  history: H.History;
};

type useInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignUp: FC<Props> = ({ history }) => {
  const useInput = (initialValue: string): useInputProps => {
    const [value, set] = useState(initialValue);
    return {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value),
    };
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("パスワード不一致");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        history.push("/management");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">新規登録</h3>
        </section>

        <section className="mt-10">
          <form onSubmit={onSubmit} className="flex flex-col" action="#">
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
                パスワード
              </label>
              <input
                type="password"
                value={password.value}
                onChange={password.onChange}
                id="password"
                className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                パスワード(確認用)
              </label>
              <input
                type="password"
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
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

export default SignUp;
