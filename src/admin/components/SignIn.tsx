import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../config/firebese";
import { AuthContext } from "../../AuthProvider";
import { Redirect } from "react-router-dom";
import * as H from "history";

const SignIn = ({ history }: { history: H.History }) => {
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
    <>
      <div>
        <div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">LogIn</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="on"
                  value={email}
                  ref={register({
                    required: "※必須です",
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                {errors.email && <span>{errors.email.message}</span>}
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="on"
                  value={password}
                  ref={register({
                    required: "※必須です",
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {errors.password && <span>{errors.password.message}</span>}
              <input
                type="submit"
                value="Done"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                forgot password?{" "}
                <a href="register.html" className="underline font-semibold">
                  Resetting here.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
