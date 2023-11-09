import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Manage = () => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/manage/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [id]); 

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
        <p>No request found</p>
      )}
    </div>
  );
};

export default Manage;
