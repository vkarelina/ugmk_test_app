import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Product } from "./types";
import { ChartBar, ChartPie } from "./pages";

const App = () => {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((res) => setData(res));
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
