import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [MatCardModule, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  readonly pageTitle = 'Home Page';
}
