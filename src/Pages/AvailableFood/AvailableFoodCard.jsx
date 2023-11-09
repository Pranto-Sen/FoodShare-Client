import React from "react";
import { Link } from "react-router-dom";

const AvailableFoodCard = ({ item }) => {
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
  } = item;
  return (
    <div className="gap-7">
      <div class="max-w-md bg-blue-100 rounded overflow-hidden shadow-lg mb-8 mr-8">
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

          {/* <!-- Food Quantity --> */}
          <p class="text-gray-700 text-base mb-2">
            Served at {foodquantity} People
          </p>

          {/* <!-- Pickup Location --> */}
          <p class="text-gray-700 text-base mb-2">
            Pickup Location: {pickuplocation}
          </p>

          {/* <!-- Expired Date/Time --> */}
          <p class="text-gray-700 text-base mb-2">Expires: {expiredtime} Hr</p>

          {/* <!-- Additional Notes --> */}
          <p class="text-gray-700 text-base mb-6">Notes: {notes}.</p>

          {/* <!-- View Detail Button --> */}
          <Link
            to={`/foodDetails/${_id}`}
            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableFoodCard;
