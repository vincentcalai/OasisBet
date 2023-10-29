import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TrxBetDetails {

    public startTime: Date;
    public compType: string;
    public betDetails: string;
    public betType: string;
    public status: boolean;
    public trxId: string;
}
