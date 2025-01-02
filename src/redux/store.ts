// src/redux/store.ts

import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,

});

export default store;
