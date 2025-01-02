// src/redux/actions/receipts.js

import { ADD_RECEIPT, SET_RECEIPTS, REMOVE_RECEIPT } from '../types';
export interface Receipt {
  id: number;
  amount: number;
  date: string;
  category: string;
}

export interface AddReceiptAction {
  type: typeof ADD_RECEIPT;
  payload: Receipt;
}

export const addReceipt = (receipt: Receipt): AddReceiptAction => ({
  type: ADD_RECEIPT,
  payload: receipt,
});

export interface SetReceiptsAction {
  type: typeof SET_RECEIPTS;
  payload: Receipt[];
}

export const setReceipts = (receipts: Receipt[]): SetReceiptsAction => ({
  type: SET_RECEIPTS,
  payload: receipts,
});

export interface RemoveReceiptAction {
  type: typeof REMOVE_RECEIPT;
  payload: number;  // ID debe ser de tipo number
}

export const removeReceipt = (id: number): RemoveReceiptAction => ({
  type: REMOVE_RECEIPT,
  payload: id,
});
