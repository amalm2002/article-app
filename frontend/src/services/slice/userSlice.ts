import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("userData");

interface UserState {
  user: string;
  user_id: string;
  isLogin: boolean;
  preferences: string[];
}

const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : { user: "", user_id: "", isLogin: false, preferences: [] };

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.user_id = action.payload.user_id;
      state.isLogin = action.payload.isLogin;
      state.preferences = action.payload.preferences;

      localStorage.setItem("userData", JSON.stringify(state));
    },
    userLogout: (state) => {
      state.user = "";
      state.user_id = "";
      state.isLogin = false;
      state.preferences = [];
      localStorage.removeItem("userData");
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
