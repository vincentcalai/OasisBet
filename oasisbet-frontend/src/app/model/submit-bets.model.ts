import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { BetSlip } from "./bet-slip.model";
import { BetsModel } from "./bets.model";

@Injectable({
  providedIn: 'root'
})
export class SubmitBetsModel {
  public betSlip: BetSlip[];
}
