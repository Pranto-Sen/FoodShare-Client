// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Providers/AuthProvider";
// import DataTable from "react-data-table-component";

// const ManageFood = () => {
//   const { user } = useContext(AuthContext);
//   const email = user.email;
//   // const colunms = [
//   //   {
//   //     name: "food",
//   //     selector: (row) => row.foodname,
//   //   },
//   // //   {
//   // //     name: "foodquantity",
//   // //     selector: (row) => row.foodquantity,
//   // //   },
//   // ];
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     fetch(`http://localhost:5000/manageFood/${email}`)
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   });

//   return (
//     <div>
//       {items.map((item) => (
//         <p>
//           {" "}
//           <DataTable
//             colunms={[
//               {
//                 name: "food",
//                 selector: (row) => row.foodname,
//               },
//             ]}
//             data={item}
//           />
//         </p>
//       ))}
//       manage food : {items.length}
//       {/* {foodname} */}
//       {/* <DataTable></DataTable> */}
//     </div>
//   );
// };

// export default ManageFood;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const ManageFood = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  // let _id = user._id;

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/manageFood/${email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [email]); // Added dependency to the useEffect

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
        <button className="bg-red-300 px-6 py-2 rounded-md text-base font-semibold">
          Delect
        </button>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <button className="bg-blue-300 px-6 py-2 rounded-md text-base font-semibold">
          Manage
        </button>
      ),
    },
  ];

  return (
    <div>
      
      <DataTable  columns={columns} data={items} />
    </div>
  );
};

export default ManageFood;
