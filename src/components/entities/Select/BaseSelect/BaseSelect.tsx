import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

const BaseSelect: React.FC<{
  title: string;
  row?: { id: number; value: string }[];
  value: string;
  setValue: (value: string) => void;
}> = ({ title, row, value, setValue }) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={title}
          onChange={handleChange}
        >
          <MenuItem value={""}>Не Выбрано</MenuItem>
          {row?.map((rowItem) => (
            <MenuItem key={rowItem.id} value={rowItem.id}>{rowItem.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BaseSelect;
