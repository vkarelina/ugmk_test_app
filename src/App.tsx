import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { FactoryId, Product, Serialization } from "./types";
import { ChartBar, ChartPie } from "./pages";

const App = () => {
  const [data, setData] = useState<Serialization | null>(null);

  const serializatedData = (products: Product[]) => {
    const seriaProducts = {
      factory_1: Array.from({ length: 12 }, () => ({
        product_1: 0,
        product_2: 0,
        product_3: 0,
      })),
      factory_2: Array.from({ length: 12 }, () => ({
        product_1: 0,
        product_2: 0,
        product_3: 0,
      })),
    };

    const factoryKeyMap: Record<FactoryId, keyof typeof seriaProducts> = {
      1: "factory_1",
      2: "factory_2",
    };

    products.forEach((product) => {
      if (product.date) {
        const productMonthNumber = Number(product.date.split("/")[1]) - 1;
        const factoryKey = factoryKeyMap[product.factory_id as FactoryId];

        seriaProducts[factoryKey][productMonthNumber].product_1 +=
          product.product1;
        seriaProducts[factoryKey][productMonthNumber].product_2 +=
          product.product2;
        seriaProducts[factoryKey][productMonthNumber].product_3 +=
          product.product3;
      }
    });
    return seriaProducts;
  };

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((res) => setData(serializatedData(res)));
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
