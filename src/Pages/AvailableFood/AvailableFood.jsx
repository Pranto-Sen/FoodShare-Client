import React, { useEffect, useState } from "react";
import AvailableFoodCard from "./AvailableFoodCard";

const AvailableFood = () => {
  const [items, setItems] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  const [sortOrder, setSortOrder] = useState(1); // Default ascending sort order

  useEffect(() => {
    fetch(`http://localhost:5000/food/${searchFood}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
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
    setItems(sortedItems);
    setSortOrder(sortOrder === 1 ? -1 : 1); // Toggle sort order
  };
  return (
    <div>
      <div class="flex items-center space-x-4">
        {/* <!-- Text input box --> */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="foodname"
            class="border border-gray-300 p-2 rounded"
            placeholder="Enter search text"
          ></input>

          {/* <!-- B/</input>utton --> */}
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* <!-- Sort option dropdown --> */}
        <div class="relative inline-block text-left">
          <div>
            <button
              onClick={handleSort}
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none"
            >
              Sort
            </button>
          </div>
          {/* <!-- Dropdown content --> */}
          {/* <div class="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Large to Small
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Small to Large
            </a>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-4">
        {items.map((item) => (
          <AvailableFoodCard item={item}></AvailableFoodCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;
