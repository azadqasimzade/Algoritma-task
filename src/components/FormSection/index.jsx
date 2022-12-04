import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";

const FormSection = () => {
  const [table, setTable] = React.useState("");
  const [servant, setServant] = React.useState("");

  const handleTable = (event) => {
    setTable(event.target.value);
  };
  const handleServant = (event) => {
    setServant(event.target.value);
  };

  return (
    <Container sx={{ mt: "40px" }}>
      <Typography variant="h4">Select a product from the list below</Typography>
      <form>
        <FormControl>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ minWidth: 150, mt: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Servant
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={servant}
                  label="Select Servant"
                  onChange={handleServant}
                >
                  <MenuItem value={10}>James</MenuItem>
                  <MenuItem value={20}>Monika</MenuItem>
                  <MenuItem value={30}>Sezar</MenuItem>
                  <MenuItem value={40}>Karolina</MenuItem>
                  <MenuItem value={50}>Jessica</MenuItem>
                </Select>
                <Button type="submit" variant="contained" sx={{ mt: "10px" }}>
                  Create an order
                </Button>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 150, mt: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Table
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={table}
                  label="Select Table"
                  onChange={handleTable}
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
      </form>
    </Container>
  );
};

export default FormSection;
