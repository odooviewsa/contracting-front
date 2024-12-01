import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstName: "",
  secondName: "",
  role: "",
  email: "",
  companySize: "",
  companyName: "",
  companyType: "",
  phone: "",
  state: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.firstName = action.payload?.firstName || "";
      state.secondName = action.payload?.secondName || "";
      state.role = action.payload?.role || "";
      state.email = action.payload?.email || "";
      state.companySize = action.payload?.companySize || "";
      state.companyName = action.payload?.companyName || "";
      state.companyType = action.payload?.companyType || "";
      state.phone = action.payload?.phone || "";
      state.state = "complete";
    },

    setLogout: (state) => {
      state._id = "";
      state.firstName = "";
      state.secondName = "";
      state.role = "";
      state.email = "";
      state.companySize = "";
      state.companyName = "";
      state.companyType = "";
      state.phone = "";
    },
  },
});

export const { setUser, setToken, setLogout } = userSlice.actions;
export default userSlice.reducer;
