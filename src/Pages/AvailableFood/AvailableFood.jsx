
import React, { useEffect, useState } from "react";
import AvailableFoodCard from "./AvailableFoodCard";
import { Helmet } from "react-helmet";

const AvailableFood = () => {
  const [items, setItems] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  const [sortOrder, setSortOrder] = useState(1); 
  const [noDataFound, setNoDataFound] = useState(false);
 
  useEffect(() => {
    fetch(`http://localhost:5000/food${searchFood ? `/${searchFood}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setNoDataFound(data.length === 0); 
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setNoDataFound(true); 
      });
  }, [searchFood]);

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.foodname.value;
    setSearchFood(name);
  };

  const handleSort = () => {
    const sortedItems = [...items]; 
    sortedItems.sort((a, b) => {
      return (a.expiredtime - b.expiredtime) * sortOrder;
    });
    setItems([...sortedItems]); 
    setSortOrder(sortOrder === 1 ? -1 : 1); 
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FoodShare | AvailableFood</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="flex items-center justify-center pt-6">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="foodname"
            className="border border-gray-300 p-2 rounded mr-2"
            placeholder="Enter search text"
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="ml-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-4">
       
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
