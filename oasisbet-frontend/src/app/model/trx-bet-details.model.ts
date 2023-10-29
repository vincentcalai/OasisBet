import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TrxBetDetails {

    public startTime: Date;
    public competition: string;
    public betDetails: string;
    public betType: string;
    public status: boolean;
    public trxId: string;
}
