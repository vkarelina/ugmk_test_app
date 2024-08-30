import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { BarItemIdentifier, BarChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

import SelectFilter from "./SelectFilter";
import { Product } from "../types";

interface ChartBarProps {
  products: Product[];
}

const ChartBar = ({ products }: ChartBarProps) => {
  const navigate = useNavigate();

  if (!localStorage.getItem("filter")) localStorage.setItem("filter", "all");
  const filterByLocalStorage = localStorage.getItem("filter");

  const data = useRef<Product[] | null>(products);
  const [filter, setFilter] = useState(filterByLocalStorage);

  const handleChange = useCallback((nameFilter: string) => {
    setFilter(nameFilter);
    localStorage.setItem("filter", nameFilter);
  }, [filter]);

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

  const getArrProductsByMonths = (products: Product[]) => {
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
  };

  const filterByFactory = (products: Product[], idFactory: number) => {
    return getArrProductsByMonths(
      products.filter((data) => data.factory_id === idFactory)
    );
  };

  const onItemClick = (_: MouseEvent, barItemIdentifier: BarItemIdentifier) => {
    const indexFactory = Number(barItemIdentifier.seriesId.split("-")[3]) + 1;
    const indexMonth = barItemIdentifier.dataIndex + 1;
    navigate(`/details/${indexFactory}/${indexMonth}`);
  };

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="end"
        alignItems="center"
        border={"1px solid black"}
        borderRadius={3}
        p={2}
        boxSizing="border-box"
      >
        <Typography color={"black"} paddingRight={2}>
          Фильтр по типу продукции
        </Typography>
        <SelectFilter filter={filter} handleChange={handleChange} />
      </Box>
      <Box border={"1px solid black"} mt={3} borderRadius={3}>
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
        <Box display="flex" justifyContent="center" pb={2} gap={2}>
            <Box display="flex">
                <Box bgcolor="#c20d00" width={20} height={20} marginRight={1}></Box>
                <Typography color="#c20d00">Фабрика А</Typography>
            </Box>
            <Box display="flex">
                <Box bgcolor="#0303da" width={20} height={20} marginRight={1}></Box>
                <Typography color="#0303da">Фабрика Б</Typography>
            </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChartBar;
