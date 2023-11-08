

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const email = user.email;
  // let _id = user._id;

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://food-share-server-dfwyot9mj-prantos-projects-ad2c8ed5.vercel.app/manageFood/${email}`
    )
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [email]); // Added dependency to the useEffect

  const handleDelete = (id) => {
    
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
        fetch(
          `https://food-share-server-dfwyot9mj-prantos-projects-ad2c8ed5.vercel.app/food/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                text: "Delete Successfully",
                icon: "success",
                confirmButtonText: "Done",
              });
              const remaining = items.filter((item) => item._id !== id);
              setItems(remaining);
              navigate("/manageFood");
            }
          });
        // form.submit();
        console.log(id);
      }
    });
  };

  const columns = [
    {
      name: <div className="text-xl">Foodname </div>,
      selector: (row) => row.foodname,
      cell: (row) => <div className="text-lg">{row.foodname} </div>,
    },
    {
      name: <div className="text-xl">Foodquantity </div>,
      selector: (row) => row.foodquantity,
      cell: (row) => <div className="text-lg ">{row.foodquantity}</div>,
    },
    {
      name: "",
      selector: (row) => (
        <Link
          to={`/updateFood/${row._id}`}
          className="bg-blue-300 px-6 py-6 rounded-md text-base font-semibold"
        >
          Update
        </Link>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <button
          onClick={() => {
            handleDelete(row._id);
          }}
          className="bg-red-300 px-6 py-2 rounded-md text-base font-semibold"
        >
          Delete
        </button>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <Link
          to={`/manage/${row.foodId}`}
          className="bg-blue-300 px-6 py-2 rounded-md text-base font-semibold"
        >
          Manage
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FoodShare | ManageFood</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default ManageFood;
