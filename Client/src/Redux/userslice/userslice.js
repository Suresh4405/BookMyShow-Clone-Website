import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: {
    profile: null,
  },
  reducers: {
    setprofile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default userslice.reducer;

export const { setprofile } = userslice.actions;



