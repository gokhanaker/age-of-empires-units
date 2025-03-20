import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitState } from './unit.state';
import { Unit } from '@models/unit.model';

export const selectUnitState = createFeatureSelector<UnitState>('units');

export const selectAllUnits = createSelector(
  selectUnitState,
  (state) => state.units
);

export const selectError = createSelector(
  selectUnitState,
  (state) => state.error
);

export const selectUnitById = (unitId: number) =>
  createSelector(selectAllUnits, (state: any) => {
    return state.units.find((unit: Unit) => unit.id === unitId);
  });
