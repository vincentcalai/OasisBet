import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsComponent } from './deposits.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('DepositsComponent', () => {
  let component: DepositsComponent;
  let fixture: ComponentFixture<DepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
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

  it('when cancel deposit, deposit value should be null', () => {
    component.onCancelDeposit();
    expect(component.depositControl.value).toBeNull();
  });

  it('when confirm deposit fail, should display validation errors', () => {
    component.depositControl.setValue('invalid');
    component.depositControl.markAsTouched();
    spyOn(component.apiService, 'updateAccDetails');
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.onConfirmDeposit();
    expect(component.apiService.updateAccDetails).not.toHaveBeenCalled();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('');
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalled();
  });

  it('should update account details when depositControl is valid', () => {
    const mockAccountModel = {};
    const accountModel: any = {"depositAmt": "200"};
    component.depositControl.setValue(100.00);
    component.depositControl.markAsTouched();
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(of({"statusCode":0,"resultMessage": 'Deposit Successful', "account": accountModel}));
    component.onConfirmDeposit();
    expect(component.apiService.updateAccDetails).toHaveBeenCalled();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('Deposit Successful');
  });

  it('should update account details when depositControl is valid', () => {
    const mockAccountModel = {};
    const accountModel: any = {"depositAmt": "200"};
    component.depositControl.setValue(100.00);
    component.depositControl.markAsTouched();
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(of({"statusCode":1,"resultMessage": 'Deposit Failed', "account": accountModel}));
    component.onConfirmDeposit();
    expect(component.apiService.updateAccDetails).toHaveBeenCalled();
    expect(component.errorMsg).toBe('Deposit Failed');
    expect(component.responseMsg).toBe('');
  });

  it('when fail to update account details due to error, should throw error exception', () => {
    const mockAccountModel = {};
    component.depositControl.setValue(100.00);
    component.depositControl.markAsTouched();
    const error = new HttpErrorResponse({ status: 500 });
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'updateAccDetails').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.onConfirmDeposit();
    fixture.detectChanges();
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

})
