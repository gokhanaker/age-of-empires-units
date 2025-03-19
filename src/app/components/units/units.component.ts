import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UnitState } from '../../state/unit.state';
import {
  selectAllUnits,
  selectLoading,
  selectError,
} from '../../state/unit.selectors';
import { UnitService } from '../../services/unit.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Unit } from '../../models/unit.model';

@Component({
  selector: 'units',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
})
export class UnitsComponent implements OnInit {
  loading: boolean = false;
  unitList: Unit[] = [];
  error: any = null;

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
      this.unitList = data.units;
    });

    this.store.select(selectLoading).subscribe((loading: any) => {
      this.loading = loading;
    });

    this.store.select(selectError).subscribe((error: any) => {
      this.error = error;
    });
  }
}
