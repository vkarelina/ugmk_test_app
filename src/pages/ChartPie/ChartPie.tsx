import "./chartPie.css";

import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { PieChart } from "@mui/x-charts";
import { Serialization } from "../../types";

interface ChartPieProps {
  products: Serialization;
}

const months = [
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
];

const factories = ["A", "Б"];

const ChartPie = ({ products }: ChartPieProps) => {
  const { id_factory, id_mounth } = useParams();
  const idFactory = `factory_${id_factory}` as keyof typeof products;
  const idMounth = Number(id_mounth);

  const getCountProduct = useMemo(() => {
    return products[idFactory][idMounth];
  }, [id_factory, id_mounth]);

  return (
    <>
      <h2>
        Статистика по продукции фабрики {factories[Number(id_factory) - 1]} за
        месяц {months[idMounth - 1]}
      </h2>
      {getCountProduct && (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: getCountProduct.product_1,
                  label: "Продукт 1",
                  color: "#058b05",
                },
                {
                  id: 1,
                  value: getCountProduct.product_2,
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
