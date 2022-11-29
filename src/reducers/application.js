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
    setFeaturesIsCompleted: (state, action) => {
      state.currentUser = {
        ...action.payload,
        party_place: { ...action.payload.party_place, features_is_completed: true },
      };
    },
  },
});

export const {
  clearUserSession,
  setUserSession,
  setCurrentUser,
  clearCurrentUser,
  setFeaturesIsCompleted,
} = sessionSlice.actions;
export default sessionSlice.reducer;
