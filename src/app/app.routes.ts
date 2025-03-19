import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UnitsComponent } from './components/units/units.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'units/:id', component: UnitDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
