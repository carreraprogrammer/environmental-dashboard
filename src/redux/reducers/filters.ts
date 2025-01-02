// src/redux/reducers/filters.ts

import { SET_FILTER, RESET_FILTER, FilterActions } from '../actions/filters';

interface FiltersState {
  category: string | null;
  location: string | null;
}

const initialState: FiltersState = {
  category: null,
  location: null,
};

const filtersReducer = (state = initialState, action: FilterActions): FiltersState => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        [action.payload.filterType]: action.payload.value,
      };
    case RESET_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default filtersReducer;
