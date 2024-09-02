import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ChartBar from "./pages/ChartBar/ChartBar";
import ChartPie from "./pages/ChartPie/ChartPie";

import { Product } from "./types";

const App = () => {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((res) => res.json())
      .then((res) => setData(res.products));
  }, []);

  if (data) {
    return (
      <Routes>
        <Route path="/" element={<ChartBar products={data} />} />
        <Route
          path="details/:id_factory/:id_mounth"
          element={<ChartPie products={data} />}
        />
      </Routes>
    );
  }
};

export default App;
