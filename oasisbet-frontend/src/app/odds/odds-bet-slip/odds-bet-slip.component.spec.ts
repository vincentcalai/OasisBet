import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsBetSlipComponent } from './odds-bet-slip.component';

describe('OddsBetSlipComponent', () => {
  let component: OddsBetSlipComponent;
  let fixture: ComponentFixture<OddsBetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsBetSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsBetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
