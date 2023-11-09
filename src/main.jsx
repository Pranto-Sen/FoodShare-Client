import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Routes/Routes.jsx';
import { RouterProvider } from "react-router-dom";
import AuthProvider from './Providers/AuthProvider.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


// https://food-share-server-dfwyot9mj-prantos-projects-ad2c8ed5.vercel.app/
// https://food-share-server-eight.vercel.app/
// https://super-axolotl-715762.netlify.app/