import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync } from "../../../features/ordersSlice";
import { Button, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { nanoid } from "nanoid";
import moment from "moment/moment";
import localization from "moment/locale/az";
import { ToastContainer, toast } from "react-toastify";
import TablesData from "./TablesData";
import ServantsData from "./ServantsData";
import { showTables } from "../../../features/tablesSlice";

const CreateOrder = () => {
  const [table, setTable] = useState("");
  const [servant, setServant] = useState("");
  const [tables, setTables] = useState([]);

  const showTablesData = useSelector(showTables);

  const dispatch = useDispatch();

  useEffect(() => {
    const tablesData = [showTablesData];
    tablesData.map((item) => setTables(item));
  }, [showTablesData]);

  moment.locale("az", localization);

  const notifySuccess = () =>
    toast.success("Sifariş yaradıldı", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyEmpty = () =>
    toast.error("Dəyərlər boş olmamalıdır", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyAlready = () =>
    toast.error("Masa artıq əlavə edilib", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleCreateOrder = () => {
    const alreadyTables = tables.filter((item) => item.tableName === table);

    if (table && servant) {
      if (alreadyTables) {
        notifyAlready();
      } else {
        dispatch(
          createOrderAsync({
            id: nanoid(),
            quantity: 0,
            tableName: table,
            productName: "",
            date: moment().format("LT"),
            waitingTime: moment().startOf("minutes").fromNow(),
            servant,
            status: "unending",
            orderStatus: "refusal",
            amount: 0,
            expirationDate: "",
          })
        );
        notifySuccess();
        setServant("");
        setTable("");
      }
    } else {
      notifyEmpty();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <FormControl>
            <Box sx={{ display: "flex", gap: 2, mb: 4, minWidth: 150 }}>
              <ServantsData servant={servant} setServant={setServant} />
              <TablesData table={table} setTable={setTable} />
            </Box>
            <Button
              onClick={handleCreateOrder}
              type="button"
              variant="contained"
              sx={{ mb: 1 }}
            >
              SİFARİŞ YARAT
            </Button>
          </FormControl>
        </Box>
        <ToastContainer />
      </form>
    </Box>
  );
};

export default CreateOrder;
