import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderAsync,
  showOrders,
} from "../../features/ordersSlice";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Container } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import Product from "../../components/Product";
import AddTable from "../../components/Product/AddTable";
import AddFoods from "../../components/Product/AddFoods";
import axios from "axios";
import { getFoods, showFoods } from "../../features/foodsSlice";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment";
import localization from "moment/locale/az";

const AddProuct = () => {
  const [productName, setProductName] = useState("");
  const [tableName, setTableName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [orders, setOrders] = useState([]);

  const showOrdersData = useSelector(showOrders);
  const showFoodsData = useSelector(showFoods);

  moment.locale("az", localization);

  const productsData = [...showOrdersData];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const foodsData = [...showFoodsData];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("https://6391e771b750c8d178d1017a.mockapi.io/foods")
        .then((res) => {
          dispatch(getFoods(res.data));
        })
        .catch((err) => {
          throw new Error(err);
        });
      return response;
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const ordersData = [...showOrdersData];

    setOrders(ordersData);
  }, [showOrdersData]);

  useEffect(() => {
    const foodName = foodsData?.find(
      (item) => item.productName === productName
    );
    foodName
      ? setAmount((foodName?.amount * quantity).toFixed(2))
      : setAmount(0);
  }, [productName, foodsData, quantity]);

  const notifyEmpty = () =>
    toast.error("Dəyərlər boş ola bilməz", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifySuccess = () =>
    toast.success("Sirafiş əlavə olundu", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleClick = () => {
    if (productName && tableName && quantity) {
      const orderId = orders.find((item) => item.tableName === tableName);

      const updateProducts = async () => {
        const id = Number(orderId.id);
        const response = await axios
          .put(`https://6391e771b750c8d178d1017a.mockapi.io/orders/${id}`, {
            quantity,
            productName,
            amount,
            status: "ending",
            orderStatus: "was given",
            expirationDate: `${moment().format("L")}  ${moment().format(
              "LTS"
            )}`,
          })
          .then((res) => {
            if (res.data.id === id) {
              dispatch(
                createOrderAsync({
                  quantity: res.data.quantity,
                  productName: res.data.productName,
                  amount: res.data.amount,
                })
              );
            }
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            throw new Error(err);
          });
        return response;
      };

      updateProducts();

      notifySuccess();
      setProductName("");
      setTableName("");
      setQuantity("");
    } else {
      notifyEmpty();
    }
  };

  return (
    <Container sx={{ my: "40px" }}>
      <Typography variant="h4">
        Aşağıdakı listdən məhsul seçimini edin
      </Typography>
      <Box>
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Box sx={{ minWidth: 300, display: "flex", gap: 2 }}>
            <AddTable
              tableName={tableName}
              setTableName={setTableName}
              productsData={productsData}
            />
            <AddFoods
              productName={productName}
              setProductName={setProductName}
              foodsData={foodsData}
              productsData={productsData}
            />
          </Box>
          <Box>
            <FormControl>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                label="Miqdar"
                variant="outlined"
                type={"number"}
                disabled={productsData.length === 0}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button
            onClick={handleClick}
            type="submit"
            variant="contained"
            disabled={productsData.length === 0}
          >
            Əlavə et
          </Button>
          <ToastContainer />
          <Typography>
            <b>{amount && quantity ? amount : 0} AZN</b>
          </Typography>
        </Box>
      </Box>
      <Product />
    </Container>
  );
};

export default AddProuct;
