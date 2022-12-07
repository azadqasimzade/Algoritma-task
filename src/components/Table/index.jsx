/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
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

const columns = [
  { id: "ss", label: "N", minWidth: "100%" },
  { id: "table", label: "Table", minWidth: 100 },
  {
    id: "servant",
    label: "Servant",
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
    label: "Amount",
    minWidth: "100%",
    align: "center",
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
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
  const [orders, setOrders] = useState([]);
  const [notEndedOrders, setNotEndedOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("./data.json")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return response;
    };
    fetchData();
  }, []);

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
      order.tableNumber,
      order.servant,
      order.status,
      "$" + order.amount,
      order.expirationDate,
      <Button onClick={() => handleClick(order.id)}>See</Button>
    )
  );

  const handleClick = (id) => {
    const ordersD = [...orders];
    ordersD.map((order) => {
      if (id === order.id) {
        setModalContent(order);
        setShowModal(true);
      }
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
      const ordersData = [...orders];

      const customSort = (a, b) => {
        const dateA = a?.expirationDate;
        const dateB = b?.expirationDate;

        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        return 0;
      };
      setNotEndedOrders(ordersData.sort(customSort));
    };
    if (orders && orders.length > 0) {
      sortedOrders();
    }
  }, [orders]);

  return (
    <>
      <Box sx={{ mt: { xs: "20px", md: "0px" }, width: "100%" }}>
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
