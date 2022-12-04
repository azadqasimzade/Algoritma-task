/* eslint-disable array-callback-return */
import * as React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Typography } from "@mui/material";
import TableItem from "./TableItem";

const columns = [
  { id: "ss", label: "S/S", minWidth: "100%" },
  { id: "table", label: "Table", minWidth: 100 },
  {
    id: "servant",
    label: "Servant",
    minWidth: "100%",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: "100%",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: "100%",
    align: "right",
  },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: "100%",
    align: "right",
  },
  {
    id: "#",
    label: "#",
    minWidth: "100%",
    align: "right",
  },
];

const TableSection = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
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

  function createData(ss, table, servant, status, amount, expirationDate) {
    return { ss, table, servant, status, amount, expirationDate };
  }

  const rows = orders.map((order, i) =>
    createData(
      i + 1,
      order.tableNumber,
      order.servant,
      order.status,
      order.amount,
      order.expirationDate
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredOrders = () => {
    const statusOrders = orders.filter(
      (order) => order.status === "sonlanmayan"
    );
    // console.log(statusOrders);
  };

  filteredOrders();

  const test = () => {
    orders.sort((a, b) => {
      // console.log(a.status > b.status);
      if(a.status > b.status) {
        console.log("Sonlanmayan")
      }
    });
  };

  test();

  return (
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
            <TableItem rows={rows} page={page} rowsPerPage={rowsPerPage} columns={columns} />
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

export default TableSection;