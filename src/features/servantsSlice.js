import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servantsData: [],
};

export const servantsSlice = createSlice({
  name: "servants",
  initialState,
  reducers: {
    getServants: (state, action) => {
      state.servantsData=action.payload;
    },
  },
});

export const { getServants } = servantsSlice.actions;
export const showServants = (state) => state.servants.servantsData;
export default servantsSlice.reducer;
