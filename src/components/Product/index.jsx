import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, showOrders } from "../../features/ordersSlice";
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
import ProductItem from "../ProductItem";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "number", label: "S/S", minWidth: "100%" },
  { id: "productName", label: "Məhsulun adı", minWidth: 100 },
  {
    id: "quantity",
    label: "Miqdar",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Məbləğ",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "orderTime",
    label: "Sifariş Saatı",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "waitingTime",
    label: "Gözləmə",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "status",
    label: "#",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "buyBack",
    label: "Geri",
    minWidth: "100%",
    align: "center",
  },
];

const ProductSection = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedProducts, setSortedProcuts] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);

  const showOrdersData = useSelector(showOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      const response = await axios
        .get("https://6391e771b750c8d178d1017a.mockapi.io/orders")
        .then((res) => {
          dispatch(getOrders(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoaded(false);
      return response;
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const productsData = [...showOrdersData];

    const customSort = (a, b) => {
      const dateA = a?.date;
      const dateB = b?.date;

      if (dateA > dateB) return 1;
      else if (dateA < dateB) return -1;
      return 0;
    };

    setSortedProcuts(productsData.sort(customSort));
    if (productsData && productsData.length > 0) {
      customSort();
    }
  }, [showOrdersData]);

  function createData(
    number,
    productName,
    quantity,
    amount,
    orderTime,
    waitingTime,
    status,
    buyBack
  ) {
    return {
      number,
      productName,
      quantity,
      amount,
      orderTime,
      waitingTime,
      status,
      buyBack,
    };
  }

  const rows = sortedProducts.map((product, i) =>
    createData(
      i + 1,
      product.productName,
      product.quantity,
      product.amount + " AZN",
      product.date,
      product.waitingTime === "refusal" ? (
        <Typography sx={{ color: "gray" }}>imtina</Typography>
      ) : (
        <Typography sx={{ color: "green" }}>
          {product.waitingTime?.slice(0, 2) + "dəq"}
        </Typography>
      ),
      product.orderStatus === "refusal" ? (
        <Typography
          sx={{
            color: "white",
            bgcolor: "#a5b1c2",
            borderRadius: "5px",
            p: 0.8,
          }}
        >
          imtina
        </Typography>
      ) : (
        <Typography
          sx={{
            color: "white",
            bgcolor: "#3ae374",
            borderRadius: "5px",
            p: 0.8,
          }}
        >
          verildi
        </Typography>
      ),
      product.orderStatus === "refusal" ? (
        <Typography sx={{ color: "gray" }}>imtina</Typography>
      ) : (
        <Button variant="contained">Geri al</Button>
      )
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
      {isloaded ? (
        <CircularProgress />
      ) : (
        <>
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
                <ProductItem
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
          <Box
            sx={{
              mt: 2,
              display: { sx: "block", sm: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="error">
                Complete the order
              </Button>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ textAlign: "center", mt: "10px" }}>
                Toplam məbləğ: <span>543</span>AZN
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductSection;
