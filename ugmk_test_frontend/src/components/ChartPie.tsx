import { useRef } from "react";
import { useParams } from "react-router-dom";

import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";

import { Product } from "../types";

interface ChartPieProps {
  products: Product[];
}

const ChartPie = ({ products }: ChartPieProps) => {
  const data = useRef<Product[] | null>(products);
  const params = useParams();

  const getCountProduct = () => {
    const id_factory = Number(params.id_factory);
    const id_mounth = Number(params.id_mounth);

    if (!data.current) return { product1: 0, product2: 0 };
    return data.current.reduce(
      (acc, current) => {
        if (current.date) {
          const productMountNumber = Number(current.date.split("/")[1]);
          if (
            productMountNumber === id_mounth &&
            current.factory_id === id_factory
          ) {
            return {
              ...acc,
              product1: acc.product1 + current.product1,
              product2: acc.product2 + current.product2,
            };
          }
        }
        return acc;
      },
      { product1: 0, product2: 0 }
    );
  };

  const countProduct = getCountProduct();

  return (
    <>
    <Typography color={"black"} mb={6} variant="h5">Статистика по продукции фабрики Б за месяц</Typography>
      {data.current && (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: countProduct.product1, label: "Продукт 1", color: "#058b05" },
                { id: 1, value: countProduct.product2, label: "Продукт 2", color: "#caa012" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      )}
    </>
  );
};

export default ChartPie;
