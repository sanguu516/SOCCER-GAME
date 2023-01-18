import { createSlice } from "@reduxjs/toolkit";

interface CountState {
  val: number;
}

const initialState: CountState = {
  val: 0,
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increment(state) {
      state.val += 1;
    },
    decrement(state) {
      state.val -= 1;
    },
  },
  extraReducers: (builder) => {},
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
