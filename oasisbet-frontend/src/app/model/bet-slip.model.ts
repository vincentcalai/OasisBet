import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";
import { H2HBetSelection } from "./h2h-bet-selection.model";

@Injectable({
    providedIn: 'root'
})
export class BetSlip {
    public eventId: number;
    public eventDesc: string;
    public betSelection: number;
    public betSelectionName: string;
    public betType: number;
    public odds: number;
    public betAmount: number;
}