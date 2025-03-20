import { Routes } from '@angular/router';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { UnitsPageComponent } from '@pages/units-page/units-page.component';
import { UnitDetailPageComponent } from './pages/unit-detail/unit-detail-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'units', component: UnitsPageComponent },
  { path: 'units/:id', component: UnitDetailPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
