import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;