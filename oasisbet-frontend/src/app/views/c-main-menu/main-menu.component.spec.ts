import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { ACC_DETAILS, AUTH_USER, AUTHORIZATION } from 'src/app/services/auth/auth.service';


describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    const date =
    sessionStorage.setItem("loginTime", Date.now().toString());
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(AUTHORIZATION);
    sessionStorage.removeItem(ACC_DETAILS);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute logout when logout is called', () => {
    spyOn(component.authService, 'logout');
    component.logout();
    expect(component.authService.logout).toHaveBeenCalled();
  });

  it('should navigate to create user component screen when sign up user button is clicked', () => {
    spyOn(component.router, 'navigate');
    component.signUpUser();
    expect(component.router.navigate).toHaveBeenCalledWith(['create-user'], Object({ skipLocationChange: true }) );
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
    expect(component.sharedVar.commonErrorMsg).toBeUndefined();
  });

  it('when login is unsuccessful, should not retrieve account details, and should throw error', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    spyOn(component.apiService, 'retrieveAccDetails');
    spyOn(component.authService, 'jwtAuthenticate').and.returnValue(throwError(error));
    spyOn(component.router, 'navigate');
    component.handleJWTAuthLogin();
    expect(component.apiService.retrieveAccDetails).toHaveBeenCalledTimes(0);
    expect(component.sharedVar.commonErrorMsg).toBe("Please enter a valid credential. Login failed.");
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
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
    expect(component.sharedVar.commonErrorMsg).toBe(message);
    expect(sessionStorage.getItem(ACC_DETAILS)).toBeNull();
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
    expect(component.sharedVar.commonErrorMsg).toBeUndefined;
    expect(component.authService.startLoginTimer).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(AUTH_USER)).toBe(user);
    expect(sessionStorage.getItem(AUTHORIZATION)).toBe('Bearer ' + data.token);
    expect(sessionStorage.getItem(ACC_DETAILS)).not.toBeNull();
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
    spyOn(component.router, 'navigate');
    component.handleJWTAuthLogin();
    expect(component.authService.startLoginTimer).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

});
