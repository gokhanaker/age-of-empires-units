import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { loadUnitsSuccess, loadUnitsFailure } from '@state/unit.actions';
import { Unit } from '@models/unit.model';
import { UnitState } from '@state/unit.state';

@Injectable({ providedIn: 'root' })
export class UnitService {
  private loadUnitsUrl = 'assets/data/units.json';

  constructor(private store: Store<UnitState>, private http: HttpClient) {}

  fetchUnits() {
    this.http.get<Unit[]>(this.loadUnitsUrl).subscribe({
      next: (units) => this.store.dispatch(loadUnitsSuccess({ units })),
      error: (error) =>
        this.store.dispatch(loadUnitsFailure({ error: error.message })),
    });
  }
}
