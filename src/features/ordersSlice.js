import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://6391e771b750c8d178d1017a.mockapi.io/orders";

const initialState = {
  data: [],
  quantity: 0,
  totalAmount: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.data = action.payload;
    },
    createOrder: (state, action) => {
      state.data.push(action.payload);
      state.quantity = state.data.length;
    }
  },
});

export const createOrderAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, data);

    dispatch(createOrder(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const { createOrder, getOrders } = ordersSlice.actions;
export const showOrders = (state) => state.orders.data;
export default ordersSlice.reducer;
