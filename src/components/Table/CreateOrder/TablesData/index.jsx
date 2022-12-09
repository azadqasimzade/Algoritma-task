import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTables, showTables } from "../../../../features/tablesSlice";
import axios from "axios";

const TablesData = ({ table, setTable }) => {
  const showTablesData = useSelector(showTables);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("https://6391e771b750c8d178d1017a.mockapi.io/tables")
        .then((res) => {
          dispatch(getTables(res.data));
        })
        .catch((err) => {
          throw new Error(err);
        });
      return response;
    };
    fetchData();
  }, [dispatch]);
  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Masanı seç</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={table}
          label="Select Table"
          onChange={(e) => setTable(e.target.value)}
        >
          {showTablesData.map((item) => (
            <MenuItem key={item.id} value={item.tableName}>
              {item.tableName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TablesData;
