// src/redux/reducers/index.ts

import { combineReducers } from 'redux';
import receiptsReducer from './receipts';
import filtersReducer from './filters';
import googleVisionReducer from '../slices/googleVisionSlice'
import openAiReducer from '../slices/openAiSlice'

const rootReducer = combineReducers({
  receipts: receiptsReducer,
  filters: filtersReducer,
  googleVision: googleVisionReducer,
  openai: openAiReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
