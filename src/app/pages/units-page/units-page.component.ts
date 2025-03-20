import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UnitState } from '@state/unit.state';
import { selectAllUnits, selectError } from '@state/unit.selectors';
import { UnitService } from '@services/unit.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Unit } from '@models/unit.model';
import { Age, AGE_LIST } from '@models/ages.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'units-page',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './units-page.component.html',
  styleUrl: './units-page.component.scss',
})
export class UnitsPageComponent implements OnInit {
  readonly pageTitle = 'Units Page';
  error: any = null;

  allUnitList: Unit[] = [];
  unitList: Unit[] = [];

  selectedAge: Age = Age.All;
  ages = Object.values(Age);

  // Default states for cost filters
  costFilters = {
    food: false,
    wood: false,
    gold: false,
  };

  // Default values for cost filters
  costValues = {
    food: 50,
    wood: 50,
    gold: 50,
  };

  displayedColumns: string[] = ['id', 'name', 'age', 'cost'];

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  constructor(
    private store: Store<UnitState>,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.unitService.fetchUnits();

    this.store.select(selectAllUnits).subscribe((data: any) => {
      this.allUnitList = data.units;
      this.unitList = this.allUnitList;
    });

    this.store.select(selectError).subscribe((error: any) => {
      this.error = error;
    });
  }

  onAgeChange(selectedAge: Age) {
    this.selectedAge = selectedAge;
    this.filterUnits();
  }

  onCostFilterChange() {
    this.filterUnits();
  }

  filterUnits() {
    this.unitList = this.unitService.filterUnits(
      this.allUnitList,
      this.selectedAge,
      this.costFilters,
      this.costValues
    );
  }
}
