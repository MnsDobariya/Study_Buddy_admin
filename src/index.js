
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "App";

//React Context Provider
import { SoftUIControllerProvider } from "context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  
    <SoftUIControllerProvider>
      <ToastContainer/>
      <Provider store={store}>
      <App />
      </Provider>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
