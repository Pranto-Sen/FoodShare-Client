// import React from 'react';
// import { useState } from 'react';
// import { useLoaderData, useParams } from 'react-router-dom';

// const Manage = () => {
//     // const items = useLoaderData();
//     const [items, setitems] = useState([]);
//     const { foodId } = useParams()
//     console.log(foodId);
//     const [isLoading, setIsLoading] = useState(true);
//       fetch(
//       `http://localhost:5000/manage/${foodId}`,
//       {
//         method: "GET",
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setitems(data);
//         setIsLoading(false);
//       });
//   };

//     // const { foodname,
//     //   image,
//     //   _id,
//     //   donoremail,
//     //   donorname,
//     //   donorphoto,
//     //   requesterName,
//     //   requesterEmail,
//     //   requesterPhoto,
//     //   status,
//     //   reqDate,
//     //   pickuplocation,
//     //   expiredtime,
//     //   additionalNotes,
//     //   donationmoney,
//     //     foodId } = items;
//     //  useEffect(() => {
//     //    setIsLoading(false);
//     //    if (items && items.length > 0) {
//     //      setDataAvailable(true);
//     //    }
//     //  }, [items]);
//     return (
//         <div className="flex justify-center pt-6">
//         {isLoading ? (<p>loading....</p>) :
//          items.length > 0 ?
//                     items.map((item =>
//     (
//         < div class="w-1/3 rounded-lg shadow-lg overflow-hidden bg-white ">
//           {/* <!-- Requester Image --> */}
//           <div class="h-72 bg-gray-300 flex items-center justify-center">
//             <img
//               src={requesterPhoto}
//               alt="Requester Image"
//               class="object-cover h-full w-full"
//             ></img>
//           </div>
//           <div class="p-4">
//             {/* <!-- Requester Name and Email --> */}
//                     <h2 class="text-xl font-bold mb-2">{requesterName}</h2>
//                     <p class="text-sm text-gray-600 mb-2">{requesterEmail}</p>

//             {/* <!-- Request Time and Date --> */}
//                     <p class="text-sm text-gray-600 mb-2">{reqDate}</p>

//             {/* <!-- Status and 'Delivered' button --> */}
//             <div class="flex justify-between items-center">
//                         <p class="text-sm text-gray-600">Status : {status}</p>

//               <button class="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600">
//                 Change Status to Delivered
//               </button>
//             </div>
//           </div>
//                     </div>)))

//         } :"no data found"

//       </div>
//     );
// };

// export default Manage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const Manage = () => {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();
//   console.log(id);
//   useEffect(() => {
//     fetch(`http://localhost:5000/manage/${id}`, {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         //   console.log(foodId);
//         // Log the data to inspect if it's coming correctly
//         setItems(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <div className="flex justify-center pt-6">
//       {items.length}
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : items.length > 0 ? (
//         items.map((item) => (
//           <div
//             key={item._id}
//             className="w-1/3 rounded-lg shadow-lg overflow-hidden bg-white"
//           >
//             <div className="h-72 bg-gray-300 flex items-center justify-center">
//               <img
//                 src={item.requesterPhoto}
//                 alt="Requester Image"
//                 className="object-cover h-full w-full"
//               />
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">{item.requesterName}</h2>
//               <p className="text-sm text-gray-600 mb-2">
//                 {item.requesterEmail}
//               </p>
//               <p className="text-sm text-gray-600 mb-2">{item.reqDate}</p>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-gray-600">Status: {item.status}</p>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600">
//                   Change Status to Delivered
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No data found {items.length}</p>
//       )}
//     </div>
//   );
// };

// export default Manage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Manage = () => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/manage/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data); // Setting a single object instead of an array
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [id]); // Adding 'id' as a dependency to fetch data when 'id' changes

  const handleStatusChange = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/status/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(updateFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          text: "Status updated Successfully",
          icon: "success",
          confirmButtonText: "Done",
        });
          location.reload();
        // navigate('/manageFood');
        navigate(`/manage/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center pt-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : item ? (
        <div
          key={item._id}
          className="w-1/3 rounded-lg shadow-lg overflow-hidden bg-white"
        >
          <div className="h-72 bg-gray-300 flex items-center justify-center">
            <img
              src={item.requesterPhoto}
              alt="Requester Image"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{item.requesterName}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.requesterEmail}</p>
            <p className="text-sm text-gray-600 mb-2">{item.reqDate}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Status: {item.status}</p>
              <button
                onClick={() => handleStatusChange(item.foodId)}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                  item.status === "Delivered"
                    ? "pointer-events-none opacity-60"
                    : ""
                }`}
                // className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
              >
                Change Status to Delivered
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default Manage;
