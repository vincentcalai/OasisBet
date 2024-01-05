import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginComponent } from './account-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ACC_DETAILS, AUTHORIZATION, AUTH_USER } from 'src/app/services/auth/auth.service';
import { AccountModel } from 'src/app/model/account.model';

describe('AccountLoginComponent', () => {
  let component: AccountLoginComponent;
  let fixture: ComponentFixture<AccountLoginComponent>;
  let sharedVarService: SharedVarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [SharedVarService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginComponent);
    component = fixture.componentInstance;
    sharedVarService = TestBed.inject(SharedVarService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem(AUTH_USER);
    localStorage.removeItem(AUTHORIZATION);
    localStorage.removeItem(ACC_DETAILS);
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should subscribe to showUserNotLoginSource and update errorMsg', () => {
    const errorMsg = 'Credential Failed';
    component.sharedVar.changeShowUserNotLoginMsg('Credential Failed');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.errorMsg).toBe(errorMsg);
  });

  it('ngOnInit should subscribe to responseSource and update responseMsg', () => {
    const mockResponse = { statusCode: 0, resultMessage: 'Login Success' };
    component.sharedVar.changeResponse(mockResponse);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.responseMsg).toBe('Login Success');
  });

  it('when login is successful, should retrieve account details', () => {
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    spyOn(component.authService, 'startLoginTimer');
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(of(token));
    spyOn(component.apiService, 'retrieveAccDetails').and.returnValue(of({"statusCode":0,"resultMessage": 'Login Successful', "account": new AccountModel()}));
    component.handleJWTAuthLogin();
    expect(component.apiService.retrieveAccDetails).toHaveBeenCalledTimes(1);
    expect(component.authService.startLoginTimer).toHaveBeenCalledTimes(1);
    expect(component.errorMsg).toBeNull();
  });

  it('when login is unsuccessful, should not retrieve account details, and should throw error', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    spyOn(component.apiService, 'retrieveAccDetails');
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(throwError(error));
    component.handleJWTAuthLogin();
    expect(component.apiService.retrieveAccDetails).toHaveBeenCalledTimes(0);
    expect(component.errorMsg).toBe("Please enter a valid credential. Login failed.");
  });

  it('when user click sign up user, navigate to sign up user screen', () => {
    spyOn(component.router, 'navigate');
    component.signUpUser();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('when login authentication succeed, but retrieve account details fails, should not save account details into session storage, and should show error message', () => {
    const message = "Invalid Credential";
    const data = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(of(data));
    spyOn(component.apiService, 'retrieveAccDetails').and.returnValue(of({"statusCode":1,"resultMessage": 'Invalid Credential'}));
    component.handleJWTAuthLogin();
    expect(component.errorMsg).toBe(message);
    expect(localStorage.getItem(ACC_DETAILS)).toBeNull();
  });

  it('when login authentication succeed, and retrieve account details succeed, should save account details into session storage', () => {
    const user = "TESTUSER";
    const data = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    component.username = user;
    spyOn(component.authService, 'startLoginTimer');
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(of(data));
    spyOn(component.apiService, 'retrieveAccDetails').and.returnValue(of({"statusCode":0,"resultMessage": 'Login Successful', "account": new AccountModel()}));
    component.handleJWTAuthLogin();
    expect(component.errorMsg).toBe(null);
    expect(component.authService.startLoginTimer).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(AUTH_USER)).toBe(user);
    expect(localStorage.getItem(AUTHORIZATION)).toBe('Bearer ' + data.token);
    expect(localStorage.getItem(ACC_DETAILS)).not.toBeNull();
  });

  it('when there is connection issue when retrieving account details, should throw error exception', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    spyOn(component.authService, 'startLoginTimer');
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(of(token));
    spyOn(component.apiService, 'retrieveAccDetails').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.handleJWTAuthLogin();
    expect(component.authService.startLoginTimer).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

});
