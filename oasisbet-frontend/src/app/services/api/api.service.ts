import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeout, catchError, map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/model/response.model';
import { SharedVarService } from '../shared-var.service';
import { AUTH_USER, AuthService, TOKEN } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public oddsServicePrefix;
  public resultServicePrefix;
  public accountServicePrefix;
  public timeout = 200000;

  constructor(public http: HttpClient,
    public sharedVar: SharedVarService) {
    this.oddsServicePrefix = environment.apiUrl;
    this.resultServicePrefix = environment.apiUrl2;
    this.accountServicePrefix = environment.apiUrl3;
  }

  jwtAuthenticate(username: string, password: string) {
    return this.http.post<any>( this.accountServicePrefix + "/authenticate",{
      username,
      password
    })
    .pipe(
      map(
        data => {
          console.log(data);
          return data;
        }
      )
    );
  }

  retrieveOdds(compType: string): Observable<Object> {
    return this.http.get(this.oddsServicePrefix + '/odds/retrieveOdds?compType=' + compType).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveResults(compType: string): Observable<Object> {
    return this.http.get(this.resultServicePrefix + '/result/retrieveResults?compType=' + compType).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  postCreateUser(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.accountServicePrefix + "/user/createUser", this.sharedVar.createUserModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveAccDetails(user: string): Observable<Object> {
    return this.http.get(this.accountServicePrefix + '/account/retrieveAccDetails?user=' + user).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  handleError(error: any){
    alert('An unexpected error has occured.')
    return throwError(error.message || "Server Error has occured.");
  }


}
