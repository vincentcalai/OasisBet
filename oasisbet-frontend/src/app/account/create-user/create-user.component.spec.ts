import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ResponseModel } from 'src/app/model/response.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when back to home screen should navigate back to home screen', () => {
    spyOn(component.router, 'navigate');
    component.backToHomeScreen();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('should open confirm dialog and call confirmCreateUser on confirm result', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of('confirm'));
    mockDialog.open.and.returnValue(dialogRefMock);

    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.createUserForm.setValue(mockFormValue);
    component.createUserForm.get('username').setErrors(null);
    component.createUserForm.get('password').setErrors(null);
    component.createUserForm.get('contactNo').setErrors(null);
    component.createUserForm.get('email').setErrors(null);

    spyOn(component, 'confirmCreateUser');

    component.confirmClicked();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefMock.afterClosed).toHaveBeenCalled();
    expect(component.confirmCreateUser).toHaveBeenCalled();
  });

  it('should not call confirmCreateUser on cancel result', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of('cancel'));
    mockDialog.open.and.returnValue(dialogRefMock);

    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.createUserForm.setValue(mockFormValue);
    component.createUserForm.get('username').setErrors(null);
    component.createUserForm.get('password').setErrors(null);
    component.createUserForm.get('contactNo').setErrors(null);
    component.createUserForm.get('email').setErrors(null);

    spyOn(component, 'confirmCreateUser');

    component.confirmClicked();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefMock.afterClosed).toHaveBeenCalled();
    expect(component.confirmCreateUser).not.toHaveBeenCalled();
  });

  it('should call ApiService postCreateUser and navigate to home screen on success', () => {
    const mockResponse: ResponseModel = { statusCode: 0, resultMessage: 'Success' };
    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.createUserForm.setValue(mockFormValue);
    component.createUserForm.get('username').setErrors(null);
    component.createUserForm.get('password').setErrors(null);
    component.createUserForm.get('contactNo').setErrors(null);
    component.createUserForm.get('email').setErrors(null);

    spyOn(component.apiService, 'postCreateUser').and.returnValue(of(mockResponse));
    spyOn(component.sharedVar, 'changeResponse');
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    spyOn(component, 'backToHomeScreen');
    component.confirmCreateUser();

    expect(component.errorMsg).toBe('');
    expect(component.sharedVar.changeResponse).toHaveBeenCalledWith(mockResponse);
    expect(component.backToHomeScreen).toHaveBeenCalled();
    expect(component.reactiveFormService.displayValidationErrors).not.toHaveBeenCalled();
  });

  it('should call ApiService postCreateUser and show error and dont navigate on failure', () => {
    const mockResponse: ResponseModel = { statusCode: 1, resultMessage: 'Failure message' };
    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.createUserForm.setValue(mockFormValue);
    component.createUserForm.get('username').setErrors(null);
    component.createUserForm.get('password').setErrors(null);
    component.createUserForm.get('contactNo').setErrors(null);
    component.createUserForm.get('email').setErrors(null);

    spyOn(component.apiService, 'postCreateUser').and.returnValue(of(mockResponse));
    spyOn(component.sharedVar, 'changeResponse');
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    spyOn(component, 'backToHomeScreen');
    component.confirmCreateUser();

    expect(component.errorMsg).toBe('Failure message');
    expect(component.backToHomeScreen).not.toHaveBeenCalled();
    expect(component.reactiveFormService.displayValidationErrors).not.toHaveBeenCalled();
  });

  it('when form is invalid, should display validation error', () => {
    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    component.createUserForm.setValue(mockFormValue);

    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClicked();

    expect(component.createUserForm.valid).toBe(false);
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalled();
  });

  it('when call ApiService postCreateUser and encounter error, should throw error', () => {
    const mockFormValue = {
      username: 'test',
      password: 'password',
      cfmPassword: 'password',
      contactNo: '123456789',
      email: 'test@example.com'
    };
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    component.createUserForm.setValue(mockFormValue);
    component.createUserForm.get('username').setErrors(null);
    component.createUserForm.get('password').setErrors(null);
    component.createUserForm.get('contactNo').setErrors(null);
    component.createUserForm.get('email').setErrors(null);
    spyOn(component.apiService, 'postCreateUser').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException')
    component.confirmCreateUser();
    expect(component.sharedVar.changeException).toHaveBeenCalled();
  });
});
