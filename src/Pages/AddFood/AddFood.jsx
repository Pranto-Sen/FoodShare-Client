import React from "react";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();
  const handleAddFood = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const brand = e.target.brand.value;
    const type = e.target.type.value;
    const price = e.target.price.value;
    const image = e.target.image.value;
    const description = e.target.description.value;
    const rating = e.target.rating.value;

    const addProduct = { name, brand, type, price, image, description, rating };
    // console.log(data);

    fetch(
      "https://technology-and-electronics-server-jciw16uv3.vercel.app/addProduct",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          text: "Product added Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
        navigate("/");
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <form
        onSubmit={handleAddFood}
        className="bg-blue-300 shadow-md px-8 py-8 sm:py-6 lg:py-10 mb-4 rounded-lg"
      >
        {/* <!-- food name and quantity (2 columns on large screens) --> */}
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
              name="image"
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
