import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { CreateUserModel } from '../model/create-user.model';
import { AccountModel } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  public readonly GENERAL_SYS_DOWN_ERR_MSG = "This system is currently not available. Please try again at a later time.";

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

  public readonly NAV_MENU_SELECT_ACCOUNT_OVERVIEW = "account_overview";
  public readonly NAV_MENU_SELECT_TRX_HIST = "trx_hist";
  public readonly NAV_MENU_SELECT_DEPOSITS = "desposits";
  public readonly NAV_MENU_SELECT_WITHDRAWALS= "withdrawals";
  

  public readonly sharedModalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    animated: false
  };

  public createUserModel: CreateUserModel = new CreateUserModel();
  public accountModel: AccountModel = new AccountModel();

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
