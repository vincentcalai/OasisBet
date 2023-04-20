import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsLandingComponent } from './odds-landing.component';

describe('OddsLandingComponent', () => {
  let component: OddsLandingComponent;
  let fixture: ComponentFixture<OddsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
