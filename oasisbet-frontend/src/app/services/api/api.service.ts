import { HttpClient } from '@angular/common/http';
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

  public servicePrefix;
  public servicePrefix2;
  public timeout = 200000;

  constructor(public http: HttpClient,
    public sharedVar: SharedVarService) {
    this.servicePrefix = environment.apiUrl;
    this.servicePrefix2 = environment.apiUrl2;
  }

  retrieveOdds(compType: string): Observable<Object> {
    return this.http.get(this.servicePrefix + '/odds/retrieveOdds?compType=' + compType).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  retrieveResults(compType: string): Observable<Object> {
    return this.http.get(this.servicePrefix2 + '/result/retrieveResults?compType=' + compType).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  handleError(error: any){
    alert('An unexpected error has occured.')
    return throwError(error.message || "Server Error has occured.");
  }

}
