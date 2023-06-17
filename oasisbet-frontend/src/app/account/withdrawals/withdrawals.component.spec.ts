import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsComponent } from './withdrawals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AUTH_USER } from 'src/app/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('WithdrawalsComponent', () => {
  let component: WithdrawalsComponent;
  let fixture: ComponentFixture<WithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const username = "TESTUSER";
    sessionStorage.setItem(AUTH_USER, username);
  });

  afterEach(()=> {
    sessionStorage.removeItem(AUTH_USER);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when select menu, should emit the correct menu', () => {
    const accountMenuSelect = component.sharedVar.NAV_MENU_SELECT_TRX_HIST;
    let emittedMenuSelect: string;
    component.onSelectTrxMenu.subscribe((menuSelect: string) => {
      emittedMenuSelect = menuSelect;
    });
    component.navToTrxHistMenu();
    expect(emittedMenuSelect).toBe(accountMenuSelect);
  });

  it('when cancel withdrawal, should clear all fields on page', () => {
    component.withdrawalAmt.setValue(100);
    component.password.setValue('password123');
    component.onCancelWithdrawal();
    expect(component.withdrawalAmt.value).toBeNull();
    expect(component.password.value).toBeNull();
  });

  it('should handle withdrawal when form validation passed', () => {
    const withdrawalAmount = 100;
    const password = 'password123';
    component.withdrawalAmt.setValue(withdrawalAmount);
    component.password.setValue(password);
    const mockAccountModel = {"accId": 1000001, "withdrawalAmt": 0, "actionType": ""};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    const username = sessionStorage.getItem(AUTH_USER);
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue(username);
    spyOn(component, 'handleJWTAuthLogin').and.returnValue(of(true));
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(of({ statusCode: 0, resultMessage: 'Withdrawal successful', account: {} }));
    component.onConfirmWithdrawal();
    expect(component.withdrawalForm.valid).toBeTruthy();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('Withdrawal successful');
  });

  it('should not handle withdrawal when form validation fails', () => {
    component.withdrawalAmt.setValue(null);
    component.password.setValue(null);
    spyOn(component.reactiveFormService, 'displayValidationErrors')
    component.onConfirmWithdrawal();
    expect(component.withdrawalForm.valid).toBeFalsy();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalled();
  });

  it('should not handle withdrawal and display error message when form validation passed, but backend return status code not equal 0', () => {
    const withdrawalAmount = 100;
    const password = 'password123';
    component.withdrawalAmt.setValue(withdrawalAmount);
    component.password.setValue(password);
    const mockAccountModel = {"accId": 1000001, "withdrawalAmt": 0, "actionType": ""};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    const username = sessionStorage.getItem(AUTH_USER);
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue(username);
    spyOn(component, 'handleJWTAuthLogin').and.returnValue(of(true));
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(of({ statusCode: 1, resultMessage: 'Withdrawal failed', account: {} }));
    component.onConfirmWithdrawal();
    expect(component.withdrawalForm.valid).toBeTruthy();
    expect(component.errorMsg).toBe('Withdrawal failed');
    expect(component.responseMsg).toBe('');
  });

  it('should throw exception when form validation passed, but api updateAccDetails throw error', () => {
    const error = new HttpErrorResponse({ status: 500 });
    const withdrawalAmount = 100;
    const password = 'password123';
    component.withdrawalAmt.setValue(withdrawalAmount);
    component.password.setValue(password);
    const mockAccountModel = {"accId": 1000001, "withdrawalAmt": 0, "actionType": ""};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    const username = sessionStorage.getItem(AUTH_USER);
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue(username);
    spyOn(component, 'handleJWTAuthLogin').and.returnValue(of(true));
    spyOn(component.sharedVar, 'changeException');
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(throwError(error));
    component.onConfirmWithdrawal();
    expect(component.withdrawalForm.valid).toBeTruthy();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('');
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

  it('when login is successful, should return true', () => {
    const username = sessionStorage.getItem(AUTH_USER);
    const password = "password123";
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(of(token));
    expect(component.handleJWTAuthLogin(username, password)).toBeTruthy();
  });

  it('should return false for incorrect login credentials', () => {
    const username = sessionStorage.getItem(AUTH_USER);
    const password = 'incorrectpassword';
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(throwError('Incorrect credentials'));
    component.handleJWTAuthLogin(username, password).subscribe(result => {
      expect(result).toBeFalse();
    });
  });
});
