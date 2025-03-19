import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitState } from './unit.state';

export const selectUnitState = createFeatureSelector<UnitState>('units');

export const selectAllUnits = createSelector(
  selectUnitState,
  (state) => state.units
);
export const selectLoading = createSelector(
  selectUnitState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectUnitState,
  (state) => state.error
);
