import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './jsx/Home.jsx'
import Play from './jsx/Play.jsx'
import Error from './jsx/Error.jsx';

const router = createBrowserRouter([
  { path: "/", element: <Home/>, errorElement:<Error/>},
  { path: "/play", element: <Play/>, errorElement:<Error/>},
  {path: "*", element: <Error/>}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
