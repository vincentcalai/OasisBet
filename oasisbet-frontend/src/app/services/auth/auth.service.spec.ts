import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call jwtAuthenticate api once called jwtAuthenticate', () => {
    spyOn(service.apiService, 'jwtAuthenticate');
    service.jwtAuthenticate();
    expect(service.apiService.jwtAuthenticate).toHaveBeenCalledTimes(1);
  });

  it('should check if the user is logged in', () => {
    spyOn(localStorage, 'getItem');
    const result = service.isUserLoggedIn();
    expect(localStorage.getItem).toHaveBeenCalledWith('authenticateUser');
    expect(result).toBeTrue();
  });

  it('should get the authentication user', () => {
    spyOn(localStorage, 'getItem').and.returnValue('TESTUSER123');
    const result = service.getAuthenticationUser();
    expect(localStorage.getItem).toHaveBeenCalledWith('authenticateUser');
    expect(result).toBe('TESTUSER123');
  });

  it('should get the authentication token if user exists', () => {
    spyOn(service, 'getAuthenticationUser').and.returnValue('TESTUSER');
    spyOn(localStorage, 'getItem').and.returnValue('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ');
    const result = service.getAuthenticationToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('authorization');
    expect(result).toBe('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ');
  });

  it('should not get the authentication token if user dont exist', () => {
    spyOn(service, 'getAuthenticationUser').and.returnValue(null);
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = service.getAuthenticationToken();
    expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(result).toBe(null);
  });

  it('should get the retrieved account details', () => {
    const mockAccountDetails = { name: 'Wayne Rooney', email: 'waynerooney@example.com' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockAccountDetails));
    const result = service.getRetrievedAccDetails();
    expect(localStorage.getItem).toHaveBeenCalledWith('accountDetails');
    expect(result).toEqual(mockAccountDetails);
  });

  it('should logout and remove user data from localStorage', () => {
    const mockConfirm = spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'log');
    spyOn(localStorage, 'removeItem');
    spyOn(service.router, 'navigate');
    service.logout();
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure to logout?');
    expect(console.log).toHaveBeenCalledWith('logout ok');
    expect(localStorage.removeItem).toHaveBeenCalledTimes(5);
    expect(localStorage.removeItem).toHaveBeenCalledWith('authenticateUser');
    expect(localStorage.removeItem).toHaveBeenCalledWith('authorization');
    expect(localStorage.removeItem).toHaveBeenCalledWith('accountDetails');
    expect(localStorage.removeItem).toHaveBeenCalledWith('loginTime');
    expect(localStorage.removeItem).toHaveBeenCalledWith('personalDetails');
    expect(service.router.navigate).toHaveBeenCalledWith(['account']);
  });

  it('should start login timer and update login timer source', fakeAsync(() => {
    service.loginTime = Date.now();
    spyOn(service, 'isUserLoggedIn').and.returnValue(true);
    spyOn(service, 'formatDuration');
    service.startLoginTimer();
    tick(1000);
    expect(service.sharedVar.loginTimerSource).toBeDefined();
    expect(service.formatDuration).toHaveBeenCalledTimes(1);
    service.sharedVar.loginTimerSource.unsubscribe();
  }));

  it('should format duration in HH:mm:ss format', () => {
    const result = service.formatDuration(3665); // 1 hour, 1 minute, and 5 seconds
    expect(result).toBe('01:01:05');
  });

  it('should pad number with leading zero when less than 10', () => {
    const result = service.padNumber(5);
    expect(result).toBe('05');
  });

  it('should pad number without leading zero when more than 10', () => {
    const result = service.padNumber(12);
    expect(result).toBe('12');
  });

  it('should call refreshJWTtoken method when there is a request to refresh JWT token', () => {
    spyOn(service.apiService, 'refreshJwtToken');
    service.refreshJwtToken();
    expect(service.apiService.refreshJwtToken).toHaveBeenCalledTimes(1);
  });

  it('should change exception message when error status is not 401', () => {
    const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: 'Server error' });
    spyOn(service.sharedVar, 'changeException');
    service.handleError(error);
    expect(service.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

  it('should handle token expiration and refresh JWT token successfully, when there is a valid token', () => {
    const expiredTokenError = new HttpErrorResponse({ status: 401, error: { message: 'Access Token Expired' } });
    const refreshTokenResponse = { token: 'newToken' };
    spyOn(service.sharedVar, 'changeException');
    spyOn(localStorage, 'setItem');
    spyOn(service.router, 'navigate');
    spyOn(service, 'refreshJwtToken').and.returnValue(of(refreshTokenResponse));
    service.handleError(expiredTokenError);
    expect(service.refreshJwtToken).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('authorization', 'Bearer newToken');
    expect(service.router.navigate).toHaveBeenCalledWith(['account']);
    expect(service.sharedVar.changeException).not.toHaveBeenCalled();
  });

  it('should handle other unauthorized errors', () => {
    const unauthorizedError = new HttpErrorResponse({ status: 401, error: { message: 'Unauthorized' } });
    spyOn(service.sharedVar, 'changeException');
    spyOn(service, 'clearLocalStorage');
    spyOn(console, 'log');
    service.handleError(unauthorizedError);
    expect(service.clearLocalStorage).toHaveBeenCalled();
    expect(service.sharedVar.changeException).toHaveBeenCalledWith('Unauthorized response. Please login again.');
  });

  it('should handle token expiration and fail to refresh JWT token, when there is a invalid token', () => {
    const expiredTokenError = new HttpErrorResponse({ status: 401, error: { message: 'Access Token Expired' } });
    const refreshTokenResponse = {};
    spyOn(service.sharedVar, 'changeException');
    spyOn(localStorage, 'setItem');
    spyOn(service.router, 'navigate');
    spyOn(service, 'refreshJwtToken').and.returnValue(of(refreshTokenResponse));
    service.handleError(expiredTokenError);
    expect(service.refreshJwtToken).toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(service.router.navigate).toHaveBeenCalled();
    expect(service.sharedVar.changeException).toHaveBeenCalledWith('Unauthorized response. Please login again.');
  });

  it('should handle token expiration and fail to refresh JWT token, when there is other unexpected error while refreshing JWT token', () => {
    const expiredTokenError = new HttpErrorResponse({ status: 401, error: { message: 'Access Token Expired' } });
    const error = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: 'Server error' });
    spyOn(service.sharedVar, 'changeException');
    spyOn(localStorage, 'setItem');
    spyOn(service.router, 'navigate');
    spyOn(service, 'refreshJwtToken').and.returnValue(throwError(error));
    service.handleError(expiredTokenError);
    expect(service.refreshJwtToken).toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(service.router.navigate).toHaveBeenCalled();
    expect(service.sharedVar.changeException).toHaveBeenCalledWith('Unauthorized response. Please login again.');
  });


});

