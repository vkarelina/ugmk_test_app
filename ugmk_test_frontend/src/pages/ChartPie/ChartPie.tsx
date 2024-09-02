import "./chartPie.css";

import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import { PieChart } from "@mui/x-charts";

import { Product } from "../../types";

interface ChartPieProps {
  products: Product[];
}

const ChartPie = ({ products }: ChartPieProps) => {
  const data = useRef<Product[] | null>(products);
  const { id_factory, id_mounth } = useParams();
  const idFactory = Number(id_factory);
  const idMounth = Number(id_mounth);

  const factories = useMemo(() => ["A", "Б"], []);

  const months = useMemo(
    () => [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    []
  );

  const getCountProduct = useMemo(() => {
    if (!data.current) return { product1: 0, product2: 0 };
    return data.current.reduce(
      (acc, current) => {
        if (current.date) {
          const productMountNumber = Number(current.date.split("/")[1]);
          if (
            productMountNumber === idMounth &&
            current.factory_id === idFactory
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
  }, [data, id_factory, id_mounth]);

  return (
    <>
      <h2>
        Статистика по продукции фабрики {factories[idFactory - 1]} за месяц {months[idMounth - 1]}
      </h2>
      {getCountProduct && (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: getCountProduct.product1,
                  label: "Продукт 1",
                  color: "#058b05",
                },
                {
                  id: 1,
                  value: getCountProduct.product2,
                  label: "Продукт 2",
                  color: "#caa012",
                },
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
