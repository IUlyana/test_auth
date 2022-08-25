import { configureStore } from '@reduxjs/toolkit';
import authSlice from './components/authSlice';



export default configureStore({
  reducer: {
    auth: authSlice,
    },
});