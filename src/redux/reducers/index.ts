// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import receiptsReducer from './receipts';
import filtersReducer from './filters';

const rootReducer = combineReducers({
  receipts: receiptsReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
