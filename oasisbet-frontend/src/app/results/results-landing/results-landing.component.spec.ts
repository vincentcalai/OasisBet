import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsLandingComponent } from './results-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultsLandingComponent', () => {
  let component: ResultsLandingComponent;
  let fixture: ComponentFixture<ResultsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsLandingComponent ],
      imports: [
        HttpClientTestingModule
      ],
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
