import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Banner from "../Pages/Banner/Banner";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddFood from "../Pages/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import AvailableFood from "../Pages/AvailableFood/AvailableFood";
import SingleFood from "../Pages/SingleFood/SingleFood";
import ManageFood from "./../ManageFood/ManageFood";
import UpdateFood from "../ManageFood/UpdateFood";
import Manage from "../ManageFood/Manage";
import FoodRequest from "../Pages/FoodRequest/FoodRequest";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://food-share-server-eight.vercel.app/food"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/availableFood",
        element: (
          <PrivateRoute>
            <AvailableFood></AvailableFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/foodDetails/:id",
        element: (
          <PrivateRoute>
            <SingleFood></SingleFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://food-share-server-eight.vercel.app/foodDetails/${params.id}`
          ),
      },
      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://food-share-server-eight.vercel.app/foodDetails/${params.id}`
          ),
      },
      {
        path: "/manageFood",
        element: (
          <PrivateRoute>
            <ManageFood></ManageFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage/:id",
        element: (
          <PrivateRoute>
            <Manage></Manage>
          </PrivateRoute>
        ),
        //   loader: ({ params }) =>
        //     fetch(`http://localhost:5000/manage/${params.id}`),
      },
      {
        path: "/foodRequest",
        element: (
          <PrivateRoute>
            <FoodRequest></FoodRequest>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
