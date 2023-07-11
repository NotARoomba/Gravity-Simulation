import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './jsx/Home.jsx'
import Play from './jsx/Play.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/play", element: <Play/> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
