import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/application';

export default configureStore({
  reducer: {
    userSession: userReducer
  }
});