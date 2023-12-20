import { Injectable } from "@angular/core";
import { AccountPwModel } from "./account-pw.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountPwModel {
    public accountPw: AccountPwModel;
}
