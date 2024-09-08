import "./chartBar.css";

import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { BarItemIdentifier, BarChart } from "@mui/x-charts";

import SelectFilter from "../../components/SelectFilter/SelectFilter";
import { ProductSeria, Serialization } from "../../types";

interface ChartBarProps {
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

const ChartBar = ({ products }: ChartBarProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(
    () => localStorage.getItem("filter") || "all"
  );
  const data = useRef<Serialization | null>(products);

  const handleChange = useCallback((nameFilter: string) => {
    setFilter(nameFilter);
    localStorage.setItem("filter", nameFilter);
  }, []);

  const getArrProductsByMonths = useCallback(
    (products: ProductSeria[]) => {
      const arrayProductsByMonths = new Array(12).fill(0);

      products.forEach((product, index) => {
        switch (filter) {
          case "all":
            arrayProductsByMonths[index] =
              (product.product_1 + product.product_2 + product.product_3) *
              0.001;
            break;
          case "product1":
            arrayProductsByMonths[index] = product.product_1 * 0.001;
            break;
          case "product2":
            arrayProductsByMonths[index] = product.product_2 * 0.001;
            break;
          case "product3":
            arrayProductsByMonths[index] = product.product_3 * 0.001;
            break;
        }
      });
      return arrayProductsByMonths;
    },
    [filter]
  );

  const onItemClick = (_: React.MouseEvent<SVGElement>, barItemIdentifier: BarItemIdentifier) => {
    const seriesIdAsString = String(barItemIdentifier.seriesId);
    const indexFactory = Number(seriesIdAsString.split("-")[3]) + 1;
    const indexMonth = barItemIdentifier.dataIndex + 1;
    navigate(`/details/${indexFactory}/${indexMonth}`);
  };

  return (
    <>
      <div className="wrapperFilterBar">
        <p>Фильтр по типу продукции</p>
        <SelectFilter filter={filter} handleChange={handleChange} />
      </div>
      <div className="wrapperChartContent">
        {data.current && (
          <BarChart
            xAxis={[{ scaleType: "band", data: months }]}
            series={[
              {
                data: getArrProductsByMonths(data.current.factory_1),
                color: "#c20d00",
              },
              {
                data: getArrProductsByMonths(data.current.factory_2),
                color: "#0303da",
              },
            ]}
            width={1000}
            height={300}
            onItemClick={onItemClick}
          />
        )}
        <div className="wrapperMarkers">
          <div></div>
          <p>Фабрика А</p>
          <div></div>
          <p>Фабрика Б</p>
        </div>
      </div>
    </>
  );
};

export default ChartBar;
