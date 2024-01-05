import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitManagementComponent } from './limit-management.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { AccountModel } from 'src/app/model/account.model';
import { of } from 'rxjs';
import { AUTH_USER } from 'src/app/services/auth/auth.service';

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

  it('should retrieve Month To Date results and return correct progress details when retrieved the MTD amounts', () => {
    const mockResponse = mockResultsResponse();
    spyOn(component.apiService, 'retrieveMtdAmounts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveMtdAmounts).toHaveBeenCalled();
    expect(component.mtdDepositAmt).toEqual(40);
    expect(component.mtdBetAmt).toEqual(60);
    expect(component.depositProgress).toEqual(40);
    expect(component.betProgress).toEqual(60);
  });

  it('should disable deposit limit and set its value', () => {
    const depositLimitSelection = new FormControl(188.88);

    component.onChangesDepositLimit(depositLimitSelection);

    expect(component.depositLimit.disabled).toBeTrue();
    expect(component.depositLimit.value).toBe(188.88);
  });

  it('should enable deposit limit and clear its value', () => {
    const depositLimitSelection = new FormControl('other');
    component.depositLimit.setValue(200);

    component.onChangesDepositLimit(depositLimitSelection);

    expect(component.depositLimit.enabled).toBeTrue();
    expect(component.depositLimit.value).toBeNull();
  });

  it('should disable bet limit and set its value', () => {
    const betLimitSelection = new FormControl(288);

    component.onChangesBetLimit(betLimitSelection);

    expect(component.betLimit.disabled).toBeTrue();
    expect(component.betLimit.value).toBe(288);
  });

  it('should enable bet limit and clear its value', () => {
    const betLimitSelection = new FormControl('other');
    component.betLimit.setValue(200);

    component.onChangesBetLimit(betLimitSelection);

    expect(component.betLimit.enabled).toBeTrue();
    expect(component.betLimit.value).toBeNull();
  });

  it('should clear deposit and bet selections value once cancel set limit', () => {
    component.depositLimitSelection.setValue(250);
    component.betLimitSelection.setValue(130);
    component.password.setValue('password');

    component.onCancelSetLimit();

    expect(component.depositLimitSelection.value).toEqual(300);
    expect(component.betLimitSelection.value).toEqual(100);
    expect(component.password.value).toBeNull();
  })

  it('should not handle set limit when form validation fails', () => {
    component.depositLimitSelection.setValue('other');
    component.betLimitSelection.setValue('other');
    component.password.setValue(null);
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    spyOn(component, 'onConfirmSetLimit');
    component.confirmClicked();
    expect(component.limitMgmtForm.valid).toBeFalsy();
    expect(component.onConfirmSetLimit).not.toHaveBeenCalled();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalled();
  });

  it('should handle set limit when form validation passed', () => {
    component.depositLimitSelection.setValue('other');
    component.betLimitSelection.setValue('other');
    component.depositLimit.setValue('100.80');
    component.betLimit.setValue('188.00');
    const password = 'password123';
    component.password.setValue(password);
    spyOn(component, 'ngOnInit');
    const username = localStorage.getItem(AUTH_USER);
    spyOn(component, 'onCancelSetLimit');
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue(username);
    spyOn(component.sharedMethod, 'handleJWTAuthLogin').and.returnValue(of(true));
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(of({ statusCode: 0, resultMessage: 'Deposit/Bet Limit Change was successful.', account: {} }));
    component.onConfirmSetLimit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.onCancelSetLimit).toHaveBeenCalled();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('Deposit/Bet Limit Change was successful.');
  });

  it('should handle set limit when form validation failed when password is invalid', () => {
    component.depositLimitSelection.setValue('other');
    component.betLimitSelection.setValue('other');
    component.depositLimit.setValue('100.80');
    component.betLimit.setValue('188.00');
    const password = 'password999';
    component.password.setValue(password);
    spyOn(component, 'ngOnInit');
    const username = localStorage.getItem(AUTH_USER);
    spyOn(component, 'onCancelSetLimit');
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue(username);
    spyOn(component.sharedMethod, 'handleJWTAuthLogin').and.returnValue(of(false));
    spyOn(component.apiService, 'updateAccDetails');
    component.onConfirmSetLimit();
    expect(component.apiService.updateAccDetails).not.toHaveBeenCalled();
    expect(component.ngOnInit).not.toHaveBeenCalled();
    expect(component.onCancelSetLimit).not.toHaveBeenCalled();
    expect(component.errorMsg).toBe('Incorrect Password. Please enter correct password.');
    expect(component.responseMsg).toBe('');
  });

  function mockResultsResponse(): any {
    return {
      "account": {
        "mtdDepositAmt" : 40,
        "mtdBetAmount": 60
      }
    };
  }

});
