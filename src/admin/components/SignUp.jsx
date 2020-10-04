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
    <>
      <div>
        <div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Sign Up</p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={onSubmit}>
              <div className="flex flex-col pt-4">
                <label for="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  value={email.value}
                  onChange={email.onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label for="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  value={password.value}
                  onChange={password.onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label for="confirmPassword" className="text-lg">
                  ConfirmPassword
                </label>
                <input
                  type="password"
                  value={confirmPassword.value}
                  onChange={confirmPassword.onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <input
                type="submit"
                value="Done"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
