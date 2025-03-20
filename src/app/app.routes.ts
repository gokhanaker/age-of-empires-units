import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UnitsComponent } from './components/units/units.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'units/:id', component: UnitDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
