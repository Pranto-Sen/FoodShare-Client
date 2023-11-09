import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const FoodRequest = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://food-share-server-eight.vercel.app/foodRequest/${email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [email]);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        fetch(`https://food-share-server-eight.vercel.app/reqfood/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                text: "Remove Successfully",
                icon: "success",
                confirmButtonText: "Done",
              });
              const remaining = items.filter((item) => item._id !== id);
              setItems(remaining);
              navigate("/foodRequest");
            }
          });
        // form.submit();
        console.log(id);
      }
    });
  };

  const columns = [
    {
      name: <div className="text-xl">Donorname </div>,
      cell: (row) => <div className="text-lg">{row.donorname} </div>,
    },
    {
      name: <div className="text-xl">Pickuplocation </div>,
      cell: (row) => <div className="text-lg ">{row.pickuplocation}</div>,
    },
    {
      name: <div className="text-xl">Request Date </div>,
      cell: (row) => <div className="text-lg ">{row.reqDate}</div>,
    },
    {
      name: <div className="text-xl">Donation Amount </div>,
      cell: (row) => (
        <div className="text-lg ">
          {row.donationmoney}
        </div>
      ),
    },

    {
      name: <div className="text-xl">Status </div>,
      cell: (row) => <div className="text-lg ">{row.status}</div>,
    },

    {
      name: "",
      selector: (row) => (
        <button
          onClick={() => {
            handleDelete(row._id);
          }}
          // className="bg-red-300 px-6 py-2 rounded-md text-base font-semibold"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
            row.status === "Delivered" ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Remove
        </button>
      ),
    },
  ];
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FoodShare | FoodRequest</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default FoodRequest;
