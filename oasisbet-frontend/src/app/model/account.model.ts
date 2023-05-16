import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccountModel {

    public accId: number;
    public usrId: number;
    public balance: number;
    public depositLimit: number;
    public depositAmt: number;
    public withdrawalAmt: number;
    public actionType: string;
}
