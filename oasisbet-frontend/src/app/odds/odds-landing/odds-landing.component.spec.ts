import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsLandingComponent } from './odds-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OddsLandingComponent', () => {
  let component: OddsLandingComponent;
  let fixture: ComponentFixture<OddsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsLandingComponent ],
      imports: [
        HttpClientTestingModule
      ],
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
