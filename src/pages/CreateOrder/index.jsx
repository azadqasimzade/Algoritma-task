import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import ProductSection from "./ProductSection";

const CreateOrder = () => {
  const [table, setTable] = useState("");
  const [servant, setServant] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleCreateOrder = () => {
    console.log(table, servant);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  

  return (
    <Container sx={{ my: "40px" }}>
      <Typography variant="h4">Select a product from the list below</Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <FormControl>
            <Box sx={{ display: "flex", gap: 2, mt: 4, minWidth: 140 }}>
              <Box sx={{ minWidth: 140 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Servant
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={servant}
                    label="Select Servant"
                    onChange={(e) => setServant(e.target.value)}
                  >
                    <MenuItem value={10}>James</MenuItem>
                    <MenuItem value={20}>Monika</MenuItem>
                    <MenuItem value={30}>Sezar</MenuItem>
                    <MenuItem value={40}>Karolina</MenuItem>
                    <MenuItem value={50}>Jessica</MenuItem>
                  </Select>
                  <Button
                    onClick={handleCreateOrder}
                    type="button"
                    variant="contained"
                    sx={{ mt: "10px" }}
                  >
                    Create an order
                  </Button>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 140 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Table
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={table}
                    label="Select Table"
                    onChange={(e) => setTable(e.target.value)}
                  >
                    <MenuItem value={10}>m1</MenuItem>
                    <MenuItem value={20}>k3</MenuItem>
                    <MenuItem value={30}>m5</MenuItem>
                    <MenuItem value={40}>f2</MenuItem>
                    <MenuItem value={50}>c4</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </FormControl>
        </Box>
        {table > 0 && servant > 0 && (
          <Box>
            <FormControl>
              <Box sx={{ display: "flex", gap: 2, mt: 4, minWidth: 140 }}>
                <Box sx={{ minWidth: 150, display: "flex" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Product name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productName}
                      label="Product name"
                      onChange={(e) => setProductName(e.target.value)}
                    >
                      <MenuItem value={10}>Sandwich</MenuItem>
                      <MenuItem value={20}>Steak</MenuItem>
                      <MenuItem value={30}>Shrimp</MenuItem>
                      <MenuItem value={40}>Spaghetti</MenuItem>
                      <MenuItem value={50}>Pizza</MenuItem>
                    </Select>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ mt: "10px" }}
                    >
                      Add To
                    </Button>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <TextField
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      label="Quantity"
                      variant="outlined"
                    />
                  </FormControl>
                  <Typography sx={{ textAlign: "center", mt: 2 }}>
                    <b>$ 20</b>
                  </Typography>
                </Box>
              </Box>
            </FormControl>
          </Box>
        )}
      </form>
      <ProductSection />
    </Container>
  );
};

export default CreateOrder;
