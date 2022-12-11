import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/ordersSlice";
import tablesReduer from "../features/tablesSlice";
import servantsReducer from "../features/servantsSlice";
import foodsReducer from "../features/foodsSlice";

export default configureStore({
  reducer: {
    orders: ordersReducer,
    tables: tablesReduer,
    servants: servantsReducer,
    foods: foodsReducer,
  },
});
