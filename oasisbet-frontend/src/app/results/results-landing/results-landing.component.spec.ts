import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsLandingComponent } from './results-landing.component';

describe('ResultsLandingComponent', () => {
  let component: ResultsLandingComponent;
  let fixture: ComponentFixture<ResultsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
