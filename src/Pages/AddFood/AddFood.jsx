import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
 
const AddFood = () => {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddFood = (e) => {
    e.preventDefault();
    const foodname = e.target.foodname.value;
    const foodquantity = e.target.foodquantity.value;
    const pickuplocation = e.target.pickuplocation.value;
    const expiredtime = e.target.expiredtime.value;
    const image = e.target.image.value;
    const status = e.target.status.value;
    const notes = e.target.notes.value;
    const donorphoto = user.photoURL;
    const donorname = user.displayName;
    const donoremail = user.email;
    const foodId = Math.floor(Math.random() * Date.now()).toString(16);


    const addFood = {
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
    };
    console.log(addFood);

    fetch("https://food-share-server-eight.vercel.app/addFood", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          text: "Food added Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
        navigate("/");
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>FoodShare | AddFood</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <form
        onSubmit={handleAddFood}
        className="bg-blue-300 shadow-md px-8 py-8 sm:py-6 lg:py-10 mb-4 rounded-lg"
      >
        {/* <!-- food name and quantity (2 columns on large screens) --> */}
        <div className="mb-4 ">
          <h2 className="text-2xl font-bold">Donor Info</h2>
          <div className=" flex pt-4 text-xl font-semibold">
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/5GGZtst/360-F-483909569-OI4-LKNe-Fg-Hwvv-Vju60fej-Ld9gj43d-Icd.jpg"
              }
              className="w-6 h-6 mr-2 rounded-lg"
            ></img>
            <p>{user.displayName}</p>
            <p className="pl-8">Email: {user.email}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold py-4">Food Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="name"
            >
              Food Name
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="foodname"
              type="text"
              placeholder="Food Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="brand"
            >
              Food Quantity
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="foodquantity"
              type="text"
              placeholder="Food Quantity"
            />
          </div>
        </div>

        {/* <!-- location and time (2 columns on large screens) --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="type"
            >
              Pickup Location
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="pickuplocation"
              type="text"
              placeholder="Pickup Location"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="price"
            >
              Expired Time
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="expiredtime"
              type="text"
              placeholder="Expired Time"
            />
          </div>
        </div>

        {/* <!-- image and status (2 columns on large screens) --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="image"
            >
              Food Image
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="image"
              type="text"
              accept="image/*"
              placeholder="Upload an image"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold mb-2"
              for="image"
            >
              Food Status
            </label>
            <input
              className="w-full py-2 px-3 font-semibold text-green-600 leading-tight border rounded focus:outline-none focus:shadow-outline"
              name="status"
              type="text"
              defaultValue="Available"
            />
          </div>
        </div>
        {/* <!-- Short Description --> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-semibold mb-2"
            for="description"
          >
            Additional Notes
          </label>
          <textarea
            className="w-full py-2 px-3 text-gray-700 leading-tight border rounded focus:outline-none focus:shadow-outline"
            name="notes"
            rows="2"
            placeholder="Short Description"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
