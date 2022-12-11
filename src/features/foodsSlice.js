import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodsData: [],
};

export const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    getFoods: (state, action) => {
      state.foodsData = action.payload;
    },
  },
});

export const { getFoods } = foodsSlice.actions;
export const showFoods = (state) => state.foods.foodsData;
export default foodsSlice.reducer;
