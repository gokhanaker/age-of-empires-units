import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { Unit } from '@models/unit.model';
import { Store } from '@ngrx/store';
import { selectUnitById } from '@state/unit.selectors';
import { UnitState } from '@state/unit.state';

@Component({
  selector: 'unit-detail-page',
  imports: [NavbarComponent],
  templateUrl: './unit-detail-page.component.html',
  styleUrl: './unit-detail-page.component.scss',
})
export class UnitDetailPageComponent implements OnInit {
  readonly pageTitle = 'Unit Detail Page';
  unitId: number | undefined;
  unit!: Unit;

  constructor(private route: ActivatedRoute, private store: Store<UnitState>) {}

  ngOnInit(): void {
    this.unitId = Number(this.route.snapshot.paramMap.get('id')); // Get unit id from URL
    this.store.select(selectUnitById(this.unitId)).subscribe((unit: Unit) => {
      this.unit = unit;
    });
  }
}
