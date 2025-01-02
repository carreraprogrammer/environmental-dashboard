// src/redux/actions/filters.ts

export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

// Types
export interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: { filterType: string; value: string | null };
}

export interface ResetFilterAction {
  type: typeof RESET_FILTER;
}

export type FilterActions = SetFilterAction | ResetFilterAction;

// Action creators
export const setFilter = (filterType: string, value: string | null): SetFilterAction => ({
  type: SET_FILTER,
  payload: { filterType, value },
});

export const resetFilter = (): ResetFilterAction => ({
  type: RESET_FILTER,
});
