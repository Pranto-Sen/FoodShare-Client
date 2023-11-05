import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Banner from "../Pages/Banner/Banner";


const router = createBrowserRouter([
  {
    path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Banner></Banner>
        }
    ]
  },
]);

export default router;