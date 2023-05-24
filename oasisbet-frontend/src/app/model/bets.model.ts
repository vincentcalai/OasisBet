import { Injectable } from "@angular/core";
import { UserModel } from "./user.model";
import { BetSlip } from "./bet-slip.model";

@Injectable({
  providedIn: 'root'
})
export class BetsModel {
  public betSlip: BetSlip[];
}
