import React from "react";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

const ProductItem = ({ rows, page, rowsPerPage, columns }) => {
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

export default ProductItem;
