import { unitReducer } from './unit.reducer';
import { loadUnitsSuccess, loadUnitsFailure } from './unit.actions';
import { UnitState, initialState } from './unit.state';
import { mockUnits } from '../test-helper/test-helper';

describe('Unit Reducer', () => {
  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const newState = unitReducer(initialState, action);

    expect(newState).toBe(initialState);
  });

  it('should update the state with units when loadUnitsSuccess is dispatched', () => {
    const action = loadUnitsSuccess({ units: mockUnits });
    const newState: UnitState = unitReducer(initialState, action);

    expect(newState.units).toEqual(mockUnits);
    expect(newState.error).toBeNull();
  });

  it('should update the state with error when loadUnitsFailure is dispatched', () => {
    const mockError = 'Failed to load units';
    const action = loadUnitsFailure({ error: mockError });
    const newState: UnitState = unitReducer(initialState, action);

    expect(newState.error).toBe(mockError);
    expect(newState.units).toEqual([]);
  });
});
