import { mockUnits } from '../test-helper/test-helper';
import { selectAllUnits, selectError, selectUnitById } from './unit.selectors';
import { UnitState } from './unit.state';

describe('Unit Selectors', () => {
  let initialState: UnitState;

  beforeEach(() => {
    initialState = {
      units: mockUnits,
      error: null,
    };
  });

  it('should select all units', () => {
    const result = selectAllUnits.projector(initialState);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Archer');
    expect(result[1].name).toBe('Knight');
  });

  it('should select error state', () => {
    const result = selectError.projector(initialState);
    expect(result).toBeNull();
  });
});
