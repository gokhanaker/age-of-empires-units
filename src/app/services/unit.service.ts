import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { loadUnitsSuccess, loadUnitsFailure } from '@state/unit.actions';
import { Unit } from '@models/unit.model';
import { UnitState } from '@state/unit.state';
import { Age, AGE_LIST } from '@models/ages.model';

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

  filterUnits(
    allUnits: Unit[],
    selectedAge: Age,
    costFilters: { food: boolean; wood: boolean; gold: boolean },
    costValues: { food: number; wood: number; gold: number }
  ): Unit[] {
    let filteredUnits = allUnits;

    // Filter By Age
    if (selectedAge !== Age.All) {
      const ageIndex = AGE_LIST.indexOf(selectedAge);
      filteredUnits = filteredUnits.filter(
        (unit) => AGE_LIST.indexOf(unit.age) <= ageIndex
      );
    }

    // Filter By Cost
    if (costFilters.food && costValues.food >= 0) {
      filteredUnits = filteredUnits.filter(
        (unit) =>
          unit.cost?.Food === undefined || unit.cost?.Food <= costValues.food
      );
    }
    if (costFilters.wood && costValues.wood >= 0) {
      filteredUnits = filteredUnits.filter(
        (unit) =>
          unit.cost?.Wood === undefined || unit.cost?.Wood <= costValues.wood
      );
    }

    if (costFilters.gold && costValues.gold >= 0) {
      filteredUnits = filteredUnits.filter(
        (unit) =>
          unit.cost?.Gold === undefined || unit.cost?.Gold <= costValues.gold
      );
    }

    return filteredUnits;
  }
}
