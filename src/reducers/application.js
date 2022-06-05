import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userToken',
  initialState: {
    value: null
  },
  reducers: {
    clearUserToken: state => { state.value = null; },
    setUserToken: (state, action) => { state.value = action.payload; }
  }
});

export const { clearUserToken, setUserToken } = userSlice.actions;
export default userSlice.reducer;