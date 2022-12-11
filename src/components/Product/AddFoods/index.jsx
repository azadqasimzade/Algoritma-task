import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AddFoods = ({ productName, setProductName, productsData, foodsData }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Məhsulun adı</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productName}
          label="Product name"
          disabled={productsData.length === 0}
          onChange={(e) => setProductName(e.target.value)}
        >
          {foodsData.map((item) => (
            <MenuItem key={item.id} value={item.productName}>
              {item.productName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default AddFoods;
