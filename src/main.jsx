import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error-Page";
import Shop from "./routes/Shop";
import { CartProvider } from "./components/CartProvider";
import Cart from "./components/cart";
import About from "./routes/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
    ],
  },

  // {
  //   path: "item/:itemId",
  //   element: <ItemPage />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
