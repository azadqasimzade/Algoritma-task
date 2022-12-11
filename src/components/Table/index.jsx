import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, showOrders } from "../../features/ordersSlice";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import TableItem from "./TableItem";
import ModalSection from "../Modal";
import CreateOrder from "./CreateOrder";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "ss", label: "S/S", minWidth: "100%" },
  { id: "table", label: "Masa", minWidth: 100 },
  {
    id: "servant",
    label: "Xidmətçi",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: "100%",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Məbləğ",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "expirationDate",
    label: "Sonlanma Tarixi",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "button",
    label: "#",
    minWidth: "100%",
    align: "center",
  },
];

const TableSection = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notEndedOrders, setNotEndedOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isloaded, setIsLoaded] = useState(false);

  const showOrdersData = useSelector(showOrders);
  const {totalAmount} = useSelector((state) => state.orders)

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

  function createData(
    ss,
    table,
    servant,
    status,
    amount,
    expirationDate,
    button
  ) {
    return { ss, table, servant, status, amount, expirationDate, button };
  }

  const rows = notEndedOrders.map((order, i) =>
    createData(
      i + 1,
      order.tableName,
      order.servant,
      order.status === "unending" ? "Sonlanmayan" : "Sonlanan",
      order.amount + " AZN",
      order.expirationDate ? order.expirationDate : "--",
      <Button variant="contained" onClick={() => handleClick(order.id)}>
        Bax
      </Button>
    )
  );

  const handleClick = (id) => {
    const ordersD = [...showOrdersData];
    ordersD.map((order) => {
      if (id === order.id) {
        setModalContent(order);
        setShowModal(true);
      }
      // eslint-disable-next-line
      return;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const sortedOrders = () => {
      const ordersData = [...showOrdersData];
      
      const customSort = (a, b) => {
        const dateA = String(a?.expirationDate);
        const dateB = String(b?.expirationDate);

        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        return 0;
      };
      setNotEndedOrders(ordersData.sort(customSort));
    };
    if (showOrdersData && showOrdersData.length > 0) {
      sortedOrders();
    }
  }, [showOrdersData]);

  return (
    <>
      <Box sx={{ mt: { xs: "20px", md: "0px" }, width: "100%" }}>
        <CreateOrder />
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
                Toplam məbləğ: <span>{(totalAmount).toFixed(2)}</span> AZN
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="h4" sx={{mt:2}}>Hal-hazırda heç bir sifariş yoxdur.</Typography>
        )}
      </Box>
      {showModal ? (
        <ModalSection
          showModal={showModal}
          setShowModal={setShowModal}
          {...modalContent}
        />
      ) : null}
    </>
  );
};

export default TableSection;
