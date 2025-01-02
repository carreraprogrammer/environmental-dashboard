import { AddReceiptAction, SetReceiptsAction, RemoveReceiptAction } from '../actions/receipts';
import { ADD_RECEIPT, SET_RECEIPTS, REMOVE_RECEIPT } from '../types';

type ReceiptActions = AddReceiptAction | SetReceiptsAction | RemoveReceiptAction;

interface Receipt {
  id: number;
  amount: number;
  category: string;
  date: string;
}

interface ReceiptsState {
  receipts: Receipt[];
}

const initialState: ReceiptsState = {
  receipts: [],
};

const receiptsReducer = (state = initialState, action: ReceiptActions): ReceiptsState => {
  switch (action.type) {
    case ADD_RECEIPT:
      return {
        ...state,
        receipts: [...state.receipts, action.payload],
      };
    case SET_RECEIPTS:
      return {
        ...state,
        receipts: action.payload,
      };
    case REMOVE_RECEIPT:
      return {
        ...state,
        receipts: state.receipts.filter(receipt => receipt.id !== action.payload),
      };
    default:
      return state;
  }
};

export default receiptsReducer;
