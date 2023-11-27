import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { timeout, catchError, map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/model/response.model';
import { SharedVarService } from '../shared-var.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public commonApiPrefix;
  public timeout = 200000;

  constructor(public http: HttpClient,
    public sharedVar: SharedVarService) {
    this.commonApiPrefix = environment.commonApiUrl;
  }

  jwtAuthenticate() {
    return this.http.post<any>( this.commonApiPrefix + "/user/authenticate", this.sharedVar.loginCredentialsModel)
    .pipe(
      map(
        data => {
          console.log(data);
          return data;
        }
      )
    );
  }

  postCreateUser(): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.commonApiPrefix + "/user/createUser", this.sharedVar.createUserModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveOdds(compType: string): Observable<Object> {
    return this.http.get(this.commonApiPrefix + '/odds/retrieveOdds?compType=' + compType).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  postSubmitBets(): Observable<Object> {
    return this.http.post<Object>(this.commonApiPrefix + '/odds/bets/', this.sharedVar.submitBetsModel).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveResults(compType: string, selectedDates: string, dateFrom: Date, dateTo: Date): Observable<Object> {
    const formattedDateFrom = dateFrom.toISOString();
    const formattedDateTo = dateTo.toISOString();

    const params = new HttpParams()
    .set('compType', compType)
    .set('selectedDate', selectedDates)
    .set('dateFrom', formattedDateFrom)
    .set('dateTo', formattedDateTo);

    return this.http.get(this.commonApiPrefix + '/result/retrieveResults?', {params}).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveAccDetails(user: string): Observable<Object> {
    return this.http.get(this.commonApiPrefix + '/account/retrieveAccDetails?user=' + user).pipe(
      timeout(this.timeout)
    );
  }

  retrieveYtdAmounts(accId: number): Observable<Object> {
    return this.http.get(this.commonApiPrefix + '/account/retrieveYtdAmounts?accId=' + accId).pipe(
      timeout(this.timeout)
    );
  }

  retrieveMtdAmounts(accId: number): Observable<Object> {
    return this.http.get(this.commonApiPrefix + '/account/retrieveMtdAmounts?accId=' + accId).pipe(
      timeout(this.timeout)
    );
  }

  updateAccDetails(): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(this.commonApiPrefix + '/account/updateAccDetails', this.sharedVar.updateAccountModel).pipe(
      timeout(this.timeout)
    );
  }

  retrieveTrx(accId: number, trxType: string, period: string): Observable<Object> {
    const params = new HttpParams()
    .set('accId', accId)
    .set('type', trxType)
    .set('period', period);
    return this.http.get(this.commonApiPrefix + '/account/retrieveTrx', { params }).pipe(
      timeout(this.timeout)
    );
  }

  handleError(error: any){
    alert('An unexpected error has occured.')
    return throwError(error.message || "Server Error has occured.");
  }


}
