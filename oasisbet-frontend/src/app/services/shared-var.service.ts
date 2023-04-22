import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseModel } from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  public readonly COMP_HEADER_EPL = "English Premier League";
  public readonly COMP_HEADER_LALIGA = "La Liga";
  public readonly COMP_HEADER_BUNDESLIGA = "Bundesliga";
  public readonly COMP_HEADER_SERIE_A = "Serie A";
  public readonly COMP_HEADER_LIGUE_ONE = "Ligue One";

  constructor() { }

  public exceptionSource = new BehaviorSubject('');
  currentException = this.exceptionSource.asObservable();

  public responseSource = new BehaviorSubject<ResponseModel>(null);
  responseModel = this.exceptionSource.asObservable();

  changeResponse(resp: ResponseModel) {
    this.responseSource.next(resp);
  }

  changeException(status: string) {
    this.exceptionSource.next(status);
  }
}
