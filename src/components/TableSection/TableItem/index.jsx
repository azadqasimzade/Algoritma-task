import React from "react";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

const TableItem = ({ rows, page, rowsPerPage, columns }) => {
  return (
    <>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, i) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if (row.status === "sonlanmayan") {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Typography
                          sx={{
                            color: row.status === "sonlanmayan" ? "red" : "",
                          }}
                          >
                          {value}
                        </Typography>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <Typography>{value}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </>
  );
};

export default TableItem;
