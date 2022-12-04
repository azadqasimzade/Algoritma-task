import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateOrder from "../pages/CreateOrder";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/create-an-order" element={<CreateOrder />} />
    </Routes>
  );
}

export default Routers;
