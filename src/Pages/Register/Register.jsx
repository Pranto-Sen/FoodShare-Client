import React, { useContext, useState } from "react";
// import google from "../images/google.png";
import { FcGoogle } from "react-icons/fc";

 import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photourl = e.target.photourl.value;
    console.log(name, email, password, photourl);
    setRegisterError("");
    setRegisterSuccess("");

    if (password.length < 6) {
      console.log("passssssss");
      setRegisterError("at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      console.log("passssssss");
      setRegisterError("at least 1 capital letter");
    } else if (!/[@#$%^&+=!]/.test(password)) {
      setRegisterError("at least 1 special character");
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        // console.log("ch", name, photourl);
        // console.log(result.user);
        updateProfile(result.user, {
          
          displayName: name,
          photoURL: photourl,
        });
        Swal.fire({
          text: "Register Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogleClick = () => {
    console.log("inside goo");
    googleLogin()
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: "Register Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div
          class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div class="bg-blue-300 w-full h-100  mb-20 px-8 py-4 shadow-2xl rounded-xl">
            <h1 class="text-xl md:text-3xl font-semibold leading-tight text-center">
              Register to your account
            </h1>

            <form onSubmit={handleRegister} class="mt-6" method="POST">
              <div>
                <label class="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="Enter Your Name"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                ></input>
              </div>
              <div class="mt-4">
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
                <label class="block text-gray-700">Photo URL</label>
                <input
                  type="text"
                  name="photourl"
                  id=""
                  placeholder="Enter Your Photo URL"
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

              {registerError && <p className="text-red-700">{registerError}</p>}

              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Register
              </button>
            </form>

            <button
              onClick={handleGoogleClick}
              type="submit"
              class="flex w-full bg-slate-200  text-black font-semibold rounded-lg
               py-3 mt-6 "
            >
              <img src="google.png" className="w-6 h-6 mr-4 ml-36"></img>
              Log In with Google
            </button>

            <p class="mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                class="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
