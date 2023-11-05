// import React from "react";
import React, { useContext, useState } from "react";
// import { AuthContext } from "./Providers/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import Swal from "sweetalert2";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
//   const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    setLoginError("");
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          text: "LogIn Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
        setLoginError("Please enter valid email and password");
      });
  };
  return (
    <div className="">
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center "
        >
          <div class="bg-blue-300 w-full h-100 mb-20 px-8 py-20 shadow-xl rounded-xl">
            <h1 className="text-xl md:text-3xl font-semibold leading-tight  text-center">
              Log in to your account
            </h1>

            <form onSubmit={handleLogin} class="mt-6" method="POST">
              <div>
                <label class="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter Email Address"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                ></input>
              </div>

              <div class="mt-4">
                <label class="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 
                focus:bg-white focus:outline-none"
                ></input>
              </div>
              {loginError && <p className="text-red-600 pt-4">{loginError}</p>}
              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <p class="mt-8">
              Need an account?{" "}
              <Link
                to="/register"
                class="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
