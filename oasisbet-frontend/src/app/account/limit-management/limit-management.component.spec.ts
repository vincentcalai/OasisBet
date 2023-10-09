import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitManagementComponent } from './limit-management.component';

describe('LimitManagementComponent', () => {
  let component: LimitManagementComponent;
  let fixture: ComponentFixture<LimitManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
