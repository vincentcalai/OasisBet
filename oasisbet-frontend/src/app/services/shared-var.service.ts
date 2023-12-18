import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseModel } from '../model/response.model';
import { CreateUserModel } from '../model/create-user.model';
import { UpdateAccountModel } from '../model/update-account.model';
import { SubmitBetsModel } from '../model/submit-bets.model';
import { LoginCredentialsModel } from '../model/login-credentials.model';
import { ChangeAccountPwModel } from '../model/change-pw.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  public readonly GENERAL_SYS_DOWN_ERR_MSG = "This system is currently not available. Please try again at a later time.";

  public readonly BET_TYPE_CD_H2H = "01";

  public readonly BET_SELECTION_H2H_HOME = "01";
  public readonly BET_SELECTION_H2H_DRAW = "02";
  public readonly BET_SELECTION_H2H_AWAY = "03";

  public readonly BET_TYPE_H2H_NAME = "1X2";
  public readonly DRAW_RESULT = "Draw";

  public readonly SETTLED = "Settled";
  public readonly NOT_SETTLED = "Not Settled";

  public readonly BET_SLIP_MAX_ALLOWED_BET = 5;

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
  public readonly NAV_MENU_SELECT_ACCOUNT_UPDATE = "account_update";
  public readonly NAV_MENU_SELECT_TRX_HIST = "trx_hist";
  public readonly NAV_MENU_SELECT_LIMIT_MGMT = 'limit_mgmt';
  public readonly NAV_MENU_SELECT_DEPOSITS = "desposits";
  public readonly NAV_MENU_SELECT_WITHDRAWALS= "withdrawals";

  public readonly EXCEED_MAX_BET_MSG= "Maximum bet in a bet slip is 5.";
  public readonly USER_NOT_LOGGED_IN = "Please login to place bet.";

  public readonly CREATE_USER_DIALOG_TYPE = "create_user";
  public readonly CFM_DEPOSIT_DIALOG_TYPE = "cfm_deposit";
  public readonly CFM_WITHDRAW_DIALOG_TYPE = "cfm_withdrawal";
  public readonly CFM_UPDATE_PW_DIALOG_TYPE = "cfm_update_pw";
  public readonly CFM_CHANGE_LIMIT_DIALOG_TYPE = "cfm_change_limit";
  public readonly CREATE_USER_DIALOG_TITLE = "Confirm Create User";
  public readonly CFM_DEPOSIT_DIALOG_TITLE = "Confirm Deposit";
  public readonly CFM_WITHDRAW_DIALOG_TITLE = "Confirm Withdrawal";
  public readonly CFM_UPDATE_PW_DIALOG_TITLE = "Confirm Update Password";
  public readonly CFM_CHANGE_LIMIT_DIALOG_TITLE = "Confirm Change Limit";
  public readonly CREATE_USER_DIALOG_MSG = "Are you sure to create this user?";
  public readonly CFM_DEPOSIT_DIALOG_MSG = "Are you sure to deposit?";
  public readonly CFM_WITHDRAW_DIALOG_MSG = "Are you sure to withdraw?";
  public readonly CFM_UPDATE_PW_DIALOG_MSG = "Are you sure to update password?";
  public readonly CFM_CHANGE_LIMIT_DIALOG_MSG = "Are you sure to change Monthly Deposit and Monthly Betting limit?";

  public readonly INVALID_DATE_FROM_AND_TO_ERR_MSG = '"From" date cannot be later than "To" date.';
  public readonly INCORRECT_PW_ERR_MSG = 'Incorrect Password. Please enter correct password.';
  public readonly INVALID_LOGIN_ERR_MSG = 'Please enter a valid credential. Login failed.';
  public readonly UNAUTHORIZED_ERR_MSG = 'Unauthorized response. Please login again.';

  public readonly LOGIN_SESSION_EXP_ERR_MSG = 'Login session expired. Please login again and place bet again.';

  public readonly LAST_24_HRS = 'last24Hrs';
  public readonly LAST_3_DAYS = 'last3Days';
  public readonly MILLI_SEC_24_HRS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  public readonly MILLI_SEC_3_DAYS = 3 * 24 * 60 * 60 * 1000;  // 3 days in milliseconds

  public readonly sharedModalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    animated: false
  };

  public createUserModel: CreateUserModel = new CreateUserModel();
  public updateAccountModel: UpdateAccountModel = new UpdateAccountModel();
  public changeAccountPwModel: ChangeAccountPwModel = new ChangeAccountPwModel();
  public submitBetsModel: SubmitBetsModel = new SubmitBetsModel();
  public loginCredentialsModel: LoginCredentialsModel = new LoginCredentialsModel();


  constructor() { }

  public exceptionSource = new BehaviorSubject('');
  currentException = this.exceptionSource.asObservable();

  public responseSource = new BehaviorSubject<ResponseModel>(null);
  responseModel = this.responseSource.asObservable();

  public showUserNotLoginSource = new BehaviorSubject<string>(null);
  showUserNotLogin = this.showUserNotLoginSource.asObservable();

  public spinnerSource = new BehaviorSubject<string>('none');
  currentSpinner = this.spinnerSource.asObservable();

  changeResponse(resp: ResponseModel) {
    this.responseSource.next(resp);
  }

  changeException(status: string) {
    this.exceptionSource.next(status);
  }

  changeShowUserNotLoginMsg(msg: string) {
    this.showUserNotLoginSource.next(msg);
  }

  changeSpinner(status: string) {
    this.spinnerSource.next(status);
  }

  mapBetTypeCd(betType: string){
    switch(betType) {
      case this.BET_TYPE_CD_H2H: {
         return this.BET_TYPE_H2H_NAME;
      }
      default: {
        return '';
      }
    }
  }

  retrieveCompHdr(competitionName: string): string{
    switch(competitionName) {
      case this.API_SOURCE_COMP_TYPE_EPL: {
         return this.COMP_HEADER_EPL;
      }
      case this.API_SOURCE_COMP_TYPE_LALIGA: {
        return this.COMP_HEADER_LALIGA;
      }
      case this.API_SOURCE_COMP_TYPE_BUNDESLIGA: {
        return this.COMP_HEADER_BUNDESLIGA;
      }
      case this.API_SOURCE_COMP_TYPE_SERIE_A: {
        return this.COMP_HEADER_SERIE_A;
      }
      case this.API_SOURCE_COMP_TYPE_LIGUE_ONE: {
        return this.COMP_HEADER_LIGUE_ONE;
      }
      default: {
        return '';
      }
    }
  }

}
