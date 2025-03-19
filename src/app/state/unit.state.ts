import { Unit } from '../models/unit.model';

export interface UnitState {
  units: Unit[];
  loading: boolean;
  error: string | null;
}

export const initialState: UnitState = {
  units: [],
  loading: false,
  error: null,
};
