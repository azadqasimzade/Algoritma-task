import React, { useState } from "react";
import { useSelector } from "react-redux";
import { showOrders } from "../../features/ordersSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import Product from "../../components/Product";

const AddProuct = () => {
  const [productName, setProductName] = useState("");
  const [tableName, setTableName] = useState("");
  const [quantity, setQuantity] = useState("");

  const showOrdersData = useSelector(showOrders);

  const productsData = [...showOrdersData];

  return (
    <Container sx={{ my: "40px" }}>
      <Typography variant="h4">
        Aşağıdakı listdən məhsul seçimini edin
      </Typography>
      <Box>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Box sx={{ minWidth: 300, display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Masanı seç</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tableName}
                label="Product name"
                onChange={(e) => setTableName(e.target.value)}
              >
                {productsData.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.tableName}>
                      {item.tableName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Məhsulun adı
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productName}
                label="Product name"
                onChange={(e) => setProductName(e.target.value)}
              >
                {productsData.map((item) => (
                  <MenuItem key={item.id} value={item.productName}>
                    {item.productName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                label="Miqdar"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained">
            Əlavə et
          </Button>
          <Typography>
            <b>$ 20</b>
          </Typography>
        </Box>
      </Box>
      <Product />
    </Container>
  );
};

export default AddProuct;
