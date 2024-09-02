import "./chartBar.css";

import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { BarItemIdentifier, BarChart } from "@mui/x-charts";

import SelectFilter from "../../components/SelectFilter/SelectFilter";
import { Product } from "../../types";

interface ChartBarProps {
  products: Product[];
}

const ChartBar = ({ products }: ChartBarProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(
    () => localStorage.getItem("filter") || "all"
  );
  const data = useRef<Product[] | null>(products);

  const handleChange = useCallback((nameFilter: string) => {
    setFilter(nameFilter);
    localStorage.setItem("filter", nameFilter);
  }, []);

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

  const getArrProductsByMonths = useCallback(
    (products: Product[]) => {
      const arrayProductsByMonths = new Array(12).fill(0);

      if (Array.isArray(products)) {
        products.forEach((product) => {
          if (product.date) {
            const productMonthNumber = Number(product.date.split("/")[1]) - 1;
            switch (filter) {
              case "all":
                arrayProductsByMonths[productMonthNumber] +=
                  (product.product1 + product.product2 + product.product3) *
                  0.001;
                break;
              case "product1":
                arrayProductsByMonths[productMonthNumber] +=
                  product.product1 * 0.001;
                break;
              case "product2":
                arrayProductsByMonths[productMonthNumber] +=
                  product.product2 * 0.001;
                break;
              case "product3":
                arrayProductsByMonths[productMonthNumber] +=
                  product.product3 * 0.001;
                break;
            }
          }
        });
      }

      return arrayProductsByMonths;
    },
    [filter]
  );

  const filterByFactory = useCallback(
    (products: Product[], idFactory: number) => {
      return getArrProductsByMonths(
        products.filter((data) => data.factory_id === idFactory)
      );
    },
    [getArrProductsByMonths]
  );

  const onItemClick = (_: MouseEvent, barItemIdentifier: BarItemIdentifier) => {
    const indexFactory = Number(barItemIdentifier.seriesId.split("-")[3]) + 1;
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
              { data: filterByFactory(data.current, 1), color: "#c20d00" },
              { data: filterByFactory(data.current, 2), color: "#0303da" },
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
