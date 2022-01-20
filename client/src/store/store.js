import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './reducers/authSlice';
import globalSlice from './reducers/globalSlice';

const rootReducer = combineReducers({
    global: globalSlice,
    auth: authSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})