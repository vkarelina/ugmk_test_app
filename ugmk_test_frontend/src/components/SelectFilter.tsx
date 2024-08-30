import { memo } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface SelectFilterProps {
  filter: string | null;
  handleChange: (nameFilter: string) => void;
}

const SelectFilter = ({ filter, handleChange }: SelectFilterProps) => {
  const handleChangeSelect = (event: SelectChangeEvent) => {
    handleChange(event.target.value);
    localStorage.setItem("filter", event.target.value);
  };

  return (
    <>
      {filter && (
        <FormControl fullWidth sx={{ width: 180 }}>
          <InputLabel>Продукты</InputLabel>
          <Select
            value={filter}
            label="Продукты"
            onChange={handleChangeSelect}
            sx={{ height: 40 }}
          >
            <MenuItem value={"all"}>Все продукты</MenuItem>
            <MenuItem value={"product1"}>Продукт 1</MenuItem>
            <MenuItem value={"product2"}>Продукт 2</MenuItem>
            <MenuItem value={"product3"}>Продукт 3</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default memo(SelectFilter);
