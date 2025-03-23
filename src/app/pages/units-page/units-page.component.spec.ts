import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitsPageComponent } from './units-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UnitService } from '@services/unit.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Age } from '@models/ages.model';
import { CommonModule } from '@angular/common';

describe('UnitsPageComponent', () => {
  let component: UnitsPageComponent;
  let fixture: ComponentFixture<UnitsPageComponent>;
  let mockStore: MockStore;
  let mockUnitService: jasmine.SpyObj<UnitService>;

  const initialState = {
    units: [],
    error: null,
  };

  beforeEach(async () => {
    mockUnitService = jasmine.createSpyObj('UnitService', [
      'fetchUnits',
      'filterUnits',
    ]);
    mockUnitService.filterUnits.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        UnitsPageComponent,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        FormsModule,
        NavbarComponent,
        RouterModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: UnitService, useValue: mockUnitService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: ['home', 'units'],
          },
        },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UnitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Units Page component', () => {
    expect(component).toBeTruthy();
    expect(component.pageTitle).toBe('Units Page');
  });

  it('should call unitService.fetchUnits on initialization', () => {
    expect(mockUnitService.fetchUnits).toHaveBeenCalled();
  });

  it('should filter units based on selected age', () => {
    const mockSelectedAge = Age.Castle;
    component.selectedAge = mockSelectedAge;
    component.filterUnits();

    expect(mockUnitService.filterUnits).toHaveBeenCalledWith(
      component.allUnitList,
      mockSelectedAge,
      component.costFilters,
      component.costValues
    );
  });

  it('should filter units based on selected cost', () => {
    const mockCostFilters = {
      food: true,
      wood: true,
      gold: true,
    };

    const mockCostValues = {
      food: 50,
      wood: 40,
      gold: 40,
    };

    component.costFilters = mockCostFilters;
    component.costValues = mockCostValues;
    component.filterUnits();

    expect(mockUnitService.filterUnits).toHaveBeenCalledWith(
      component.allUnitList,
      component.selectedAge,
      mockCostFilters,
      mockCostValues
    );
  });
});
