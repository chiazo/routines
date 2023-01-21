import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header, Footer } from "./components";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => (
  <div className="main">
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
