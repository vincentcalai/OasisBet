import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseModel } from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  public readonly API_SOURCE_COMP_TYPE_EPL = "soccer_epl";
  public readonly API_SOURCE_COMP_TYPE_LALIGA = "soccer_spain_la_liga";
  public readonly API_SOURCE_COMP_TYPE_BUNDESLIGA = "soccer_germany_bundesliga";
  public readonly API_SOURCE_COMP_TYPE_SERIE_A = "soccer_italy_serie_a";
  public readonly API_SOURCE_COMP_TYPE_LIGUE_ONE = "soccer_france_ligue_one";

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


  retrieveCompHdr(competitionName: string): string{
    switch(competitionName) {
      case this.API_SOURCE_COMP_TYPE_EPL: {
         return this.COMP_HEADER_EPL;
         break;
      }
      case this.API_SOURCE_COMP_TYPE_LALIGA: {
        return this.COMP_HEADER_LALIGA;
         break;
      }
      case this.API_SOURCE_COMP_TYPE_BUNDESLIGA: {
        return this.COMP_HEADER_BUNDESLIGA;
        break;
      }
      case this.API_SOURCE_COMP_TYPE_SERIE_A: {
        return this.COMP_HEADER_SERIE_A;
        break;
      }
      case this.API_SOURCE_COMP_TYPE_LIGUE_ONE: {
        return this.COMP_HEADER_LIGUE_ONE;
        break;
      }
      default: {
        return '';
        break;
      }
    }
  }

}
