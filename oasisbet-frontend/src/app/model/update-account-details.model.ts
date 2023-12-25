import { Injectable } from "@angular/core";
import { AccountDetailsModel } from "./account-details.model";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountDetailsModel {
    public accountDetails: AccountDetailsModel;
}
