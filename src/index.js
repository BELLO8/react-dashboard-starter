import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { AppRoute } from "./router/AppRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={AppRoute} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
