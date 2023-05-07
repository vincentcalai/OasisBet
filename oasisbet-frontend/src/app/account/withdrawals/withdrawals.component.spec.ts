import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsComponent } from './withdrawals.component';

describe('WithdrawalsComponent', () => {
  let component: WithdrawalsComponent;
  let fixture: ComponentFixture<WithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
