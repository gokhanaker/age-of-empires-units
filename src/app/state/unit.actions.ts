import { createAction, props } from '@ngrx/store';
import { Unit } from '@models/unit.model';

export const loadUnitsSuccess = createAction(
  '[Units] Load Units Success',
  props<{ units: Unit[] }>()
);

export const loadUnitsFailure = createAction(
  '[Units] Load Units Failure',
  props<{ error: string }>()
);
