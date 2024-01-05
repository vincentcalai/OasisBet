import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateComponent } from './account-update.component';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountModel } from 'src/app/model/account.model';
import { ACC_DETAILS } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

describe('AccountUpdateComponent', () => {
  let component: AccountUpdateComponent;
  let fixture: ComponentFixture<AccountUpdateComponent>;
  let sharedVarService: SharedVarService;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      declarations: [ AccountUpdateComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog},
        SharedVarService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUpdateComponent);
    component = fixture.componentInstance;
    let accountModel = new AccountModel();
    accountModel.accId = 1;
    localStorage.setItem(ACC_DETAILS, JSON.stringify(accountModel));
    sharedVarService = TestBed.inject(SharedVarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when account details is null, then throw error exception', () => {
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(null);
    spyOn(component.sharedVar, 'changeException')
    expect(() => component.ngOnInit()).toThrowError('Account details are null.');
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

  it('when clear all fields, all fields should be null', () => {
    component.email.setValue("test@test.com");
    component.contactNo.setValue("91232222");
    component.oldPassword.setValue("password");
    component.newPassword.setValue("password2");
    component.cfmNewPassword.setValue("password2");
    component.onCancelUpdate();
    expect(component.email.value).toBeNull();
    expect(component.contactNo.value).toBeNull();
    expect(component.oldPassword.value).toBeNull();
    expect(component.newPassword.value).toBeNull();
    expect(component.cfmNewPassword.value).toBeNull();
  });

  it('should handle update of account information when form validation passed', () => {
    component.email.setValue("test@test.com");
    component.contactNo.setValue("91232222");
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue("TESTUSER");
    spyOn(component, 'ngOnInit');
    const mockResponseModel = {statusCode: 0, resultMessage: 'Contact Info has been updated successfully' };
    spyOn(component.apiService, 'updateAccInfo').and.returnValue(of(mockResponseModel));
    component.onConfirmUpdateAccDetails();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('Contact Info has been updated successfully');
  });

  it('should not handle update of account information when form validation failed', () => {
    component.email.setValue("");
    component.contactNo.setValue("");
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClickedUpdateAccDetails();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('should handle update of password when form validation passed', () => {
    component.oldPassword.setValue("password");
    component.newPassword.setValue("password2");
    component.cfmNewPassword.setValue("password2");
    spyOn(component.authService, 'getAuthenticationUser').and.returnValue("TESTUSER");
    spyOn(component, 'ngOnInit');
    const mockResponseModel = {statusCode: 0, resultMessage: 'Password has been updated successfully' };
    spyOn(component.apiService, 'updateAccInfo').and.returnValue(of(mockResponseModel));
    component.onConfirmUpdatePassword();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.errorMsg).toBe('');
    expect(component.responseMsg).toBe('Password has been updated successfully');
  });

  it('should not handle update of password when form validation failed', () => {
    component.oldPassword.setValue("");
    component.newPassword.setValue("");
    component.cfmNewPassword.setValue("");
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClickedUpdateAccDetails();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('should open confirm dialog and call onConfirmUpdateAccDetails on confirm result', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of('confirm'));
    mockDialog.open.and.returnValue(dialogRefMock);

    const mockFormValue = {
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.updateAccDetailsForm.setValue(mockFormValue);
    component.updateAccDetailsForm.get('contactNo').setErrors(null);
    component.updateAccDetailsForm.get('email').setErrors(null);

    spyOn(component, 'onConfirmUpdateAccDetails');

    component.confirmClickedUpdateAccDetails();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefMock.afterClosed).toHaveBeenCalled();
    expect(component.onConfirmUpdateAccDetails).toHaveBeenCalled();
  });

  it('should open confirm dialog and call confirmClickedUpdateLogin on confirm result', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of('confirm'));
    mockDialog.open.and.returnValue(dialogRefMock);

    const mockFormValue = {
      oldPassword: 'password',
      newPassword: 'password2',
      cfmNewPassword: 'password2'
    };
    component.updateLoginForm.setValue(mockFormValue);
    component.updateLoginForm.get('cfmNewPassword').setErrors(null);
    component.updateLoginForm.get('newPassword').setErrors(null);
    component.updateLoginForm.get('oldPassword').setErrors(null);

    spyOn(component, 'onConfirmUpdatePassword');

    component.confirmClickedUpdateLogin();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefMock.afterClosed).toHaveBeenCalled();
    expect(component.onConfirmUpdatePassword).toHaveBeenCalled();
  });
});
