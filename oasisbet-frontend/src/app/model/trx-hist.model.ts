import { Injectable } from "@angular/core";
import { TrxBetDetails } from "./trx-bet-details.model";

@Injectable({
  providedIn: 'root'
})
export class TrxHistModel {

    public dateTime: Date;
    public desc: string;
    public type: string;
    public amount: number;
    public showDetails: boolean;
    public trxBetDetails: TrxBetDetails;
}
