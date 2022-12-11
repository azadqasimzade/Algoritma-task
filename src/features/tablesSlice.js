import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tablesData: [],
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    getTables: (state, action) => {
      state.tablesData = action.payload;
    },
  },
});

export const { getTables } = tablesSlice.actions;
export const showTables = (state) => state.tables.tablesData;
export default tablesSlice.reducer;
