import { Injectable } from "@angular/core";
import { AccountModel } from "./account.model";
import { AccountDetailsModel } from "./account-details.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountModel {
  public account: AccountModel;
}
