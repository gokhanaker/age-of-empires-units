import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePageComponent,
        MatCardModule,
        NavbarComponent,
        RouterModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: ['home', 'units'],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Home Page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a navbar, a cover image and title "Home Page"', () => {
    const compiled = fixture.nativeElement;
    const navbar = compiled.querySelector('navbar');
    const title = compiled.querySelector('h1');
    const image = compiled.querySelector('img');

    expect(navbar).toBeTruthy();
    expect(title.textContent).toContain('Home Page');
    expect(image).toBeTruthy();
  });
});
