import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import TableItem from "../../../components/TableSection/TableItem";

const columns = [
  { id: "number", label: "Number", minWidth: "100%" },
  { id: "productName", label: "Product Name", minWidth: 100 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderTime",
    label: "Order Time",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "waitingTime",
    label: "Waiting Time",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "button",
    label: "#",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "buyBack",
    label: "Buy Back",
    minWidth: "100%",
    align: "center",
  },
];

const ProductSection = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("./product.json")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return response;
    };
    fetchData();
  }, []);

  function createData(
    number,
    productName,
    quantity,
    amount,
    orderTime,
    waitingTime,
    button,
    buyBack
  ) {
    return {
      number,
      productName,
      quantity,
      amount,
      orderTime,
      waitingTime,
      button,
      buyBack,
    };
  }

  const rows = products.map((product, i) =>
    createData(
      i + 1,
      product.productName,
      product.quantity,
      product.amount,
      product.date,
      product.status,
      <Button>Was Given</Button>,
      <Button>Buy back</Button>
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableItem
              rows={rows}
              page={page}
              rowsPerPage={rowsPerPage}
              columns={columns}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box>
        <Typography variant="h6" sx={{ textAlign: "right", mt: "10px" }}>
          Total Amount: $<span>543</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductSection;
