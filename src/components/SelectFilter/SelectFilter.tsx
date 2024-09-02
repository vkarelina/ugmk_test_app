import "./selectFilter.css";

import { ChangeEvent, memo } from "react";

interface SelectFilterProps {
  filter: string | null;
  handleChange: (nameFilter: string) => void;
}

const SelectFilter = ({ filter, handleChange }: SelectFilterProps) => {
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    handleChange(event.target.value);
  };

  if (filter) {
    return (
      <select value={filter} onChange={handleChangeSelect}>
        <option value={"all"}>Все продукты</option>
        <option value={"product1"}>Продукт 1</option>
        <option value={"product2"}>Продукт 2</option>
        <option value={"product3"}>Продукт 3</option>
      </select>
    );
  }
};

export default memo(SelectFilter);
