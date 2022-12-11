import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  completeOrder,
  getOrders,
  showOrders,
} from "../../features/ordersSlice";
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
import ProductItem from "./ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

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
  const { totalAmount } = useSelector((state) => state.orders);

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

      if (dateA < dateB) return 1;
      else if (dateA > dateB) return -1;
      return 0;
    };

    setSortedProcuts(productsData.sort(customSort));
    if (productsData && productsData.length > 0) {
      customSort();
    }
  }, [showOrdersData]);

  const notifySuccess = () =>
    toast.success("Məhsul geri alındı", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyComplete = () =>
    toast.success("Sifariş tamamlandı", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
      product.productName ? (
        product.productName
      ) : (
        <Typography sx={{ color: "gray" }}>Məhsul yoxdur</Typography>
      ),
      product.quantity,
      product.amount + " AZN",
      product.date,
      product.orderStatus === "expected" ? (
        <Typography sx={{ color: "gray" }}>gözləmədə..</Typography>
      ) : product.orderStatus === "refusal" ? (
        <Typography sx={{ color: "gray" }}>imtina</Typography>
      ) : (
        <Typography sx={{ color: "green" }}>0 dəq</Typography>
      ),
      product.orderStatus === "expected" ? (
        <Typography
          sx={{
            color: "gray",
          }}
        >
          gözləmədə..
        </Typography>
      ) : product.orderStatus === "refusal" ? (
        <Typography
          sx={{
            color: "gray",
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
      product.orderStatus === "expected" ? (
        <Typography sx={{ color: "gray" }}>gözləmədə..</Typography>
      ) : product.orderStatus === "refusal" ? (
        <Typography sx={{ color: "gray" }}>imtina</Typography>
      ) : (
        <Button onClick={() => handleClick(product.id)} variant="contained">
          Geri al
        </Button>
      )
    )
  );

  const handleClick = (id) => {
    const fetchData = async () => {
      const response = await axios
        .put(`https://6391e771b750c8d178d1017a.mockapi.io/orders/${id}`, {
          status: "unending",
          orderStatus: "refusal",
          expirationDate: "",
        })
        .then((res) => {
          dispatch(getOrders(sortedProducts));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          throw new Error(err);
        });
      return response;
    };
    fetchData();
    notifySuccess();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleComplete = async () => {
    await showOrdersData.map((item) =>
      axios
        .delete(`https://6391e771b750c8d178d1017a.mockapi.io/orders/${item.id}`)
        .then(() => {
          dispatch(completeOrder([]));
        })
        .catch((err) => {
          throw new Error(err);
        })
    );
    notifyComplete();
  };

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      {isloaded ? (
        <CircularProgress />
      ) : showOrdersData.length > 0 ? (
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
              <Button
                onClick={handleComplete}
                variant="contained"
                color="error"
              >
                SİFARİŞİ TAMAMLAYIN
              </Button>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ textAlign: "center", mt: "10px" }}>
                Toplam məbləğ: <span>{totalAmount.toFixed(2)}</span>AZN
              </Typography>
            </Box>
          </Box>
          <ToastContainer />
        </>
      ) : (
        <Typography variant="h4" sx={{ mt: 2 }}>
          Hal-hazırda heç bir sifariş yoxdur.
        </Typography>
      )}
    </Box>
  );
};

export default ProductSection;
