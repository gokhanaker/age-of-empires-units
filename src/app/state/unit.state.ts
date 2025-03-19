import { Unit } from '../models/unit.model';

export interface UnitState {
  units: Unit[];
  error: string | null;
}

export const initialState: UnitState = {
  units: [],
  error: null,
};
