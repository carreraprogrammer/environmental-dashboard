// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import receiptsReducer from './receipts';
import filtersReducer from './filters';
import googleVisionReducer from '../slices/googleVisionSlice'

const rootReducer = combineReducers({
  receipts: receiptsReducer,
  filters: filtersReducer,
  googleVision: googleVisionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
