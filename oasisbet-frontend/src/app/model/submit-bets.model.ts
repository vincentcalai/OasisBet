import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { BetSlip } from "./bet-slip.model";
import { BetsModel } from "./bets.model";
import { AccountModel } from "./account.model";

@Injectable({
  providedIn: 'root'
})
export class SubmitBetsModel {
  public account: AccountModel;
  public betSlip: BetSlip[];
}
