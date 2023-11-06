import React from "react";
import Banner from "../Banner/Banner";
import { Link, useLoaderData } from "react-router-dom";
import FoodCard from "./FoodCard";

const Home = () => {
  const foods = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-4">
        {foods.slice(0, 6).map((food) => (
          <FoodCard food={food}></FoodCard>
        ))}
      </div>
      <div className="text-center">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          to="/availableFood"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default Home;
