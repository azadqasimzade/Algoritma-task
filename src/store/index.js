import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/ordersSlice";
import tablesReduer from "../features/tablesSlice";
import servantsReducer from "../features/servantsSlice";

export default configureStore({
  reducer: {
    orders: ordersReducer,
    tables: tablesReduer,
    servants: servantsReducer,
  },
});
