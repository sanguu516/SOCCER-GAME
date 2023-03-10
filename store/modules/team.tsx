import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  teamList: {
    emailfk: "",
    teamid: 0,
    teamName: "",
    logo: "",
    group: "",
    nickname: "",
    league: "",
  },
  teamplayerinfo: {
    teamplayer: [
      {
        age: 0,
        height: "",
        weight: "",
        photo: "",
        name: "",
        id: 0,
        country: "",
        position: "",
      },
    ],
  },
}; // 초기 상태 정의

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getteam: (state, action) => {
      state.teamList = action.payload;
    },
    maingetteam: (state, action) => {
      // console.log("action????????????", action.payload);
      state.teamList = JSON.parse(action.payload);
    },
    teamplayer: (state, action) => {
      // console.log("action????????????", action.payload);
      state.teamplayerinfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { getteam, maingetteam, teamplayer } = teamSlice.actions; // 액션 생성함수
export default teamSlice.reducer; // 리듀서
