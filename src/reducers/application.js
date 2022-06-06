import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userSession',
  initialState: {
    value: null
  },
  reducers: {
    clearUserSession: state => { state.value = null; },
    setUserSession: (state, action) => { state.value = action.payload; }
  }
});

export const { clearUserSession, setUserSession } = userSlice.actions;
export default userSlice.reducer;