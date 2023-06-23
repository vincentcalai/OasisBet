import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
    sessionStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call jwtAuthenticate api once called jwtAuthenticate', () => {
    spyOn(service.apiService, 'jwtAuthenticate');
    service.jwtAuthenticate('TESTUSER', 'password');
    expect(service.apiService.jwtAuthenticate).toHaveBeenCalledWith('TESTUSER', 'password');
  });

  it('should check if the user is logged in', () => {
    spyOn(sessionStorage, 'getItem');
    const result = service.isUserLoggedIn();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('authenticateUser');
    expect(result).toBeTrue();
  });

  it('should get the authentication user', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('TESTUSER123');
    const result = service.getAuthenticationUser();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('authenticateUser');
    expect(result).toBe('TESTUSER123');
  });

  it('should get the authentication token if user exists', () => {
    spyOn(service, 'getAuthenticationUser').and.returnValue('TESTUSER');
    spyOn(sessionStorage, 'getItem').and.returnValue('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ');
    const result = service.getAuthenticationToken();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
    expect(result).toBe('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ');
  });

  it('should not get the authentication token if user dont exist', () => {
    spyOn(service, 'getAuthenticationUser').and.returnValue(null);
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    const result = service.getAuthenticationToken();
    expect(sessionStorage.getItem).not.toHaveBeenCalled();
    expect(result).toBe(null);
  });

  it('should get the retrieved account details', () => {
    const mockAccountDetails = { name: 'Wayne Rooney', email: 'waynerooney@example.com' };
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockAccountDetails));
    const result = service.getRetrievedAccDetails();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('accountDetails');
    expect(result).toEqual(mockAccountDetails);
  });

  it('should logout and remove user data from sessionStorage', () => {
    const mockConfirm = spyOn(window, 'confirm').and.returnValue(true);
    spyOn(console, 'log');
    spyOn(sessionStorage, 'removeItem');
    spyOn(service.router, 'navigate');
    service.logout();
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure to logout?');
    expect(console.log).toHaveBeenCalledWith('logout ok');
    expect(sessionStorage.removeItem).toHaveBeenCalledTimes(3);
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('authenticateUser');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('accountDetails');
    expect(service.router.navigate).toHaveBeenCalledWith(['/']);
  });

});
