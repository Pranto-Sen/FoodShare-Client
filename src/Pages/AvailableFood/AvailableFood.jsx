// import React, { useEffect, useState } from "react";
// import AvailableFoodCard from "./AvailableFoodCard";
// import { Helmet } from "react-helmet";

// const AvailableFood = () => {
//   const [items, setItems] = useState([]);
//   const [searchFood, setSearchFood] = useState("");
//   const [sortOrder, setSortOrder] = useState(1); // Default ascending sort order

//   useEffect(() => {
//     fetch(`http://localhost:5000/food/${searchFood}`)
//       .then((res) => res.json())
//       .then((data) => setItems(data));
//   }, [searchFood]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const name = e.target.foodname.value;
//     setSearchFood(name);
//   };

//   const handleSort = () => {
//     const sortedItems = [...items]; // Create a new array to avoid mutating state directly
//     sortedItems.sort((a, b) => {
//       // Change 'expiredtime' to the actual field you want to sort by
//       return (a.expiredtime - b.expiredtime) * sortOrder;
//     });
//     setItems(sortedItems);
//     setSortOrder(sortOrder === 1 ? -1 : 1); // Toggle sort order
//   };
//   return (
//     <div>
//       <Helmet>
//         <meta charSet="utf-8" />
//         <title>FoodShare | AvailableFood</title>
//         <link rel="canonical" href="http://mysite.com/example" />
//       </Helmet>

//       <div class="flex items-center space-x-4">
//         {/* <!-- Text input box --> */}
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             name="foodname"
//             class="border border-gray-300 p-2 rounded"
//             placeholder="Enter search text"
//           ></input>

//           {/* <!-- B/</input>utton --> */}
//           <button
//             class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             type="submit"
//           >
//             Search
//           </button>
//         </form>

//         {/* <!-- Sort option dropdown --> */}
//         <div class="relative inline-block text-left">
//           <div>
//             <button
//               onClick={handleSort}
//               type="button"
//               class="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none"
//             >
//               Sort
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-4">
//         {items.map((item) => (
//           <AvailableFoodCard item={item}></AvailableFoodCard>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableFood;

import React, { useEffect, useState } from "react";
import AvailableFoodCard from "./AvailableFoodCard";
import { Helmet } from "react-helmet";

const AvailableFood = () => {
  const [items, setItems] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  const [sortOrder, setSortOrder] = useState(1); // Default ascending sort order
  const [noDataFound, setNoDataFound] = useState(false);
  
  // useEffect(() => {
  //   fetch(`http://localhost:5000/food${searchFood ? `/${searchFood}` : ""}`)
  //     .then((res) => res.json())
  //     .then((data) => setItems(data))
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, [searchFood]);
  useEffect(() => {
    fetch(`http://localhost:5000/food${searchFood ? `/${searchFood}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setNoDataFound(data.length === 0); // Check if data is empty
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setNoDataFound(true); // Set noDataFound to true in case of an error
      });
  }, [searchFood]);

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.foodname.value;
    setSearchFood(name);
  };

  const handleSort = () => {
    const sortedItems = [...items]; // Create a new array to avoid mutating state directly
    sortedItems.sort((a, b) => {
      // Change 'expiredtime' to the actual field you want to sort by
      return (a.expiredtime - b.expiredtime) * sortOrder;
    });
    setItems([...sortedItems]); // Setting the state with a new sorted array
    setSortOrder(sortOrder === 1 ? -1 : 1); // Toggle sort order
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FoodShare | AvailableFood</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="foodname"
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter search text"
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={handleSort}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none"
            >
              Sort
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-4">
        {/* {items.map((item, index) => (
          <AvailableFoodCard key={index} item={item}></AvailableFoodCard>
        ))} */}
        {noDataFound ? ( // Check if no data found
          <p className="text-center text-xl font-semibold">No items found.</p> // Message displayed when no data is found
        ) : (
          items.map((item, index) => (
            <AvailableFoodCard key={index} item={item}></AvailableFoodCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableFood;
