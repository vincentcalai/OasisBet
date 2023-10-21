import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitManagementComponent } from './limit-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { AccountModel } from 'src/app/model/account.model';

describe('LimitManagementComponent', () => {
  let component: LimitManagementComponent;
  let fixture: ComponentFixture<LimitManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: MatDialog, useValue: {} }, // Provide a mock MatDialog
      ],
      declarations: [ LimitManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitManagementComponent);
    component = fixture.componentInstance;
    let accountModel = new AccountModel();
    accountModel.depositLimit = 100;
    accountModel.betLimit = 100;
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(accountModel);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
