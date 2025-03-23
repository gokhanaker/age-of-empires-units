import { mockUnits } from '../test-helper/test-helper';
import { loadUnitsSuccess, loadUnitsFailure } from './unit.actions';

describe('Unit Actions', () => {
  it('should create LoadUnitsSuccess action with units payload', () => {
    const action = loadUnitsSuccess({ units: mockUnits });

    expect(action.type).toBe('[Units] Load Units Success');
    expect(action.units).toEqual(mockUnits);
  });

  it('should create LoadUnitsFailure action with error message', () => {
    const mockError = 'Failed to load units';
    const action = loadUnitsFailure({ error: mockError });

    expect(action.type).toBe('[Units] Load Units Failure');
    expect(action.error).toBe(mockError);
  });
});
