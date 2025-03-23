import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitDetailPageComponent } from './unit-detail-page.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UnitState } from '@state/unit.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { mockUnits } from 'src/app/test-helper/test-helper';

describe('UnitDetailPageComponent', () => {
  let component: UnitDetailPageComponent;
  let fixture: ComponentFixture<UnitDetailPageComponent>;
  let mockStore: MockStore<UnitState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            units: mockUnits,
            error: null,
          } as unknown as UnitState,
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }, // Simulating route param id = 1
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitDetailPageComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore<UnitState>;
  });

  it('should create Unit Detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should select the correct unit from the store', () => {
    spyOn(mockStore, 'select').and.returnValue(of(mockUnits[0]));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.unit).toEqual(mockUnits[0]);
    expect(component.unitId).toEqual(1);
    expect(mockStore.select).toHaveBeenCalled();
  });
});
