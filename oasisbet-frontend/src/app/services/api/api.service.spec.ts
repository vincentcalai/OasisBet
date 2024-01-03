import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    }).compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postCreateUser method test case', () => {
    expect(service.postCreateUser).toBeTruthy();
  });

  it('retrieveOdds method test case', () => {
    expect(service.retrieveOdds('soccer_epl')).toBeTruthy();
  });

  it('postSubmitBets method test case', () => {
    expect(service.postSubmitBets()).toBeTruthy();
  });

  it('retrieveResults method test case', () => {
    expect(service.retrieveResults('soccer_epl', 'last24hrs', new Date(), new Date())).toBeTruthy();
  });

  it('retrieveAccDetails method test case', () => {
    expect(service.retrieveAccDetails('TESTUSER')).toBeTruthy();
  });

  it('retrieveYtdAmounts method test case', () => {
    expect(service.retrieveYtdAmounts(1000001)).toBeTruthy();
  });

  it('retrieveMtdAmounts method test case', () => {
    expect(service.retrieveMtdAmounts(1000001)).toBeTruthy();
  });

  it('updateAccDetails method test case', () => {
    expect(service.updateAccDetails()).toBeTruthy();
  });

  it('retrieveTrx method test case', () => {
    expect(service.retrieveTrx(1000001, 'deposit', 'last1mth')).toBeTruthy();
  });

  it('jwtAuthenticate method test case', () => {
    const username = "TESTUSER";
    const password = "password";
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    expect(service.jwtAuthenticate()).toBeTruthy();

    service.jwtAuthenticate().subscribe(data => {
      expect(data.token).toBe("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ");
    })

    const req = httpTestingController.expectOne(service.commonApiPrefix + '/user/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(token);
  });

  it('handleError method test case', (done) => {
    let error = {message : ''};
    expect(service.handleError(error)).toEqual(jasmine.any(Observable));
    service.handleError(new Error('test')).subscribe(
      value => {
        done();
      },
      error => {
        expect(error).toBeTruthy();
        done();
      })
  });
});
