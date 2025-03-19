import { createReducer, on } from '@ngrx/store';
import { loadUnitsSuccess, loadUnitsFailure } from './unit.actions';
import { initialState } from './unit.state';

export const unitReducer = createReducer(
  initialState,
  on(loadUnitsSuccess, (state, { units }) => ({
    ...state,
    loading: false,
    units,
  })),
  on(loadUnitsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
