import { Routes } from '@angular/router';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { UnitsPageComponent } from '@pages/units-page/units-page.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'units', component: UnitsPageComponent },
  { path: 'units/:id', component: UnitDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
