import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getServants, showServants } from "../../../../features/servantsSlice";

const ServantData = ({ servant, setServant }) => {
  const showServantsData = useSelector(showServants);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("https://6391e771b750c8d178d1017a.mockapi.io/servants")
        .then((res) => {
          dispatch(getServants(res.data));
        })
        .catch((err) => {
          throw new Error(err);
        });
      return response;
    };
    fetchData();
  }, [dispatch]);
  
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Xidmətçini seç</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={servant}
          label="Select Servant"
          onChange={(e) => setServant(e.target.value)}
        >
          {showServantsData.map((item) => (
            <MenuItem key={item.id} value={item.servant}>
              {item.servant}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ServantData;
