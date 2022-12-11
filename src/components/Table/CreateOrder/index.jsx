import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { nanoid } from "nanoid";
import moment from "moment/moment";
import localization from "moment/locale/az";
import { ToastContainer, toast } from "react-toastify";
import TablesData from "./TablesData";
import ServantsData from "./ServantsData";
import axios from "axios";
import { createOrderAsync, showOrders } from "../../../features/ordersSlice";
import { showTables } from "../../../features/tablesSlice";

const CreateOrder = () => {
  const [table, setTable] = useState("");
  const [servant, setServant] = useState("");
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const dispatch = useDispatch();

  const showOrdersData = useSelector(showOrders);
  const showTablesData = useSelector(showTables);

  moment.locale("az", localization);

  useEffect(() => {
    const ordersData = [...showOrdersData];
    const tablesData = [...showTablesData];

    setOrders(ordersData);
    setTables(tablesData);
  }, [showOrdersData, showTablesData]);

  const notifySuccess = () =>
    toast.success("Sifariş yaradıldı", {
      position: "top-right",
      autoClose: 2000,
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
      autoClose: 2000,
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
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleCreateOrder = () => {
    const alreadyTable = orders.find((item) => item.tableName === table);

    if (alreadyTable) {
      notifyAlready();
    } else if (table && servant) {
      const updateTable = async () => {
        const tableId = tables.find((item) => item?.tableName === table);

        const id = Number(tableId.id);
        const response = await axios
          .put(`https://6391e771b750c8d178d1017a.mockapi.io/tables/${id}`, {
            tableEmpty: false,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            throw new Error(err);
          });
        return response;
      };
      updateTable();
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
          orderStatus: "expected",
          amount: 0,
          expirationDate: "",
        })
      );
      notifySuccess();
      setServant("");
      setTable("");
    } else {
      notifyEmpty();
    }
  };

  return (
    <Box>
      <form>
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
