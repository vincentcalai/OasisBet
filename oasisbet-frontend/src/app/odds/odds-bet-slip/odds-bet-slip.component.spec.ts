import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsBetSlipComponent } from './odds-bet-slip.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('OddsBetSlipComponent', () => {
  let component: OddsBetSlipComponent;
  let fixture: ComponentFixture<OddsBetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsBetSlipComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsBetSlipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockInitBetSlip = of<void>();
    component.initBetSlip = mockInitBetSlip;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
