import React, { useEffect, useState } from "react";
import AvailableFoodCard from "./AvailableFoodCard";

const AvailableFood = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/food")
      .then((res) => res.json())
      .then((data) => setItems(data));
  });
  return (
    <div>
    
      <div class="flex items-center space-x-4">
  {/* <!-- Text input box --> */}
  <input type="text" class="border border-gray-300 p-2 rounded" placeholder="Enter search text"></input>

  {/* <!-- B/</input>utton --> */}
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Search
  </button>

  {/* <!-- Sort option dropdown --> */}
  <div class="relative inline-block text-left">
    <div>
      <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none">
        Sort
      </button>
    </div>
    {/* <!-- Dropdown content --> */}
    <div class="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg hidden">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Large to Small</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Small to Large</a>
    </div>
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
