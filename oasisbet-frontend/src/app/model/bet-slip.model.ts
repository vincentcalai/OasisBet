import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";
import { H2HBetSelection } from "./h2h-bet-selection.model";

@Injectable({
    providedIn: 'root'
})
export class BetSlip {
    public eventId: number;
    public eventDesc: string;
    public compType: string;
    public startTime: Date;
    public betSelection: string;
    public betSelectionName: string;
    public betTypeCd: string;
    public odds: number;
    public betAmount: number = null;
    public potentialPayout: number = 0;
}
