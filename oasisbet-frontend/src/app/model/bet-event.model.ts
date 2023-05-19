import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";
import { H2HBetSelection } from "./h2h-bet-selection.model";

@Injectable({
    providedIn: 'root'
})
export class BetEvent {
    public eventId: number;
    public competition: string;
    public eventDesc: string;
    public startTime: Date;
    public h2hEventOdds: H2HEventOdds;
    public betSelection: H2HBetSelection;
}