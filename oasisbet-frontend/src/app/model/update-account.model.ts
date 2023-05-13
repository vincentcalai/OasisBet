import { Injectable } from "@angular/core";
import { AccountModel } from "./account.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountModel {
  public account: AccountModel;
}
