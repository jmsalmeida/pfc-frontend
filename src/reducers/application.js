import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'userSession',
  initialState: {
    token: null,
    currentUser: null,
  },
  reducers: {
    clearUserSession: (state) => {
      state.token = null;
    },
    setUserSession: (state, action) => {
      state.token = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { clearUserSession, setUserSession, setCurrentUser, clearCurrentUser } =
  sessionSlice.actions;
export default sessionSlice.reducer;
