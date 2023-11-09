import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
   const { user, logOut, isRegister } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut().then().catch();
  };

  return (
    <nav className="bg-gray-100 fixed w-full z-20 top-0 left-0 border-b shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://i.ibb.co/Qvjm3Y9/logo.png"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-4xl font-bold whitespace-nowrap">
            FoodShare
          </span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block text-gray-500 hover:text-[#FF444A]"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`md:flex md:w-auto md:order-1 font-bold ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-xl font-semibold">
            <li>
              <NavLink to="/" className="text-gray-700 hover:text-[#FF444A]">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/availableFood"
                className="text-gray-700 hover:text-[#FF444A] "
              >
                Available Food
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addFood"
                className="text-gray-700 hover:text-[#FF444A]"
              >
                Add Food
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manageFood"
                className="text-gray-700 hover:text-[#FF444A]"
              >
                Manage Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/foodRequest" className="text-gray-700 hover:text-[#FF444A]">
                Food Request
              </NavLink>
            </li>

            {user ? (
              <button onClick={handleSignOut}>Logout</button>
            ) : (
              <div className="flex ">
                <li className="pr-4">
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-[#FF444A]"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="text-gray-700 hover:text-[#FF444A]"
                  >
                    Register
                  </NavLink>
                </li>
              </div>
            )}
            {user && (
              <div className="flex items-center">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/5GGZtst/360-F-483909569-OI4-LKNe-Fg-Hwvv-Vju60fej-Ld9gj43d-Icd.jpg"
                  }
                  className="w-6 h-6 mr-2"
                  alt={user.displayName}
                />
                <p>{user.displayName}</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
