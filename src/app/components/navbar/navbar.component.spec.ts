import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { paramMap: { get: () => null } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the toolbar with navigation buttons', () => {
    const compiled = fixture.nativeElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    const navButtons = compiled.querySelectorAll('a');

    expect(toolbar).toBeTruthy();
    expect(navButtons.length).toBeGreaterThan(0);
  });
});
