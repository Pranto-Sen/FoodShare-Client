import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateFood = () => {
     const navigate = useNavigate();
    const items = useLoaderData()
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
    } = items;
    const handleUpdate = (e) => {
        e.preventDefault();
         const foodname = e.target.foodname.value;
         const foodquantity = e.target.foodquantity.value;
         const pickuplocation = e.target.pickuplocation.value;
         const expiredtime = e.target.expiredtime.value;
         const image = e.target.image.value;
         const status = e.target.status.value;
         const notes = e.target.notes.value;
        
        
        const updateFood = {
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
        };
        console.log(updateFood);

         fetch(
           `https://food-share-server-dfwyot9mj-prantos-projects-ad2c8ed5.vercel.app/updateFood/${_id}`,
           {
             method: "PUT",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(updateFood),
           }
         )
           .then((res) => res.json())
           .then((data) => {
             console.log(data);
             Swal.fire({
               text: "Food updated Successfully",
               icon: "success",
               confirmButtonText: "Done",
             });
             navigate("/manageFood");
           })
           .catch((error) => {
             console.error(error);
           });
  
    }
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <form onSubmit={handleUpdate} className="bg-blue-300 shadow-md px-8 py-8 sm:py-6 lg:py-10 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold py-4">Update Food Info</h2>
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
                defaultValue={foodname}
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
                defaultValue={foodquantity}
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
                defaultValue={pickuplocation}
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
                defaultValue={expiredtime}
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
                defaultValue={image}
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
                defaultValue={status}
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
              defaultValue={notes}
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
};

export default UpdateFood;