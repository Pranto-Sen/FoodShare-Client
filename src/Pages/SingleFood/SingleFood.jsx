import React, { useContext, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SingleFood = () => {
  const navigate = useNavigate();
  const items = useLoaderData();
  const { user, logOut } = useContext(AuthContext);
  const {
    _id,
    foodname,
    foodquantity,
    pickuplocation,
    expiredtime,
    image,
    status,
    notes,
    donorphoto,
    donorname,
    donoremail,
    foodId,
  } = items;
  //  console.log(items);
  const handleRequest = (e) => {
    e.preventDefault();
    const additionalNotes = e.target.notes.value;
    const donationmoney = e.target.donationmoney.value;
    const requesterEmail = user.email;
    const requesterName = user.displayName;
    const requesterPhoto = user.photoURL;
    const status = "Pending";
    let reqDate = new Date().toLocaleString();

    const addRequestFood = {
      foodname,
      image,
      _id,
      donoremail,
      donorname,
      donorphoto,
      requesterName,
      requesterEmail,
      requesterPhoto,
      status,
      reqDate,
      pickuplocation,
      expiredtime,
      additionalNotes,
      donationmoney,
      foodId,
    };
    console.log(addRequestFood);

    fetch("https://food-share-server-eight.vercel.app/requestFood", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addRequestFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        navigate("/availableFood");
        Swal.fire({
          text: "Food Request Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
      });
  };
 console.log("Status:", status);
 console.log("User Email:", user.email);
 console.log("Donor Email:", donoremail);
  const isDisabled = (status === "Pending") || (user.email === donoremail);
  console.log("Is Disabled:", isDisabled);
  return (
    <div className="flex justify-center items-center">
      <div class="w-2/4 bg-blue-100 rounded overflow-hidden shadow-lg mb-8 mr-8  ">
        {/* <!-- Food Image --> */}
        <img
          class="w-full h-64 object-cover"
          src={image}
          alt="Food Image"
        ></img>

        <div class="px-6 py-4">
          {/* <!-- Food Name --> */}
          <div class="font-semibold text-2xl mb-2 text-center">{foodname}</div>

          {/* <!-- Donator Image & Name --> */}
          <div class="flex items-center mb-2">
            <img
              class="w-10 h-10 rounded-full mr-2"
              src={donorphoto}
              alt="Donator Image"
            ></img>
            <span className="font-semibold">{donorname}</span>
          </div>

          {/* <!-- Pickup Location --> */}
          <p class="text-gray-700 text-base mb-2">
            Pickup Location: {pickuplocation}
          </p>

          {/* <!-- Food Quantity --> */}
          <p class="text-gray-700 text-base mb-2">
            Served at {foodquantity} People
          </p>
          <div class="text-gray-700 text-base mb-2 flex ">
            Status :{" "}
            <div
              className={`font-semibold ml-2 text-green-600 ${
                status === "Pending" ? "text-red-600" : ""
              }`}
            >
              {status}
            </div>{" "}
          </div>

          {/* <!-- Expired Date/Time --> */}
          <p class="text-gray-700 text-base mb-2">Expires: {expiredtime} Hr</p>

          {/* <!-- Additional Notes --> */}
          <p class="text-gray-700 text-base mb-2">Notes: {notes}.</p>
          <p class=" text-base text-red-600 mb-6">
            {user.email === donoremail ? "You added this food, so that you can't request": ""}
          </p>

          {/* Modal open when click request button*/}
          {/* <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
              status === "Pending" ? "pointer-events-none opacity-50" : ""
            }`}
            // class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Request
          </button> */}

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
              isDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Request
          </button>

          {/* modal */}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle "
          >
            {/* <form></form> */}
            <form
              onSubmit={handleRequest}
              className="modal-box bg-blue-300 h-full"
            >
              {/* <div class="w-full bg-blue-100 rounded overflow-hidden shadow-lg mb-8 mr-8  "> */}
              {/* <!-- Food Image --> */}
              <img
                class="w-full h-64 object-cover"
                src={image}
                alt="Food Image"
              ></img>

              <div class="px-6 py-4">
                {/* <!-- Food Name --> */}
                <div class="font-semibold text-2xl mb-2 text-center">
                  {foodname}
                </div>

                {/* <!-- Donator Image & Name --> */}
                <div class="flex items-center mb-2">
                  <img
                    class="w-10 h-10 rounded-full mr-2"
                    src={donorphoto}
                    alt="Donator Image"
                  ></img>
                  <span className="font-semibold mr-4">
                    {donorname} (Donator)
                  </span>
                </div>
                <span className="font-semibold my-2">
                  Email : {donoremail}{" "}
                </span>
                {/* <!-- Pickup Location --> */}
                <p class="text-gray-700 text-base my-2">
                  Pickup Location: {pickuplocation}
                </p>
                {/* <!-- Expired Date/Time --> */}
                <p class="text-gray-700 text-base mb-2">
                  Expires: {expiredtime} Hr
                </p>
                {/* <!-- Pickup Location --> */}
                <p class="text-gray-700 text-base mb-2">Food ID: {_id}</p>
                <h2 className="text-xl font-semibold mt-2">User Info</h2>
                <p class="text-gray-700 font-semibold my-2">
                  Email: {user ? user.email : "no user login"}
                </p>
                {/* <!-- Short Description --> */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-base font-semibold mb-2"
                    for="description"
                  >
                    Additional Notes
                  </label>
                  <input
                    className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
                    name="notes"
                  ></input>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-base font-semibold mb-2"
                    for="description"
                  >
                    Donation Money
                  </label>
                  <input
                    className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
                    name="donationmoney"
                  ></input>
                </div>
                {/* <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded 
                  ${
                    isDisabled ? "pointer-events-none opacity-50" : ""
                  }`}
                  // to={`/food/${_id}`}
                  // class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded"
                >
                  Request
                </button> */}
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                    isDisabled ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  Request
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
            {/* </div> */}
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
