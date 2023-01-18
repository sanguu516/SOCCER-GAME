import { createSlice } from "@reduxjs/toolkit";

const initialState = { teamList: {} }; // 초기 상태 정의

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getteam: (state, action) => {
      // console.log("action????????????", action.payload);
      state.teamList = action.payload.teamdata;
    },
    maingetteam: (state, action) => {
      // console.log("action????????????", action.payload);
      state.teamList = JSON.parse(action.payload);
    },
  },
});

export const { getteam, maingetteam } = teamSlice.actions; // 액션 생성함수
export default teamSlice.reducer; // 리듀서
