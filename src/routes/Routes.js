import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProuct from "../pages/AddProuct";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/add-product" element={<AddProuct />} />
    </Routes>
  );
}

export default Routers;
