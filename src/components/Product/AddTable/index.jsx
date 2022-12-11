import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const AddTable = ({ tableName, setTableName, productsData }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Masanı seç</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableName}
          label="Product name"
          disabled={productsData.length === 0}
          onChange={(e) => setTableName(e.target.value)}
        >
          {productsData
            ?.map((item) => {
              return (
                <MenuItem key={item.id} value={item.tableName}>
                  {item.tableName}
                </MenuItem>
              );
            })
            .reverse()}
        </Select>
      </FormControl>
    </>
  );
};

export default AddTable;
