import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./userslice/userslice";

const store = configureStore({
  reducer: {
    users: userreducer,
  },
});

export default store;
