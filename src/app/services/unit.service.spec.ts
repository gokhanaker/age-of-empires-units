import { TestBed } from '@angular/core/testing';
import { UnitService } from './unit.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadUnitsSuccess, loadUnitsFailure } from '@state/unit.actions';
import { Age } from '@models/ages.model';
import { mockUnits } from '../test-helper/test-helper';

describe('UnitService', () => {
  let service: UnitService;
  let httpMock: HttpTestingController;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnitService, provideMockStore()],
    });

    service = TestBed.inject(UnitService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch units and dispatch loadUnitsSuccess', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    service.fetchUnits();
    const req = httpMock.expectOne('assets/data/units.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUnits);

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadUnitsSuccess({ units: mockUnits })
    );
  });

  it('should dispatch loadUnitsFailure on error', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    service.fetchUnits();
    const req = httpMock.expectOne('assets/data/units.json');
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadUnitsFailure({
        error:
          'Http failure response for assets/data/units.json: 500 Server Error',
      })
    );
  });

  describe('filterUnits', () => {
    it('should filter units by age', () => {
      const filteredUnits = service.filterUnits(
        mockUnits,
        Age.Feudal,
        { food: false, wood: false, gold: false },
        { food: 0, wood: 0, gold: 0 }
      );
      expect(filteredUnits.length).toBe(1);
      expect(filteredUnits[0].name).toBe('Archer');
    });

    it('should filter units by cost', () => {
      const filteredUnits = service.filterUnits(
        mockUnits,
        Age.Castle,
        { food: true, wood: true, gold: true },
        { food: 60, wood: 50, gold: 75 }
      );
      expect(filteredUnits.length).toBe(1);
      expect(filteredUnits[0].name).toBe('Knight');
    });

    it('should return all units if no filters are applied', () => {
      const filteredUnits = service.filterUnits(
        mockUnits,
        Age.All,
        { food: false, wood: false, gold: false },
        { food: 0, wood: 0, gold: 0 }
      );
      expect(filteredUnits.length).toBe(2);
    });
  });
});
